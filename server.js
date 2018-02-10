var http = require('http');
var url = require('url');
var fs  = require('fs');
var riot = require('riot');
var mime = require('mime');
var fetch =require ('node-fetch');

var articleItem = require("./tags/ArticleItem.tag");
var articleList = require("./tags/ArticleList.tag");
var footer = require("./tags/Footer.tag");
var header = require("./tags/Header.tag");
var loader = require("./tags/Loader.tag");
var sponsors = require("./tags/Sponsors.tag");
var article = require("./tags/Article.tag");
var home = require("./tags/Home.tag");

const page = 
{
    "base" : "/test",
    "title" : "La Gorgone",
    "description" : "La Gorgone.",
    "build" : function(content){
        return `<!DOCTYPE html5>
        <html>
            <head>
                <!-- Global site tag (gtag.js) - Google Analytics -->
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-110458763-1"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
        
                    gtag('config', 'UA-110458763-1');
                </script>
        
                <meta charset="utf-8">
                <title>${page.title}</title>
                <link rel="icon" type="image/ico" href="${page.base}/static/icon.png">
                <meta name="viewport" content="width=device-width, user-scalable=no">
                <meta name='description' content='${page.description}'>

                <!-- ================================================ -->
                <!-- Ajout du CSS -->
        
                <!-- Ajout du CSS externe -->
                <!-- Pas de CSS externe -->
        
                <!-- Ajout du CSS interne -->
                <link rel="stylesheet" href="${page.base}/static/CSS/index.css">
            </head>
            <body>
                ${content}
            </body>`
    },

};


function serve404(response)
{
    response.writeHead(404, {'Content-type':'text/plain'});
    response.write('Not Found');
    response.end();
}

function serveFile(response, path)
{
    fs.readFile(__dirname + path, function(err, data)
    {
        if(err)
        {
            serve404(response);
            return;
        }
        let type = mime.getType(__dirname + path);
        response.writeHead(200, {'Content-type':type});
        response.write(data);
        response.end();
    });
}

function servePage(response, tag, data)
{
    response.writeHead(200, {'Content-type':'text/html'});
    response.write(page.build(riot.render(tag, data)));
    response.end();
}


http.createServer(function(req, response){

    path = url.parse(req.url).pathname;
    console.log(path);

    let request = null;
    let data = {
        "baseUrl" : page.base
    };

    switch(path.split("/")[1])
    {
        case "":
        case "home":
            request = fetch("http://blog.lagorgone.cf/carnets-backend/api/collections/get/articles?token=account-a40b29738f44397c03fd23312f1302", {
                method : "POST",
                body : JSON.stringify({sort: {_created:-1}}),
                headers: { 'Content-Type': 'application/json' }
            });
            request.then(res => res.json()).then(function(results){
                data.articles = results.entries;
                page.title = "La Gorgone";
                page.description = "La Gorgone.";
                servePage(response, home, data);
            });
        break;
        case "article":
            let parts = path.split("/");
            if(parts.length < 3)
            {
                serve404(response);
                return;
            }
            let id = parts[2];
            request = fetch("http://blog.lagorgone.cf/carnets-backend/api/collections/get/articles?token=account-a40b29738f44397c03fd23312f1302", {
                method : "POST",
                body : JSON.stringify({filter: {_id:id}}),
                headers: { 'Content-Type': 'application/json' }
            });
            request.then(res => res.json()).then(function(results){
                data.article = results.entries[0];
                if(data.article == null)
                    serve404(response);
                else
                {
                    page.title = "La Gorgone: "+data.article.name;
                    page.description = data.article.content.slice(0, -Math.abs(data.article.content.length - 160)).replace(/<.*?>/g, "");
                    servePage(response, article, data);
                }
            });  
            break;
        default:
            serveFile(response, path);
            return;
    }



}).listen(8080);
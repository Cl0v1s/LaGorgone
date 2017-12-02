/**
 * Created by clovis on 11/08/17.
 */

let Router = 
{
    redirect : function (rt)
    {
        route(rt);
    },

    start : function()
    {
        Router.setRoutes();
        route.start(true);        
    },

    /////////////////////////////////////////////////////////////////
    // Définition des fonctions de route
   

     ///////////////////////////////////////////////////////////////

    setRoutes : function()
    {
        route("", function(){
            let request = App.request("http://www.clovis-portron.cf/carnets/backend/api/collections/get/articles?token=account-a40b29738f44397c03fd23312f1302", {
                sort: {_created:-1}
            }, "POST");
            App.changePage("app-loader", null);
            
            request.then(function(response){
                let articles = response.entries;
                App.changePage("app-home", {
                    "articles" : articles
                });
            });

            request.catch(function(error){
                ErrorHandler.alertIfError(error);
            });
        });

        route("article/*", function(id){
            let request = App.request("http://www.clovis-portron.cf/carnets/backend/api/collections/get/articles?token=account-a40b29738f44397c03fd23312f1302", {
                filter: {_id : id}
            }, "POST");
            App.changePage("app-loader", null);
            
            request.then(function(response){
                let article = response.entries[0];
                App.changePage("app-article", {
                    "article" : article
                });
            });

            request.catch(function(error){
                ErrorHandler.alertIfError(error);
            });
        });
    },
}
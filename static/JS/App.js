let App =
{
    // L'adresse de base dans laquelle on a besoin de taper éventuellement
    Address : null,

    // Le composant actuellement monté en tant que page 
    Page : null,

    // Le composant actuellement monté en tant que PopIn
    PopIn: null,

    jsonToQuery : function(json) {
        return '?' + 
            Object.keys(json).map(function(key) {
                if(json[key] != null)
                    return encodeURIComponent(key) + '=' +
                        encodeURIComponent(json[key]);
            }).join('&');
    },

    /**
     * Effectue une requete Ajax et retourne une promesse.
     * address : concaténé après App.Address, addresse à interroger
     * data : données de la requête
     */
    request : function(address, data, method = "GET", redirect = true)
    {
        return new Promise(function(resolve, reject)
        {
            var href=window.location.href;
            if(data == null)
                data = {};
            var request = fetch(address, {
                method: method,
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            request.then(function(response){
                response = response.json();
                if(address.indexOf(App.Address) == -1)
                {
                    resolve(response);
                    return;
                }
                try
                {
                    ErrorHandler.handle(response);
                    resolve(response);
                }
                catch(error)
                {
                    if(error.name == ErrorHandler.State.FATAL)
                    {
                        if(redirect)
                        {
                            var message = encodeURI(error.message);
                            reject(ErrorHandler.State.FATAL);
                            route("/error/"+message);
                        }
                        else 
                        {
                            ErrorHandler.alertIfError(error);
                        }
                    }
                    else 
                        reject(error);
                }
            });
            request.catch(function(error){
                var message = encodeURI("Une erreur réseau a eu lieu. Vérifiez votre connexion et réessayez.");
                reject(ErrorHandler.State.FATAL);
                route("/error/"+message);
            });
        });
    },

    /**
     * Change la page actuellement montée
     * tag : nouveau tag à monter
     * data : données à transmettre en opts au nouveau tag monté
     */
    changePage : function (tag, data)
    {
        if(App.Page != null)
        {
            App.Page.forEach(function(t)
            {
                t.unmount();
            });
            var e = document.createElement("div");
            e.id = "app";
            document.body.appendChild(e);
        }
        App.Page = riot.mount("div#app", tag, data);
        window.scroll(0,0);
    },

    showPopIn : function(tag, data)
    {
        if(App.PopIn != null)
        {
            App.PopIn.forEach(function(t)
            {
                t.unmount();
            });
            var e = document.createElement("div");
            e.id = "popin";
            e.class = "visible";
            document.body.appendChild(e);
        }
        App.PopIn = riot.mount("div#popin", tag, data);
    },

    hidePopIn : function()
    {
        var e = document.getElementById("popin");
        if(e != null)
            e.remove();
    },

  
}
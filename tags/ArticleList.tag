<app-articlelist>

    <app-articleitem each='{ article in articles }' article='{ article }' baseUrl = "{ opts.baseUrl }"></app-articleitem>

    <script>
        var tag = this;    
        
        tag.articles = null;

        tag.on("before-mount", function(){
            tag.articles = tag.opts.articles;
            if(tag.articles == null)
                throw new Error("Articles cant be null.");
        });

    </script>
</app-articlelist>
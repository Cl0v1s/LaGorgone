<app-home>
    
            <app-header baseUrl = "{ opts.baseUrl }"></app-header>
            <app-articlelist baseUrl = "{ opts.baseUrl }" articles="{ articles }"></app-articlelist>
            <app-footer></app-footer>
            <app-sponsors></app-sponsors>
            <script>
                var tag = this;
                
                tag.articles = null;

                tag.on("before-mount", function(){
                    tag.articles = tag.opts.articles;

                    if(tag.articles == null)
                        throw new Error("Articles cant be null.");
                });

            </script>
</app-home>
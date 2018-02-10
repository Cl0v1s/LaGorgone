<app-articleItem>
    <a href="/test/article/{article._id}">
    <div class="picture" style="background-image: url('{article.picture.path}');">
            <h2>
                { article.name }
            </h2>
    </div>
    </a>
    <script>
        var tag = this;
        
        tag.article = null;

        tag.on("before-mount", function(){
            tag.article = tag.opts.article;
        });
    </script>
</app-articleItem>
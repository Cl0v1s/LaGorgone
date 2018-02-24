<app-article>
    <app-header></app-header>
    <div class='article'>
        <div class="picture" style="background-image: url('{article.picture.path}');">
            <h2>{ article.name }</h2>
        </div>
        <div class="content" ref="content">
        </div>
        <div class="share">
            <!-- Facebook -->
            <a href="http://www.facebook.com/sharer.php?u=https://blog.lagorgone.cf/carnets/article/{article._id}" target="_blank">
                <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
            </a>

            <!-- Pinterest -->
            <a href="javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());">
                <img src="https://simplesharebuttons.com/images/somacro/pinterest.png" alt="Pinterest" />
            </a>
            
            <!-- Tumblr-->
            <a href="http://www.tumblr.com/share/link?url=https://blog.lagorgone.cf/carnets/article/{article._id}&amp;title=&ldquo;{ article.name }&rdquo;" target="_blank">
                <img src="https://simplesharebuttons.com/images/somacro/tumblr.png" alt="Tumblr" />
            </a>
            
            <!-- Twitter -->
            <a href="https://twitter.com/share?url=https://blog.lagorgone.cf/carnets/article/{article._id}&amp;text=&ldquo;{ article.name }&rdquo; by @JadeLanzone&amp;hashtags=Histoire,LaGorgone" target="_blank">
                <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
            </a>

        </div>
        <div class="pub">
                <p>
                        - Vous avez terminé l'article, merci de l'avoir lu ! -<br>
                        Nous espérons que nous avons pu vous partager quelque chose d'intéressant
                </p>
                <p>
                    Pour soutenir notre site et participer à son développement, vous pouvez cliquer sur le bouton ci-dessous.<br>
                    Pour le prix d'un thé, vous pouvez nous aider !<br><br>
                </p>
                <p>
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_s-xclick">
                        <input type="hidden" name="hosted_button_id" value="49RLSPHL5KWVW">
                        <input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal, le réflexe sécurité pour payer en ligne">
                        <img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1">
                        </form>
                    <!--<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_s-xclick">
                        <input type="hidden" name="hosted_button_id" value="J9EHK7QZNKA52">
                        <input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal, le réflexe sécurité pour payer en ligne">
                        <img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1">
                    </form>-->
                </p>
        </div>
    </div>
    <app-footer></app-footer>
    <app-sponsors></app-sponsors>
    <script>
        var tag = this;

        tag.article = null;

        tag.on("before-mount", function(){
            tag.article = tag.opts.article;
            if(tag.article == null)
                throw new Error("Article cant be null.");
        });

        tag.on("mount", function(){
            if(tag.article != null)
            {
                tag.refs.content.innerHTML = tag.article.content;
            }
        });
    </script>
</app-article>
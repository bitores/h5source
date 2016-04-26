<script>
(function(){

    var bp = document.createElement('script');

    bp.src = '//push.zhanzhang.baidu.com/push.js';

    var s = document.getElementsByTagName("script")[0];

    s.parentNode.insertBefore(bp, s);

})();
</script>
<div class="calcul_top"> 
    <div class="top_main">
        <div class="logo"><a href='/' rel="nofollow"><img src="/images/logo_beta.png" title="快抢车"  alt="快抢车" /></a></div>
        <ul>
            <li {if $selected =='index'} class = "linked"{/if}><a href="/">首页</a><span class="red-border-bottom"></span></li>
            <li {if $selected =='category'} class = "linked"{/if}><a href="{url:'category'}">品牌选车</a><span class="red-border-bottom"></span></li>
            <li {if $selected =='news'} class = "linked"{/if}><a href="{url:'news'}">新车资讯</a><span class="red-border-bottom"></span></li>
            <li {if $selected =='help'} class = "linked"{/if}><a href="{url:'help--index/id--40'}" rel="nofollow">购车帮助</a><span class="red-border-bottom"></span></li>

        </ul>           
        <div class="login" >
             <!--{if $user}-->
                <div class="loginBtn online_box">
                    <a href="{url:'@ucenter'}" title="会员中心"><img src="/images/login.png"/></a><br />
                    <a href="{url:'@ucenter'}" title="会员中心">{:(substr($user['user_mobile'], 0, 3))}****{:(substr($user['user_mobile'], 7))}</a>
                    <br/>
                    <div class="esc">
                            <a href="{url:'@user-logout'}" title="[ 退出 ]">[ 注销 ]</a>
                    </div>
                </div>
 
            <!--{else}-->
             <span class="loginBtn" id="login-dialog-btn" data-title="" data-url="{surl:'@login-v3'}" data-id="login-dialog"><a class='login_btn_outline' href='javascript:;'  id="login-dialog-btn2" data-title="" data-url="{surl:'@login-v3'}" data-id="login-dialog"><img src="/images/calculator/login.png"/></a><br />
                <span id="login-status">
                    <a href='javascript:;' title="登录" rel="external nofollow" >登录</a>
                </span>
             </span>
            <!--{/if}-->
            <img src="/images/calculator/tel.png" / class='tel'/>
        </div>
    </div>
</div>

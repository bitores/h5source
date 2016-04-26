<!--{include common/meta_dialog.tpl.html}-->
<link rel="stylesheet" type="text/css" href="{__CTPL_URL__}css/common.css">
<script> 
    $(function(){
        setTimeout(function(){
            api.size(380, 400);
        }, 10);
        
        // 刷新图片验证码
        $('#verify-image').on('click', function (){
            $('#verify-image').attr('src', $('#verify-image').attr('data-default') +  parseInt(Math.random() * 1000));
        });

        $('#user_verify').focus(function  () {
            $("#my-code").addClass("shadow");
        });

        $('#user_verify').blur(function  () {
            $("#my-code").removeClass("shadow");
        });
        
        $('#user_mobile').focus(function  () {
            $("#shadow").addClass("shadow");
        });

        $('#user_mobile').blur(function () {
            $("#shadow").removeClass("shadow");
        });
        
        $('#img_verify').focus(function  () {
            $("#input-verify").addClass("shadow");
        });

        $('#img_verify').blur(function () {
            $("#input-verify").removeClass("shadow");
        });
// 获取短信验证码
        $("#code-dialog-btn").on("click" ,function(){
            var mobile = $('#user_mobile').val();
            var imgverify = $('#img_verify').val();
            if (!mobile.match(/^1\d{10}$/)) {
                parent.REX.msg('请正确输入手机号码', function () {
                    $('#user_mobile').focus();
                }, 'fail');            
                return false;
            }else{
            	$.get('{url:'@misc-sms~'}/mobile_'+mobile+'/imgverify_'+imgverify,function(data){
            		if(data.code==0){
            			parent.REX.msg(data.msg);
            			var validCode = true;
           		        var time=50;
           		        var code=$("#code-dialog-btn");
           		        if (validCode) {
           		            validCode=false;
                            $("#voice-btn").attr('disabled',"true");
           		            code.addClass("msgs1");
           		            var t =setInterval(function  () {
           		                time--;
           		                code.html(time+"秒");
           		                if (time==0) {
           		                    clearInterval(t);
           		                code.html("重新获取");
           		                    validCode=true;
                                    $("#voice-btn").removeAttr('disabled');
           		                code.removeClass("msgs1");
           		                }
           		            },1000);
           		        }
            		}else{
            			// 是否超过次数  是否图形验证码正确
            			if(data.code == 2){
            				parent.REX.msg(data.msg);
            				$("#input-verify").show();
            			}else{
            				parent.REX.msg(data.msg);
            			}

            		}
            	})
            }
        });
// 获取语音验证码
$("#voice-btn").on("click" ,function(){

    var mobile = $('#user_mobile').val();
    var imgverify = $('#img_verify').val();
    if (!mobile.match(/^1\d{10}$/)) {
        parent.REX.msg('请正确输入手机号码', function () {
            $('#user_mobile').focus();
        }, 'fail');            
        return false;
    }else{
    	$.get('{url:'@misc-sendvoicesms~'}/mobile_'+mobile+'/imgverify_'+imgverify,function(data){
    		if(data.code==0){
    			parent.REX.msg(data.msg);
    			var validCode = true;
   		        var time=50;
   		        var code=$("#code-dialog-btn");
   		        if (validCode) {
   		            validCode=false;
   		            code.addClass("msgs1");
   		            var t =setInterval(function  () {
   		                time--;
   		                code.html(time+"秒");
   		                if (time==0) {
   		                    clearInterval(t);
   		                code.html("重新获取");
   		                    validCode=true;
   		                code.removeClass("msgs1");
   		                }
   		            },1000);
   		        }
    		}else{
    			// 是否超过次数  是否图形验证码正确
    			if(data.code == 2){
    				parent.REX.msg(data.msg);
    				$("#input-verify").show();
    			}else{
    				parent.REX.msg(data.msg);
    			}
    		}
    	})
       
    }
});
        
        /** {{ 回车绑定click }} */
        document.onkeydown = function(e){ 
            var ev = document.all ? window.event : e;
            if(ev.keyCode==13) {
                $('.form-btn').trigger('click');
             }
        }

        /** {{ form提交 }} */
        $('.form-btn').on('click', function () {
            if (!$('#user_mobile').val().match(/^1\d{10}$/)) {
                parent.REX.msg('请正确输入手机号码', function () {
                    $('#user_mobile').focus();
                    var a=1;
                }, 'fail');
            }else if (!$('#user_verify').val().match(/^\d{4}$/) || $('#user_verify').val() == $('#user_verify').attr('placeholder')) {
                parent.REX.msg('请输入短信验证码', function () {
                    $('#user_verify').focus();
                }, 'fail');
            }else {
            	parent.REX.ajaxpost({
                    'url'   : '{surl:'@login-smssubmit'}',
                    'data'  : 'mobile=' + $('#user_mobile').val() + '&code=' + $('#user_verify').val() + '&img_verify=' + $('#img_verify').val(),
                    'succ'  : function (data) {
	                     if (data.code != '0') {
	                    	 if(data.login_count >= 3){
	                    		 $("#input-verify").show();
	                    	 } 
	                         parent.REX.msg(data.msg, function () {
	                         	$('#user_verify').focus();
	                         }, 'fail');
	                     }else{ 
		                    parent.REX.msg(data.msg, function () {
		                    	parent.location = parent.location;	 
		                 });
	                   	}
                    }
                });
              
            }
        });
        
    });
   
    /* }}} */
</script>


</head>
<!--{include common/header_dialog.tpl.html}-->

<body style="background-color:#fff;">
<div style="width:380px;height: 400px; overflow: hidden">

    <!--{// S_选项卡 }-->
    <div class="dialog-tab-wrapper dialog-wrapper-bg">
        <div class="dialog-tab">
            <div class="new-logo">
                <img src="{__CTPL_URL__}images/new-logo.png" alt="">
            </div>
            <i class="icon-times-circle-c" title="关闭" id="dialog-close-btn"></i>
            <div class="clear"></div>
        </div>
    </div>
    <!--{// E_选项卡 }-->

    <!--{// S_注册表单 }-->
    <form action="{url:'@%s-submit~', $_MODULE}" method="post" id="form" class="form-new">
        <p class="form-row-login" id="shadow">
            <span class="tel-word">手机号</span>
            <input type="tel" name="user[user_mobile]" id="user_mobile" value="" placeholder="请输入您的手机号码" class="cd-tel">
        </p>
      <!-- 图形验证码 -->
      
        <p class="form-row-login" id="input-verify" {if ($logincount >=3) } style="position: relative; display:block;" {else} style="position: relative; display:none;" {/if}>
            <span class="pw-word">图形验证</span>
            <input type="text" name="user[img_verify]" id="img_verify" placeholder="请输入验证码"   maxlength="4" />
            <img alt="点击刷新" src="{url:'@default:misc-verify-isajax-1~'}" style="cursor:pointer;position: absolute; right: 10px; top: 0;" data-default="{url:'@default:misc-verify-isajax-1-randstr-~'}"  id="verify-image" width="100" />
            <br/>
        </p>  
        
        <p class="form-row-login" id="my-code">
            <span class="pw-word">验证码</span>
            <input type="tel" name="user[user_verify]" id="user_verify" placeholder="请输入验证码" maxlength="4" class="placeholder yz-code verify"/>
            <a href="javascript:;" data-url="{url:'@misc-sms-mobile-~'}" data-id="imgcode" class="get-sms-verify-b" id="code-dialog-btn">获取验证码</a>
        </p>

        <!-- 语音验证码 -->   
        <p class="voice" id="voice">
            <span class="pw-word">收不到短信?请使用</span>
            <button class="voice-verify" id="voice-btn" type="button">语音验证</button>
        </p>
        
        <p class="submit-login">
            <a href="javascript:;" class="submit-login-btn form-btn" >完成</a>
        </p>
        <p style='line-height: 20px; text-align:center;'>
            <span><input id='checkedAgr' type='checkbox' checked="checked" style='width: 15px;height: 15px; display:none' /></span>
            <span>点击完成表示同意
                <a href="javascript:;" id="reg-btn" data-width="600px" data-height="600px" data-url="{url:'@page-regagr'}" data-id="regagr" data-title="快抢车用户注册协议">《快抢车用户注册协议》</a>
            </span>
        </p>
    </form>
    <!--{// E_注册表单 }-->

</div>
<script type='text/javascript'>
    $('#reg-btn').click(function(){
        
        parent.REX.dialog(this);
    });
</script>

<div class='index-right-gift'>
	<!-- <p   id='left-KF_top' >
		<a class='show_xf' href='javascript:;' id='show_tel'><img src='/images/oopenim_kf.png'/><span class='show-right' >在线<br />客服</span></a>
	</p> -->
	<p id='left-KF_top'>
		<a  href='javascript:;'  >
			<span class="tc-btn">在线<br>客服</span>
		</a>
	</p>
	<p>
		<span class='show-tel-detail'><img src='/images/xf_tel_detail.png'/></span>
		<a class='show_xf' href='javascript:;' id='show_tel'><img src='/images/xf_tel.png'/><span class='show-right'>联系<br />电话</span></a>
	</p>

	<p>
	<span class='show-tel-float show-tel-detail'><img src='/images/xf_erm.png'/></span>
		<a class='show_xf' href='javascript:;' id='show_weixin'>
			<img src='/images/xf_weixin.png'/>
			<span class='show-right'>微信<br />关注</span>
		</a>
	</p>
	<!-- 意见反馈 -->
	<!-- <p>
		<a class='show_xf' href='javascript:;'  id='show_opinion' data-toggle="modal" data-target="#myModal">
			<img src='/images/xf_info.png'/>
			<span class='show-right'>意见<br />反馈</span>
		</a>
	</p> -->

	<!--<p><a href='javascript:;'><img src='/images/xf_info.png'/></a></p>	-->	
	<!-- 返回顶部	 -->
	<p class='show_top'>
		<a href='javascript:;' id='show_top' class='show_xf'><img src='/images/xf_top.png'/><span class='show-right'>回到<br />顶部</span></a>
	</p>

	<!-- <p><a href='{url:'@zty-gift'}' class="show_gift"><img src='/images/gift.png'/></a>
	</p> -->

	<!-- 吐槽 -->
	<p class="tucao">
		<a  href='javascript:;'  id='tucao' data-toggle="modal" data-target="#tucao-box">
			<span class="tc-btn">我要<br>吐槽</span>
		</a>
	</p>
</div>
<!-- 阿里百川 -->
		<div class="index-right-KF">
					<div class="right-KF_top">
								<span class="close_name">快抢车<b>在线客服</b></span>
								<span class="close_KF_2"><img src="/images/iconfont-close.png" alt=""  style="width: 16px; float: left; margin: 12px 10px 0px;"></span>
					</div>
					<div class="right-KF_buttom">
						<a  id='J_demo' ></a>
					</div>
		</div>
<div id="tucao-box" class="modal fade ">
	  <div class="modal-dialog my-dialog" id="send-tc">
	    <div class="modal-content tc-content">
	      <div class="modal-body">
	        <form action="" class="feedback">
	        	<div class="tc-textarea"><textarea name="" id="contents" >点我开启吐槽模式</textarea></div>
	        	<div class="send-content">
		        	<!--  图形验证码  -->
		        	<div class="pic-verify" style="overflow:hidde; float:left;">
		        		<input type="text" id="verify-image2" class="placeholder2" placeholder="请输入验证码">
		        		<img alt="点击刷新" src="{url:'@default:misc-verify-isajax-1~'}" style="cursor:pointer;" data-default="{url:'@default:misc-verify-isajax-1-randstr-~'}"  id="op-verify-image2"  />
		        	</div>
		        	<div id="message1"></div>
		        	<input type="button" class="cfm-btn" id="cfm-btn" value="确认发送">
	        	</div>
	        </form>
	      </div>
	    </div>
	  </div>
	  <div class="modal-dialog my-dialog" id="fankui">
	    <div class="modal-content xcq-content">
	      <div class="modal-body">
	        <form action="" class="feedback">
	        	<p class="get-xcq f-top" >
	        	    <span class="tel-word">手机号</span>
	        	    <input type="tel" name="user[user_mobile]" id="user_mobile1" value="" placeholder="请输入您的手机号码" class="cd-tel" maxlength="11">
	        	</p>

	        	<p class="get-xcq" >
	        	    <span class="pw-word">验证码</span>
	        	    <input type="tel" name="user[user_verify]" id="user_verify1" placeholder="请输入验证码" maxlength="4" class="placeholder yz-code verify"/>
	        	    <a href="javascript:;" class="get-sms-verify-b" id="code-dialog-btn1">获取验证码</a>
	        	</p>
	        	<div class="sub-btn">
	        		<input type="button" class="no-send" value="不用了" id="no-send">
	        		<input type="button" class="finish-btn" id="finish-btn" disabled="" value="完成">
	        	</div>
	        </form>
	      </div>
	    </div>
	  </div>
</div>
<script type='text/javascript' src='/js/tucao.js'></script>
<!-- 自动适配移动端与pc端 -->
<script src="https://g.alicdn.com/aliww/??h5.openim.sdk/1.0.6/scripts/wsdk.js,h5.openim.kit/0.3.3/scripts/kit.js" charset="utf-8"></script>
<script src="https://g.alicdn.com/aliww/h5.openim.log/0.0.3/scripts/wlog.js" charset="utf-8"></script>
<script type="text/javascript">
//阿里百川 在线客服
$(function (){
			$("#left-KF_top").click(function(){
					if($(".index-right-KF").css("display")=="none"){
					$(".index-right-KF").show();
					}else{
					$(".index-right-KF").hide();
					}
			});
			
			$(".close_KF_2").click(function(){
				$(".index-right-KF").hide();
			});
				// 客服
				var J_demo = document.getElementById('J_demo');
				WKIT.init({
		    	    container: J_demo,
		    	    width: 400,
		    	    height: 450,
		    	    uid: getCookie('uid'), //用户账号getCookie("uid")
		    	    appkey:  getCookie('appkey'),
		    	    credential: getCookie('pwd'), //用户密码getCookie("pwd")
		    	    touid: '快抢车',//客服账号
		    	    imgUploader: true,
		    	    sendBtn: true,
		    	    placeholder: '说点什么吧！',
		    	    themeBgColor: '#f30',
		    	    sendMsgToCustomService: true
		    	});
				// 阿里百川用户访问足迹
				WLOG.init({
					 uid: getCookie('uid'), 
			   	 	 appkey:  getCookie('appkey'),
				    fromChannel:'', // 渠道（可选）
				    dataForDisplay: { 
				    }// 需要在千牛右侧插件中显示的数据（可选）
				});
			//获取COOKIE
			 function getCookie(cookie_name)  {  
					 var allcookies = document.cookie;
					 var cookie_pos = allcookies.indexOf(cookie_name);
						   if (cookie_pos != -1)  
							 {    
							 cookie_pos += cookie_name.length + 1; 
							 var cookie_end = allcookies.indexOf(";", cookie_pos);  
														 if (cookie_end == -1)  
														 {  
														 cookie_end = allcookies.length;  
														 }  
							 var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
							 }  
			 return value;  
			 }
});
</script>
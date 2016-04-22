(function(){
	App.controller("Ctrl",function($scope, $http){
		//记录图形验证码是否显示
		var regin_send_timer = null,
			p_visual = false,
			regin_send_sec = 60;//记录时间
		var send_voice_able = true,
			isMobile=/^1\d{10}$/,
			SMS = 1,PIC = 2;
		
		// 获取图片验证码
		function gen_img_code(){
			$http_post($http,{
				"uri"   :"identify.get_image_code"
			}).success(function (res) {
				if(res.code == 0){
					$(".gen_pcode").css('background',"url("+res.data+"?sess_id="+res.sess_id+"&v=" + new Date().getTime()+") no-repeat center center");
					localStorage.kqc_sess_id = res.sess_id;
				}
			});
		}
		
		// 判断图形码真伪
		function is_PIC_Right( success_callback ){
			$http_post($http,{
				"uri"   :"identify.verify_imgcode",
			    "param" :{
			    	"image_verify" : $("#user_pcode").val()
			    }
			}).success(function (res) {
				if(0 == res.code){
					success_callback();
				} else {
					$('.p_info').html('图形码错误');
				}
            });
		}
		
		// 获取短信验证码（根据参数 发送短信验证码和语音验证码）
		function send_sms_voice(sms_voice){
			send_voice_able = false;
			$("#gen_sms").hide();
			$("#regin .sec_info").show();
			$http_post($http,{
				"uri"   :sms_voice == SMS ? "identify.send_sms" : "identify.send_voice_sms",
			    "param" :{
			    	user_mobile: $("#user_tel").val()
			    }
			}).success(function (res) {
				
				switch(parseInt(res.code)){
					case 0:{
						initTimer();
					}
					break;
					case 2:{
						initTimer(parseInt(res.sec));
					}
					break;
					case 6:{
						$("#gen_sms").show();
						$("#regin .sec_info").hide();
						
						$(".p_code").html('');
						$('.mask').show();
						
						p_visual = true;
						gen_img_code();
						send_voice_able = true;
//						$("#regin .dialog_btn").removeClass('yes');
//						$("#regin .dialog_btn").addClass('no');
					}
					break;
					case 9:{
						$("#gen_sms").show();
						send_voice_able = true;
						$("#regin .sec_info").hide();
						Log.show(res.msg);
					}
					break;
					default:{
						$("#gen_sms").hide();
						$("#regin .sec_info").show();
					}
				}
            });
		}
		
		// 判断手机号格式 是否正确
		function isTELTURE(){
			if(!isMobile.test($("#user_tel").val().trim()) || $("#user_tel").val().trim().length !== 11){
				$('.error_info').html('手机号错误');
				return false;
			}
			$('.error_info').html('');
			return true;
		}
		
		// 判断图形码格式 是否正确
		function isPICTURE(){
			if(4 !== $("#user_pcode").val().trim().length){
				$('.p_info').html('图形码错误');
				return false;
			}
			$('.p_info').html('');
			return true;
		}
		
		// 判断图形码格式 是否正确
		function isSMSTURE(){
			if(4 !== $("#user_scode").val().trim().length){
				$('.error_info').html('验证码错误');
				return false;
			}
			$('.error_info').html('');
			return true;
		}
		
		function initTimer(sec){
			if(regin_send_timer){	
				clearInterval(regin_send_timer);
				$("#regin .sec_info").text(' 重新获取 ');
			}
			
			regin_send_sec = !!sec ? sec : 60;
			regin_send_timer = setInterval(function(){
				$("#regin .sec_info").text('重新获取'+regin_send_sec+'s');
				regin_send_sec--;
				if(regin_send_sec<=-2){
					$("#regin .sec_info").text(' 重新获取 ');
					
					$("#gen_sms").show();
					$("#regin .sec_info").hide();
					clearInterval(regin_send_timer);
					regin_send_sec = 60;
					send_voice_able = true;
				}
				
			},1000);
		}	
				
		// 获取新的图形验证码
		$("#gen_pic").on('click',function(){
			gen_img_code();	
		});
		
		// 获取短信验证码,之前要验证图形码是不是输入正确，屏蔽用户恶意短信验证
		$("#gen_sms").on('click',function(){
			if(isTELTURE()){
				if(p_visual == true){
					if (isPICTURE()) {
						is_PIC_Right(function(){send_sms_voice(SMS);});
					} else {
						$('.mask').show();
						$('.p_info').html('');
						gen_img_code();
					}
				} else {
					send_sms_voice(SMS);
				}
			}
		});

		// 语音验证码
		$("#gen_voice").on('click',function(){
			if(send_voice_able){
				if(isTELTURE()){
					if(p_visual == true){
						if (isPICTURE()) {
							is_PIC_Right(function(){send_sms_voice(PIC);});
						}
					} else {
						send_sms_voice(PIC);
					}
				}
			}
		});
	
		//登录验证
		$("#login").on('click',function(){
			$("#gen_sms").show();
			$("#regin .sec_info").hide();
			send_voice_able = true;
			if(regin_send_timer){	
				clearInterval(regin_send_timer);
				$("#regin .sec_info").text(' 重新获取 ');
			}
		
			if(!isTELTURE() || (p_visual && !isPICTURE()) || !isSMSTURE()){
				return;
			}
			
			$http_post($http,{
				"uri"   :"mobilelogin.mobile_login",
			    "param" :{
			    	user_mobile         : $("#user_tel").val(),
			        user_ctype          : 0,
			        user_source			: 3,// for bijia by huangsinan
			        user_verify         : $("#user_scode").val(),
			        image_verify        : $("#user_pcode").val()
			    }
			}).success(function(res){
				switch(parseInt(res.code)){
					case 0:{
						localStorage.kqc_sess_id = res.sess_id;
						Log.show('登录成功');
						if(localStorage.kqc_backurl){
							location.href = localStorage.kqc_backurl
						} else {
							location.href = $home_index;
						}
						
					}
					break;
					case 1:{
						$('.error_info').html('手机格式错误');
					}
					break;
					case 2:
					case 3:{
						$('.error_info').html('验证码错误');
					}
					break;
					case 4:{
						$('.mask').show()
						$('.p_info').html('图形码错误');
					}
					break;
				}
			});

		});
		
		$(".close,.mask").on('click',function(){
			$('.mask').hide();
			$('.p_info').html('');
		});
		
		$('.p_ver').on('click',function(e){
			e.stopPropagation();
		});
		
		$('#p_btn').on('click',function(e){
			e.stopPropagation();
			
			if(isPICTURE()){
				
				is_PIC_Right(function(){
					$('.mask').hide();
					$('.p_info').html('');
				});
			}
		});
		
		// 协议
		$("#xybtn").on('click',function(){
			$(".xy_mask").show();
			$http_post($http,{
				"uri"   :"user.agreement",
				"param" :{
			    	"key":"agreement-kbj"
			    }
			}).success(function (res) {
				$('#xyTxt').html(res.data);
	        });
		});
		
		$(".xy").on('click',function(e){
			e.stopPropagation();
		});
	
		$("#regin_close_btn,.xy_mask").on('click',function(e){
			e.stopPropagation();
			$(".xy_mask").hide();
		});
		
	});
})();

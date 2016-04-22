(function(namespace){	
	namespace.register = function( callback ) {
		
		if(callback) {
			namespace.callback = callback;
		}
	}
	$('.dialog_in div').on('keydown',function(){
		var theEvent = window.event || e; 
	    var code = theEvent.keyCode || theEvent.which; 
	    if(code == 13){
	    	return false;
	    }
	    var lef = $(this).text().length,
	    	rig = parseInt($(this).attr('maxlength'));
	    
	    if(lef >= rig && code !== 8){

	        return false;
	    }
	})
	
	//记录图形验证码是否显示
	var regin_send_timer = null,
		p_visual = false,
	//	p_count = 0;
		regin_send_sec = 60;//记录时间
	var send_voice_able = true;
		function gen_img_code(){
	
			jQuery.ajax({
				type:"post",
				url:gateway,
				async:true,
				dataType: "JSON",
				data    : JSON.stringify({
				    "uri"   :"identify.get_image_code",
				    "param" :{
				    }
				}),
				success : function (res) {
					if(res.code == 0){
						jQuery(".gen_pcode").html("<img src='"+res.data+'?sess_id='+res.sess_id+'&v=' + new Date().getTime()+"'/>");
						localStorage.kqc_sess_id_tmp = res.sess_id;
					}
				}
			});
		}
		
		function regin_init(){
			jQuery("#user_tel,#user_pcode,#user_scode").val("");
			jQuery("#tel_info,#pcode_info,#scode_info,#scode_info2").hide();
			jQuery("#regin .gen_scode").show();
			jQuery("#regin .sec_info").text("准备发送");
			regin_send_sec = 60;
			jQuery("#regin .sec_info").hide();
			if(typeof regin_send_timer !== 'undefined' && regin_send_timer){	
				clearInterval(regin_send_timer);
			}
		}
		
		jQuery("#regin").on('click',function(e){
			e.stopPropagation();
			//数据初始化
			regin_init();
			if(p_visual){
				gen_img_code();
			}
			jQuery(this).hide();
			jQuery("body").removeClass("bd_mask alpha");
		});
		jQuery("#regin .dialog").on('click',function(e){
			e.stopPropagation();
		});
	
	        
		// 验证
		jQuery("#regin input").on('blur',function(){
			
			var idStr = jQuery(this).attr('data-bind'),
				oInput_info = jQuery(idStr),
				oInput_maxlength = jQuery(this).attr('data-maxlength'),
				oInput_len = jQuery(this).text().trim().length;
				
			
			if(oInput_len != oInput_maxlength){
				oInput_info.show();
			}else{
				oInput_info.hide();
			}
		
		});
		
		jQuery("#regin div").on('keyup',function(){
			
			var isMobile=/^1\d{10}jQuery/;
			if(jQuery("#user_tel").text().trim().length === 11 
				&& 4 === jQuery("#user_scode").text().trim().length){
					if(p_visual == true){
						
						if(4 === jQuery("#user_pcode").text().trim().length){
							jQuery("#regin .dialog_btn").removeClass('no');
							jQuery("#regin .dialog_btn").addClass('yes');
							jQuery("#regin .dialog_btn").removeAttr('disabled');
						}else{
							jQuery("#regin .dialog_btn").removeClass('yes');
							jQuery("#regin .dialog_btn").addClass('no');
							jQuery("#regin .dialog_btn").attr('disabled','disabled');
						}
						
					} else {
						jQuery("#regin .dialog_btn").removeClass('no');
						jQuery("#regin .dialog_btn").addClass('yes');
						jQuery("#regin .dialog_btn").removeAttr('disabled');
					}
		
			} else {
				jQuery("#regin .dialog_btn").removeClass('yes');
				jQuery("#regin .dialog_btn").addClass('no');
			}
		
		});
		
		// 图形验证码刷新
		jQuery(".gen_pcode").on('click',function(){
			gen_img_code();	
		});
		
		function initTimer(sec){
			if(regin_send_timer){	
				clearInterval(regin_send_timer);
				jQuery("#regin .sec_info").text('准备发送');
			}
			
			regin_send_sec = !!sec ? sec : 60;
			regin_send_timer = setInterval(function(){
				jQuery("#regin .sec_info").text(regin_send_sec+'秒后试');
				regin_send_sec--;
				if(regin_send_sec<=-2){
					jQuery("#regin .sec_info").text('准备发送');
					
					jQuery("#regin .gen_scode").show();
					jQuery("#regin .sec_info").hide();
					clearInterval(regin_send_timer);
					regin_send_sec = 60;
					send_voice_able = true;
				}
				
			},1000);
		}
		
		
		// 获取短信验证码,之前 图形验证码要正确
		// 记录验证码发送时间
		function send_sms_voice(sms_voice){
			send_voice_able = false;
			jQuery("#regin .gen_scode").hide();
			jQuery("#regin .sec_info").show();
			var uri = sms_voice == "sms" ? "identify.send_sms" : "identify.send_voice_sms";
			jQuery.ajax({
				type:"post",
				url:gateway,
				async:true,
				dataType: "JSON",
				data    : JSON.stringify({
				    "uri"   :uri,
				    "sess_id":localStorage.kqc_sess_id_tmp||localStorage.kqc_sess_id,
				    "param" :{
				    	user_mobile: jQuery("#user_tel").text().trim(),
				    }
				}),
				success : function (res) {
					switch(parseInt(res.code)){
						case 0:{
							localStorage.kqc_sess_id = res.sess_id;
							initTimer();
						}
						break;
						case 2:{
							initTimer(parseInt(res.sec));
						}
						break;
						case 6:{
							jQuery("#scode_info").hide();
							jQuery("#regin .gen_scode").show();
							jQuery("#regin .sec_info").hide();
							
							jQuery("#pcode").show();
							p_visual = true;
							send_voice_able = true;
							jQuery("#regin .dialog_btn").removeClass('yes');
							jQuery("#regin .dialog_btn").addClass('no');
						}
						break;
						case 9:{
							jQuery("#regin .gen_scode").show();
							send_voice_able = true;
							jQuery("#regin .sec_info").hide();
							Log.show(res.msg);
						}
						break;
						default:{
							jQuery("#regin .gen_scode").hide();
							jQuery("#regin .sec_info").show();
						}
					}
	            }
			});
		}
	
		jQuery(".gen_scode").on('click',function(){
			var isMobile=/^1\d{10}$/;
			if(!isMobile.test(jQuery("#user_tel").text().trim()) || jQuery("#user_tel").text().trim().length !== 11){
				jQuery("#tel_info").show();
				return;
			}else{
				jQuery("#tel_info").hide();
			}
			
			if(p_visual == true){
				if (4 !== jQuery("#user_pcode").text().trim().length) {
					jQuery("#pcode_info").show();
					return;
				}else{
					jQuery("#pcode_info").hide();
				}
				
			}
			
			if(p_visual == true){
				jQuery.ajax({
					type:"post",
					url:gateway,
					async:true,
					dataType: "JSON",
					data    : JSON.stringify({
					    "uri"   :"identify.verify_imgcode",
					    "sess_id":localStorage.kqc_sess_id_tmp,
					    "param" :{
					    	"image_verify" : jQuery("#user_pcode").text().trim()
					    }
					}),
					success : function (res) {
						if(0 == res.code){
							jQuery("#pcode_info").hide();
							
							localStorage.kqc_sess_id_tmp = res.sess_id;
							send_sms_voice("sms");
							
						} else {
							jQuery("#pcode_info").show();
						}
		            }
				});		
			} else {
				send_sms_voice("sms");
			}
		});
	
		
		// 语音验证码
		jQuery("#regin .dialog_rt span").on('click',function(){
			if(send_voice_able == false){
				return;
			}
			
			var isMobile=/^1\d{10}$/;
			if(!isMobile.test(jQuery("#user_tel").text().trim()) || jQuery("#user_tel").text().trim().length !== 11){
				jQuery("#tel_info").show();
				return;
			}else{
				jQuery("#tel_info").hide();
			}
			
			if(p_visual == true){
				if (4 !== jQuery("#user_pcode").text().trim().length) {
					jQuery("#pcode_info").show();
					return;
				}else{
					jQuery("#pcode_info").hide();
				}
				
			}
			
			send_voice_able = false;
			
			if(p_visual){
				
				jQuery.ajax({
					type:"post",
					url:gateway,
					async:true,
					dataType: "JSON",
					data    : JSON.stringify({
					    "uri"   :"identify.verify_imgcode",
					    "sess_id":localStorage.kqc_sess_id_tmp,
					    "param" :{
					    	"image_verify" : jQuery("#user_pcode").text().trim()
					    }
					}),
					success : function (res) {
						send_voice_able = true;
						if(0 == res.code){
							jQuery("#pcode_info").hide();
							
							localStorage.kqc_sess_id_tmp = res.sess_id;
							
							send_sms_voice();
							
						} else {
							jQuery("#pcode_info").show();
						}
		            }
				});
				
				
			} else {
				send_voice_able = true;
				send_sms_voice();
			}
	
		});
		
		
		//完成 登录
		jQuery("#regin .dialog_btn").on('click',function(){
			jQuery("#regin .gen_scode").show();
			jQuery("#regin .sec_info").hide();
			send_voice_able = true;
			if(regin_send_timer){	
				clearInterval(regin_send_timer);
				jQuery("#regin .sec_info").text('准备发送');
			}
		
			var able = true;
			var isMobile=/^1\d{10}$/;
			if(!isMobile.test(jQuery("#user_tel").text().trim()) || jQuery("#user_tel").text().trim().length !== 11){
				jQuery("#tel_info").show();
				able = false;
			} else {
				jQuery("#tel_info").hide(); 
			}
			
			if(p_visual){
				if (4 !== jQuery("#user_pcode").text().trim().length) {
					jQuery("#pcode_info").show();
					able = false;
				} else {
					jQuery("#pcode_info").hide();
				}
			}
			
			
			if (4 !== jQuery("#user_scode").text().trim().length) {
				jQuery("#scode_info").show();
	
				able = false;
			} else {
				jQuery("#scode_info").hide();
			}
			
			
			
			if(able == false){
				return;
			}

			jQuery.ajax({
				type:"post",
				url:gateway,
				async:true,
				dataType: "JSON",
				data    : JSON.stringify({
				    "uri"   :"mobilelogin.mobile_login",
				    "sess_id":localStorage.kqc_sess_id,
				    "param" :{
				    	user_mobile         : jQuery("#user_tel").text().trim(),
				        user_ctype          : 0,
				        user_verify         : jQuery("#user_scode").text().trim(),
				        image_verify        : jQuery("#user_pcode").text().trim()
				    }
				}),success : function (res) { 
					switch(parseInt(res.code)){
						case 0:{
							jQuery("#regin").hide();
							jQuery("body").removeClass("bd_mask alpha");
							localStorage.kqc_sess_id = res.sess_id;
							regin_init();
							
							if(namespace.callback) {
								namespace.callback();
							} else {
								location.reload();// 完成登录时页面刷新
							}
							
							
						}
						break;
						case 1:{
							jQuery("#tel_info").show();
						}
						break;
						case 2:
						case 3:{
							jQuery("#scode_info").show();
						}
						break;
						case 4:{
							jQuery("#pcode_info").show();
						}
						break;
						case 5:{
							
						}
						break;
					}
	            },error:function(xhr, textStatus, errorThrown){
					Log.show(xhr.status+":"+xhr.readyState+':'+textStatus);
				}
			});
		});
		
	
		
		jQuery(".login").on('click',function(){

			if(!!localStorage.kqc_sess_id == false){
				
				jQuery("#regin").show();
//				jQuery("body").addClass("bd_mask alpha");
				return;
			}
			
			jQuery.ajax({
				type:"post",
				url: gateway,
				async:true,
				dataType: "JSON",
				data    : JSON.stringify({
				    "uri": "bijia_product.isLogin",
				    "sess_id":localStorage.kqc_sess_id,
				    "param" :{
				    }
				})
				,success : function (res) {
					if(res.code == '0'){
						location.href = $user_mine;
					}else if(res.code == '1'){
						location.href = $home_index;
					}else{
						jQuery("#regin").show();
//						jQuery("body").addClass("bd_mask alpha");
					}
	            }
			});	
			
		});
		
		jQuery(".logo").on('click',function(e){
			e.stopPropagation();
			location.href = $home_index;
		});
		
		jQuery("#xybtn").on('click',function(){
			jQuery(".xy").show();
			jQuery.ajax({
				type:"post",
				url:gateway,
				async:true,
				dataType: "JSON",
				data    : JSON.stringify({
				    "uri"   :"user.agreement",
				    "sess_id":localStorage.kqc_sess_id,
				    "param" :{
				    	"agreement":"kbj"
				    }
				}),success : function (res) {
	
					jQuery('#xyTxt').html(res.data);
		        }
			});
		});
	
		jQuery("#regin_close_btn").on('click',function(e){
			e.stopPropagation();
			jQuery(".xy").hide();
		});

	
})(window);
	
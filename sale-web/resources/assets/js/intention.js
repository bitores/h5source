
$('.placeholder2').each(function(i, obj) {

	if ($.browser.msie && $.browser.version < 10) {
		var _obj = $(obj);
		if (_obj.val() == '') {
			_obj.val(_obj.attr('placeholder'));
		}
	
		_obj.on('blur', function() {
			if ($(this).val() == '') {
				$(this).val($(this).attr('placeholder'));
			}
		});
	
		_obj.on('focus', function() {
			if ($(this).val() == $(this).attr('placeholder')) {
				$(this).val('');
			}
		});
	}
});

// 获取验证码
$("#code-dialog-btn2").on("click" ,function(){
            var mobile = $('#txt_info_phone').val();
            if (!mobile.match(/^1\d{10}$/)) {
                parent.REX.msg('请正确输入手机号码', function () {
                    $('#txt_info_phone').focus();
                }, 'fail');            
                return false;
            }else{
            	$.get(sendsmsrul+mobile,function(data){
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
            			parent.REX.msg(data.msg)	;
            			
            		}
            	})
            }
        });


var canPost=true;
var canArelt=true;

function sendInfo(){
	
	var fname = $('#txt_info_name').val().replace(/^\s*/g,"").replace(/\s*$/g,"");
	var fcarname = $('#txt_info_car').val().replace(/^\s*/g,"").replace(/\s*$/g,"");
	var fphone = $('#txt_info_phone').val().replace(/^\s*/g,"").replace(/\s*$/g,"");
	var smsverify = $('#gift-user-verify').val();
	if (fname.length==0 || fname=='您的姓名'){		
		message('请输入您的姓名');
		return;
	}
	if (fcarname.length==0 || fcarname=='请填写意向车型'){
		message('请输入您的意向车型');
		return;
	}
	if (fphone.length==0 || fcarname=='您的联系方式'){
		message('请输入您的联系方式');
		return;
	}
	
	var reg = /^1\d{10}$/;

	if (!fphone.match(reg)) {
		$('#txt_info_phone').val('');
		if ($.browser.msie && $.browser.version < 10) {
			$('#txt_info_phone').val('您的联系方式');
			
		}
		$('#footer_box_message div').text('请正确输入您的手机号码');
		$('#footer_box_message').show();
		setTimeout(function() {
			$('#footer_box_message').hide();
				//$('#footer_box_message').remove();
		}, 3000);
		return;
	}
	if(!canPost){
		message('请稍候再提交');
	}
	
	$.ajax({
		type: "post",
		url: intenturl,   
		async: true,
		data: "intent[pi_user_mobile]=" + fphone + "&intent[pi_intent]=" + fcarname + "&intent[pi_car_id]=0&intent[pi_user_name]=" + fname+ "&intent[smsverify]="+smsverify,
		dataType: "JSON",
		success: function(d) {
			if(d.code == 0){
				$('#footer_box_message div').text(d.msg);		
				$('#footer_box_message').show();
				$('#txt_info_car').val('');
				$('#txt_info_phone').val('');
				$('#txt_info_name').val('');
				$(".gift-verify").hide();	
			}
			if(d.code == 2){
				$(".gift-verify").show();
			}else{
				$('#footer_box_message div').text(d.msg);		
				$('#footer_box_message').show();
				
			}
			
			setTimeout(function() {
				$('#footer_box_message').hide();
				
				//$('#footer_box_message').remove();
			}, 2000);
			setTimeout(function(){
				canPost=true;
			},5000)

		}
	});

	if ($.browser.msie && $.browser.version < 10) {

	}
}

function message(str){
	if(!canArelt)
		return;
	canArelt=false;
	$('#footer_box_message').hide();
	$('#footer_box_message div').text(str);
	$('#footer_box_message').show();
		setTimeout(function() {
			$('#footer_box_message').hide();
			canArelt=true;
				//$('#footer_box_message').remove();
		}, 2000);
}
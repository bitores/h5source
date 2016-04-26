// 字符串长度控制
jQuery.fn.maxLength = function(max){  
        this.each(function(){  
            var type = this.tagName.toLowerCase();  
            var inputType = this.type? this.type.toLowerCase() : null;  
            if(type == "input" && inputType == "text" || inputType == "password"){  
                //Apply the standard maxLength  
                this.maxLength = max;  
            }  
            else if(type == "textarea"){  
                this.onkeypress = function(e){  
                    var ob = e || event;  
                    var keyCode = ob.keyCode;  
                    var hasSelection = document.selection? document.selection.createRange().text.length > 0 : this.selectionStart != this.selectionEnd;  
                    return !(this.value.length >= max && (keyCode > 50 || keyCode == 32 || keyCode == 0 || keyCode == 13) && !ob.ctrlKey && !ob.altKey && !hasSelection);  
                };  
                this.onkeyup = function(){  
                    if(this.value.length > max){  
                        this.value = this.value.substring(0,max);  
                    }  
                };  
            }  
        });  
};
$(function(){	
	// 字符串长度控制
	$("#contents").maxLength(150);
	$("#user_mobile1").maxLength(11);
	$("#user_verify1").maxLength(11);
	// 侧边微信等
	$('.show_xf').mouseenter(function(){
		$(this).find('.show-right').show();
		$(this).find('img').hide();
		$(this).parent().find('.show-tel-detail').show();
	});
	$('.show_xf').parent().mouseleave(function(){
		$(this).find('.show-right').hide();
		$(this).find('img').show();
		$(this).find('.show-tel-detail').hide();
	});
	
	$(window).scroll(function(e){

		if($(window).scrollTop()>0){
			
			$('.show_top').show();
		}else{
			$('.show_top').hide();
		}
	});
	// 返回顶部
	$('#show_top').click(function(){
		$('html,body').animate({"scrollTop":0},500);
	});
	$('.kuaiman-left').on('click',function(){
		var x=$('#indexhot').offset().top;
		$('html,body').animate({scrollTop:x+'px'},500);
	});

	$('.kuaiman-right').on('click',function(){
		window.open(categoryurl,'_blank');
	});


// ---------------------吐槽-----------------------------------------------//
// 图形验证码刷新
$('#op-verify-image2').on('click', function (){
            $('#op-verify-image2').attr('src', $('#op-verify-image2').attr('data-default') +  parseInt(Math.random() * 1000));
});
//	打开模态框刷新验证码
$("#tucao").click(function(){
	$('#op-verify-image2').attr('src', $('#op-verify-image2').attr('data-default') +  parseInt(Math.random() * 1000));
})
$("#contents").focus(function  () {
	if($(this).val() == "点我开启吐槽模式"){
		$(this).val("");
	}
})
$("#contents").blur(function  () {
	if($(this).val()==""){
		$(this).val("点我开启吐槽模式");
	}
})
function tucao (){
	var contents= $('#contents').val();
	var image_verify2= $('#verify-image2').val();
	var pt=3;
	if (contents.length==0 || contents=='点我开启吐槽模式'){
		parent.REX.msg('请正确输入吐槽内容');
		return;
	}
	$.ajax({
		type: "post",
		url: feedbackurl,
		async: true, 
		data: "content=" + contents+"&image_verify=" +image_verify2+"&os_type=" +pt,
		dataType: "JSON",
		success: function(d) {
			if(d.code==0){
				$("#send-tc").hide();
				$("#fankui").show();
				$("#verify-image2").val("");
			}else if(d.code==9) {
				$(".pic-verify").show();
			}else if(d.code==5){
				parent.REX.msg("验证码错误");
			}
		}

	})
}

// 当内容填写完整之后可提交完成
$("#user_mobile1").focus(function  () {
	$(this).parent().addClass("shadow")
})
$("#user_mobile1").blur(function  () {
	var mobile=$("#user_mobile1").val();
	var verify=$("#user_verify1").val();
	if(mobile!=""&&verify!=""){
		 $("#finish-btn").removeAttr("disabled");
	}
	$(this).parent().removeClass("shadow")
})
$("#user_verify1").focus(function  () {
	$(this).parent().addClass("shadow")
})
$("#user_verify1").blur(function  () {
	$(this).parent().removeClass("shadow")
})
$("#user_verify1").bind('input propertychange', function() {
	$("#finish-btn").removeAttr("disabled");
});

$("#cfm-btn").click(function  () {
	tucao();
})
// 不获取洗车券
$("#no-send").click(function  () {
	$("#contents").val("点我开启吐槽模式");
	$("#send-tc").show();
	$("#fankui").hide();
	$('#tucao-box').modal('hide');
	$(".pic-verify").hide();
	$("#verify-image2").val("");
})
//获取短信验证码
$("#code-dialog-btn1").on("click" ,function(){
	var mobile = $('#user_mobile1').val();
	var imgverify = $('#img_verify1').val();
	if (!mobile.match(/^1\d{10}$/)) {
		parent.REX.msg('请正确输入手机号码', function () {
			$('#user_mobile').focus();
		}, 'fail');
		return false;
	}else{
		$.get(verURL+'/mobile_'+mobile+'/imgverify_'+imgverify,
				function(data){
			if(data.code==0){
				parent.REX.msg(data.msg);
				var validCode = true;
				var time=50;
				var code=$("#code-dialog-btn1");
				if (validCode) {
					validCode=false;
					code.addClass("msgs1");
					var t =setInterval(function  () {
						time--;
						code.html(time+"秒");
						if (time==0) {
							clearInterval(t);
							code.html("获取验证码");
							validCode=true;
							$("#voice-btn").removeAttr('disabled');
							code.removeClass("msgs1");
						}
					},1000);
				}
			}else if(data.code==9){
				parent.REX.msg(data.msg);
			}

		})
	}
});

//点击完成获取洗车券
$("#finish-btn").on("click",function(){
	var mobile = $('#user_mobile1').val();
	var smsverify=$("#user_verify1").val();
	$.ajax({
		type: "post",
		url: sendsms,
		async: true,
		data: "data[cou_mobile]=" + mobile+"&data[smsverify]=" +smsverify,
		dataType: "JSON",
		success: function(d) {
			if(d.code==0){
				$('#tucao-box').modal('hide');
				$('#user_mobile1').val("");
				$("#user_verify1").val("");
				parent.REX.msg("洗车券已发送到您的手机上");
				$("#contents").val("点我开启吐槽模式");
				$("#send-tc").show();
				$("#fankui").hide();
			}else if(d.code==1) {
				parent.REX.msg("请输入你的手机号");
			}else if(d.code==2){
				parent.REX.msg("验证码不能为空");
			}else if(d.code == 3) {
				parent.REX.msg("验证码不正确");
			}else if(d.code == 9) {
				parent.REX.msg("发送失败");
			}else if(d.code == 7) {
				parent.REX.msg("一个用户只能领取一次哦, 请不要多领取");
			}
		}
	})

})
})
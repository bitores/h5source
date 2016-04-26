var maxHeight=0;
var index=0;	
var interval;
$(function(){	
// ---------------------------------------banner-------------------------------//
	function banner(){
		$('#indexslider').slides({
		  effect: 'fade, fade',
		  crossfade: true,
		  container:'index-img',
		  paginationClass: 'index-pagination',
		  preloadImage: '',//loading 图片地址
		  play:6000,
		  fadeSpeed: 500,
		  pause:10,
		  generatePagination: false,
		  animationStart: function(current){
		     $('.index-pagination span').stop().animate({width:0}).hide();
		    } ,
		  animationComplete: function(current){
		     var $back=$('.back');
		     var leftw=(current-1)*34;
		     $back.animate({left:leftw},1000,'easeOutBack');
		     $('.index-pagination li').eq(current-1).find('span').show().animate({width:30},6000);
		   },
		  slidesLoaded: function() {
		  $('.index-pagination li').eq(0).find('span').animate({width:30},6000);
		  }
		});
	}

	function datalist_banner () {
		$.ajax({
			url:'index/slide',
			type:'get',
			data:'limit=6&type=1',
			dataType:'json',
			success:function(data){
				if(data.code=="0"){
					var bannerlist=data.data;
					var bannerhtml='';
					var indexhtml='';
					for(var i=0;i<bannerlist.length;i++){ 
						// bannerhtml+='<li id="slide_'+i+'"><a href="'+bannerlist[i].url+'"><img   src="img/'+i+'.jpg" /></li>';
						// bannerhtml+='<a href="'+bannerlist[i].url+'" target="_blank"><img src="img/'+i+'.jpg"  /></a>';
						bannerhtml+='<a href="'+bannerlist[i].url+'" target="_blank"><img src="'+uploadUrl+bannerlist[i].cover+'"  /></a>';
						indexhtml+='<li><a><div><span></span></div></a></li>';
					}
					$('.index-img').html(bannerhtml);
					$('.index-pagination').html(indexhtml);
					banner();	
				}
			},error:function  () {
				
			}
		})
	}
		
	datalist_banner();
// ----------------------------热销排行--------------------------//
	datalist_hotcar();
	
	function datalist_hotcar(){
		$.ajax({
			url:'index/hots',
			// url:'index/cars',
			type:'get',
			data:
//				"uri":"home.cars",
//				"param" : {
	        	// 'carids=80,88,108,105'
	        	'bsy2s=18515,18579,18668,18447'
//  			}	
			,
			dataType:'json',
			success:function(data){
				if(data.code=='0'){					
					var hotlist=data.data;
					var liHtml = [];
					var hothtml='';
	            	var li='';
	            	window.h=hotlist;
					for(var i=0;i<hotlist.length;i++){
						var firstcss='';
						var saleurl =  sale.replace('vv',hotlist[i].cc_cds_id);
						var saleurl = saleurl.replace('dd',hotlist[i].cc_bsy2);
						
						if(i%2==0)
							firstcss+=' hotsale-item-first';
						hothtml+='<div onclick=\"window.open("'+saleurl+'")\" class="hotsale-item'+firstcss+'">';
						hothtml+='<div class="hotsale-img"><a target="_blank" href="'+saleurl+'"><img src="'+ctplUrl+'images/car_hot_'+hotlist[i].cc_bsy2+'.jpg'+'"/></a></div>';
						var hottitle=hotlist[i].cc_bsy2_name;
//						if(hottitle.length>20)
//							hottitle=hottitle.substring(0,20)+'..';
						hothtml+='<div class="hotsale-content"><div class="hotsale-content-title"><a target="_blank" href="'+saleurl+'">'+hottitle+'</a></div>';
						//var hotcontent=hotlist[i].hotcontent;
						var hotcontent='';
						if(hotlist[i].cc_bsy2=='18515'){hotcontent='移动沙发/真皮座椅/家用真典范';}
						if(hotlist[i].cc_bsy2=='18579'){hotcontent='经典马六平台/外形优雅/<br>低投诉率';}
						if(hotlist[i].cc_bsy2=='18668'){hotcontent='美式肌肉车典范/5.8秒的百公里加速/宽大舒适的乘坐空间';}
						if(hotlist[i].cc_bsy2=='18447'){hotcontent='ZF8变速箱/保养便宜/2920mm超长轴距';}
						
//						if(hotcontent.length>25)
//							hotcontent=hotcontent.substring(0,25)+'..';
						hothtml+='<div class="hotsale-content-content"><a target="_blank" href="'+saleurl+'">'+hotcontent+'</a></div>';
						var hotprice1=hotlist[i].cc_price1;
						hothtml+='<div class="hotsale-content-price1">指导价：'+hotprice1+'万</div>';
						var hotprice2=hotlist[i].cc_price;					
						hothtml+='<div class="hotsale-content-price2">优惠价：<b>'+hotprice2+'</b>万</div></div>';
						hothtml+='</div>';
					}
					$('.hotsale-list').html(hothtml);
				}								
			},
			error:function(a,b,c){
			}
		});
	}
//---------------------------------特惠推荐-----------------------------------//
	datalist_morecar();
	
	function datalist_morecar(){
		var api=ca;
		$.ajax({
			url:api,
			type:'get',
			data : 'limit=12',
			dataType:'json',
			success:function(data){				
				if(data.code!=0)
	    			return;
	    		var hots=data.data;
				var liHtml = [];
            	var li='';
            	$.each(hots,function(k,v) {
            		var firstcss='';
            		var specss='';
            		if(k%4==0){
            			firstcss=' disc-item-first';
            		}
            		if(v.cc_is_recommand==1)
            		 specss=' disc-spe';
            		if(k<12){
            			liHtml=v;
            			var saleurl = sale.replace('vv',liHtml.cc_cds_id);
            			var saleurl = saleurl.replace('dd',liHtml.cc_bsy2);
            			li+='<div class="disc-item'+firstcss+specss+'">';
            			li+='<a target="_blank" class="disc-img" href="'+saleurl+'"><img src="'+uploadUrl+REX.thumb(liHtml.cc_cover,'300x200')+'" /></a>';
            			li+='<div class="disc-content"><a target="_blank" href="'+saleurl+'">'+liHtml.cc_bsy2_name+'</a></div>';
            			li+='<div class="disc-price1">指导价：￥'+liHtml.cc_price1+'万</div>';
            			li+='<div class="disc-price3">优惠价：<span>￥<b>'+liHtml.cc_price+'</b>万</span></div>'
            			li+='</div>';
            		}   
            		
            	});
            	
            	$('.disc-list').empty().append(li);
			}
		});
	}

function placeholder (className) {
	$(className).each(function(i, obj) {
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
	})
}
placeholder('.placeholder1');
placeholder('.placeholder');
placeholder('.placeholder2');
// // -----------------------------------意见反馈----------------------------------//
// function opinion(){
// 	var content= $('#content').val();
// 	var name = $('#op-name').val();
// 	var mobile = $('#op-number').val();
// 	var os_type= 3;
// 	var image_verify=$("#z-verify-image").val();

// 	if (name.length==0 || name=='您的大名'){		
// 		$('#message2').text('请输入您的姓名');
// 		$('#message2').show();
// 		return;
// 	}
// 	if (mobile.length==0 || mobile=='您的联系方式'){
// 		$('#message3').text('请输入您的联系方式');
// 		$('#message3').show();
// 		return;
// 	}
// 	if (content.length==0 || content=='有啥不爽尽管说'){
// 		$('#message1').text('请输入您的意见');
// 		$('#message1').show();
// 		return;
// 	}
	
// 	var reg = /^1[3458]\d{9}$/;

// 	if (!mobile.match(reg)) {
// 		$('#op-number').val('');
// 		if ($.browser.msie && $.browser.version < 10) {
// 			$('#op-number').val('您的联系方式');
// 		}
// 		$('#message3').text('请正确输入您的手机号码');
// 		$('#message3').show();
		
// 		return;
// 	}

// 	$.ajax({
// 		type: "post",
// 		url: feedbackurl,   
// 		async: true,
// 		data: "name=" + name + "&mobile=" + mobile + "&content=" + content+ "&os_type="+os_type+"&image_verify=" +image_verify ,
// 		dataType: "JSON",
// 		success: function(d) {
// 			if(d.code == 0){
// 				$('#message4').text('提交成功').show();	
// 				$('#content').val('有啥不爽尽管说');
// 				$('#op-name').val("");
// 				$('#op-number').val("");
// 				$('#z-verify-image').val("");
// 				placeholder('.placeholder1');
// 				placeholder('.placeholder');
// 				placeholder('.placeholder2');
// 				$('#op-verify-image').attr('src', $('#op-verify-image').attr('data-default') +  parseInt(Math.random() * 1000));
// 				setTimeout(function () {
// 					$('#myModal').modal('hide');
// 					$("#message4").hide();
// 				},2000);	
// 			}else if(d.code == 2) {
// 				$("#message1").text("姓名格式错误");
// 			}else if(d.code == 5){
// 				$("#message4").text("图形验证码错误");
// 			}
// 		}
// 	});
// }

// $("#content").focus(function  () {
// 	if($(this).val() == "有啥不爽尽管说"){
// 		$(this).val("");
// 	}
// 	$("#message1").hide();
// })

// $("#content").blur(function  () {
// 	if($(this).val()==""){
// 		$(this).val("有啥不爽尽管说");
// 	}
// })

// $("#op-name").focus(function  () {
// 	$("#message2").hide();
// })

// $("#op-number").focus(function  () {
// 	$("#message3").hide();
// })

// $("#conform").click(function  () {
// 	opinion();
// })


})

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

$(function  () {
	$('#content').maxLength(200);
	$("#op-name").maxLength(15);
	$("#op-number").maxLength(11);
	// 鼠标划过更多品牌显示
	$("#brand-more").mouseover(
		function  (event) {
			$("#brand-list").css("display","block");
			event.stopPropagation();
		}
	)
	$("#brand-list").mouseover(
		function  (event) {
			$("#brand-list").css("display","block");
			event.stopPropagation();
		}
	)
	$(document).mouseover(
		function  () {
			$("#brand-list").css("display","none");
		}
	)
})
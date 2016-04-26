var pageIndex=4, page=1;
$(function(){
	// 车款计算器弹出框
	$('.modals-close,#calculator').on('click',function(){
		$('#calculator').hide();
		$('.modal-dialog').hide();
		$('.modal-backdrop').hide();
		$('body').css({'overflow':'auto','height':'auto'});
	});
	$('.modal-dialog').on('click',function(e){
		e.stopPropagation();
	});
	$('#J_price_calculator').on('click',function(){
		$('#calculator').show();
		$('.modal-dialog').show();
		$('.modal-backdrop').show();
		$('body').css({'overflow':'hidden','height':'100%'});
	});


	// 询价车城市切换
//	$('#nevic-city p').on('click',function(e){
//        e.stopPropagation();
//		$('#nevic-city ul').show();
//		$('#nevic-city ul li').on('click',function(){
//			var con=$(this).html();
//			var register=$(this).attr('name');
//			var region1=this.id;
//			$('#nevic-city p i').text(con);		
//			$('.nevic-lice span').text(register);		
//			$('#region1').val(region1);
//			$('#nevic-city ul').hide();
//		})
//	});
   
    $('.btnDC').on('click', function () {
            if (!login) {
                $('#login-dialog-btn').trigger('click');
                window.next_step = function () {
                    $('.btnDC').trigger('click');
                };
            }else {// 生成订单
                REX.ajaxpost({
                    'url'       : $(this).attr('data-url'),
                    'data'      : "region0=" + $('#region0').val() + "&region1=" + $('#region1').val() + "&ccid=" + ccid,
                    'succ'      : function (d) {
                        if (d.code == '0') {
                            location.href = d.url;
                        }
                        else {
                            REX.msg(d.msg);
                        }
                    }
                });
            }

    });
    
    // 参数tab切换
	$('.qc-param').on('click', function () {
        $(this).addClass('current').siblings().removeClass('current');
        $('.param-more').addClass('dp_none');
        $($('.param-more').eq($(this).index())).removeClass('dp_none');
        
    });
    // 向下滚动一定距离时，隐藏导航出现
    $(window).scroll(function(){
                  var top = $(window).scrollTop();
                  //console.log(top);
                  var showTop =$(window).height();
                  if (top>showTop) {
                    $("#scroll-nav").css("display","block");
                  }else{
                    $("#scroll-nav").css("display","none");
                  };
    });

    +function () {
        //往上 按钮
        $('.nevi-down').on('click',function(){
            var view=$(".nevicar-right .neviovh");
            var move=$(".neviovh ul");
            var aLi=$(".neviovh ul li");
            var v_height= view.height();
            var a_Len= aLi.length;
            var page_count = Math.ceil(a_Len / pageIndex);
            if(!aLi.is(":animated") ){   
                if(page >=  page_count){ 
                    page = page_count;
                }else{
                    move.animate({ top : '-='+v_height }, "slow");
                    page++;
                }
            }
        })

        //往下 按钮
        $(".nevi-up").on("click",function  () {
            var view=$(".nevicar-right .neviovh");
            var move=$(".neviovh ul");
            var aLi=$(".neviovh ul li");
            var v_height= view.height();
            var a_Len= aLi.length;
            var page_count = Math.ceil(a_Len / pageIndex);
            if (page==1) {
                return;
            };
            if (!aLi.is(":animated")) {
               move.animate({top:"+="+v_height},"slow");
               page--;
            };

        })
    }();

    // 选择图片
    $(".neviovh ul li").on("click",function  () {
       var thumbnail= $(this).find("img");
       var  thsrc=$(thumbnail).attr("src");
//       console.log(thsrc);
       var c=$("#nevicarimg").find("img").attr("src");
        var newstr=thsrc.replace("300x200","900x600");
//        console.log(newstr);
       $("#nevicarimg").find("img").attr("src",newstr);
    });
   
    function totalPrice(){
	    /*购车费用计算*/	            
	    $('.modals-carname').text($('.nevicname').text());
		var carprice1 = parseInt(carpircenow* 10000);
		var carprice = parseInt(carpirceold*10000);
		var pl =$('.engine p:contains("排量")').find('span').text();
		var pls = 2000;				
		if (pl) {
			pls = parseInt(pl);
		}				
		$('#total_ul li:eq(0) .money').text(dh(carprice1));				
		$.ajax({
			type:"post",
			dataType: "json",
			async: true,
			url: apiPrice,
			data: {
				"uri": "common.calc_tax",
				"param": {
					"price": carprice,
					"dpm": pls 
				}
			},
			success: function(data) {
				var price1 = data.data["购置税"];
				$('#total_ul li:eq(1) .money').text(dh(price1));
				var price2 = data.data["车船税"];;
				$('#total_ul li:eq(2) .money').text(dh(price2));
				var price3 = data.data["上牌费"];;
				$('#total_ul li:eq(3) .money').text(dh(price3));
				var price4 = data.data["交强险"];;
				$('#total_ul li:eq(4) .money').text(dh(price4));
				var price5 = 0;
				$('#total_ul li:eq(5) .moneys').text('待定');
				var price6 = 0;
				$('#total_ul li:eq(6) .money').text(dh(price6));
				var alltotal = (carprice1 );
				alltotal = alltotal + (price1);
				alltotal = alltotal + parseFloat(price2);
				alltotal = alltotal + parseFloat(price3);
				alltotal = alltotal + parseFloat(price4);
				alltotal = alltotal + parseFloat(price5);
				alltotal = alltotal + parseFloat(price6);
				$('.modals-total').text(dh(alltotal));
				$('#total_ul').show();
			},error: function(XMLHttpRequest, textStatus, errorThrown) {
	            var price1=carprice*0.9/11.7;
	            if(pls<1600){
	            	price1=price1/2;
	            }
	            price1=Math.ceil(price1);
	            $('#total_ul li:eq(1) .money').text(dh(price1));
	            var price2=300;
	            if(pls<=1000)
	                price2=180;
	            else if(pls<=1600)
	                price2=300;
	            else if(pls<=2000)
	                price2=360;
	            else if(pls<=2500)
	                price2=720;
	            else if(pls<=3000)
	                price2=1500;
	            else if(pls<=4000)
	                price2=2640;
	            else 
	                price2=3900;
	            $('#total_ul li:eq(2) .money').text(dh(price2));   
	            var price3=1000;
	            $('#total_ul li:eq(3) .money').text(dh(price3));
	            var price4=950;
	            $('#total_ul li:eq(4) .money').text(dh(price4));
	            var price5=0;
	            $('#total_ul li:eq(5) .moneys').text('待定');
	            var price6=0;
	            $('#total_ul li:eq(6) .money').text(dh(price6));
	            var alltotal=(carprice1);
	            alltotal=alltotal+(price1);			
	            alltotal=alltotal+parseFloat(price2);			
	            alltotal=alltotal+parseFloat(price3);			
	            alltotal=alltotal+parseFloat(price4);			
	            alltotal=alltotal+parseFloat(price5);			
	            alltotal=alltotal+parseFloat(price6);			
	            $('.modals-total').text(dh(alltotal));
	            $('#total_ul').show();
	        }
		});

	}
    totalPrice();

    function dh(strNum){
    	if (strNum.length <= 3) {
			return strNum;
		}		
		if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
			return strNum;
		}						
		var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
		var re = new RegExp();	
		re.compile("(\\d)(\\d{3})(,|$)");						
		while (re.test(b)) {
			b = b.replace(re, "$1,$2$3");
		}
		return a + "" + b + "" + c;
    }

	function gethotcar(){			
		var li='';
    	var url='';
    	$.ajax({
    		url:rec + hotNum,
    		type:'get',
    		dataType:'json',
    		success:function(data){
    			if(data.code!=0)
    				return;
    			var hots=data.data.lists;
    			var liHtml = [];
	            var hotUl  = $('#hostlist');
	            $.each(hots,function(k,v) {
	                if(k<4) {
	                    //liHtml = hots.pop(v);
	                    liHtml=v;
	                    li += '<li class="nevimp">';
	                    url = morecarapi ;
	                    url = url.replace('vv',liHtml.cc_cds_id);
	                    url = url.replace('dd',liHtml.cc_bsy2);
	                    li += '<a href="' + url + '"  target="_blank" >';
	                    li += '<img src="'+uploadUrl+ REX.thumb(liHtml.cc_cover,'300x200') + '" /></a>';
	                    li += '<div class="nevcon"><h3><a href="' + url + '"  target="_blank" >' + liHtml.cc_bsy2_name + '</a></h3>';
	                    li += '<p class="nevire-guide">指导价：￥<span>' + liHtml.cc_price1 + '</span>万</p>';
	                    li += '<p class="nevire-free">优惠价：<i>￥</i><span>' + liHtml.cc_price + '</span><i>万</i></p><div class="nevcon"></li>';
	                }
	            });
	            hotUl.empty().append(li);
	            if(hotNum>=6){//如果超过5页 就返回第一页数据
	            	hotNum=1;
	            }else{
	            	hotNum++;
	            }
    		}
    	});
	}

    $("#hotchange").on('click',function(){
    	gethotcar();
    });    
	//分享到微信 微博 qq
    $('.share-btn').on('click', function () {
        REX.share($(this));
    });
    
})

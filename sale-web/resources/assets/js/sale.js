var page = 1, pageIndex = 4; 

$(function(){
	

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
	            var hotUl  = $('#news-car-list ul');
	            $.each(hots,function(k,v) {
	                if(k<3) {
	                    //liHtml = hots.pop(v);
	                    liHtml=v;
	                    li += '<li>';
	                   // url = morecarapi + liHtml.cc_bsy2;
	                    url = morecarapi ;
	                    url = url.replace('vv',liHtml.cc_cds_id);
	                    url = url.replace('dd',liHtml.cc_bsy2);
	                    li += '<a href="' + url + '">';
	                    li += '<img src="'+uploadUrl+ REX.thumb(liHtml.cc_cover,'300x200') + '" /></a>';
	                    li += '<h3>' + liHtml.cc_bsy2_name + '</h3>';
	                    li += '<p><i>￥</i><span>' + liHtml.cc_price + '</span><i>万</i> 指导价:' + liHtml.cc_price1 + '万</p></li>';
	                }
	            });
	            hotUl.empty().append(li);
	            if(hotNum>=18/3+1){
	            	hotNum=1;
	            }else{
	            	hotNum++;
	            }
    		}
    	});
	}
	
	gethotcar();
	
    $("#hotchange").on('click',function(){
    	gethotcar();

    });
	
	if($('.car-color ul:eq(0)').find('li').length<5){			
			$('.move_color:eq(0)').css('display','none');
		}
		if($('.car-color ul:eq(1)').find('li').length<5){
			$('.move_color:eq(1)').css('display','none');
	}
	
	function moveColor(index){
			if($('.move_color:eq('+index+')').attr('hide')){
				$('.move_color:eq('+index+')').text('更多');
				$('.move_color:eq('+index+')').attr('hide',false);
				$('.car-color ul:eq('+index+')').css('height','27px');
			}else{
				$('.move_color:eq('+index+')').text('收起');
				$('.move_color:eq('+index+')').attr('hide',true);
				$('.car-color ul:eq('+index+')').css('height','65px');
			}
			
	}	
	var lefts=900;
	var lefts2=125;
	var dataImg;		
	
	setTimeout(function(){
		for(var i=0;i<$('.color_li0').length;i++){
			var li=$('.color_li0').eq(i);
			if(!li.hasClass('color_li_disabled')){
				$('.color_li0').eq(i).addClass('color_li_active');
				break;
			}
		}
		for(var i=0;i<$('.color_li1').length;i++){
			var li=$('.color_li1').eq(i);
			if(!li.hasClass('color_li_disabled')){
				$('.color_li1').eq(i).addClass('color_li_active');
				break;
			}
		}
		var out_colors=$('.color_li_active:eq(0)').attr('data-value');
	    var in_colors=$('.color_li_active:eq(1)').attr('data-value');
	    if(out_colors==undefined || in_colors==undefined)
	    	return;
	    var api1=apicolor+"&color0="+out_colors+"&color1="+in_colors;
	    //console.log(cars_color[out_colors+'_'+in_colors+'_{$cur_style['bsy_id']}']);
	    if(cars_color[out_colors+'_'+in_colors+'_'+bsy_id]){
	    	$('#cars_price').text(cars_price[out_colors+'_'+in_colors+'_'+bsy_id]);
		    $('#cars_price1').text(cars_price1[out_colors+'_'+in_colors+'_'+bsy_id]);
		    
	    	var imgUrl=cars_color[out_colors+'_'+in_colors+'_'+bsy_id];
	    	$('.carnew img').attr('src',imgUrl);
	    	$('.share_qq').attr('data-image',imgUrl);
	    	$('.share_xinlang').attr('data-image',imgUrl);
	    }
	    getImgList(api1);
		    	
	},500);
	
	
	
	setTimeout(function(){
		$('.color_li').on('click', function () {
		
		if (!$(this).hasClass('color_li_disabled')) {
   			var _target  = $($(this).attr('data-target')),
        		colors   = $(this).attr('data-color').split(','),
        		color_li = $(this).attr('data-color-li');
    			_target.html($(this).find('a').text());
    			$(this).addClass('color_li_active').siblings().removeClass('color_li_active');
   				$(this).removeClass('color_li_disabled').css('opacity', 1);
    	
	        	if ($(this).hasClass('color_li0')) {
					$('.color_li1').removeClass('color_li_active');
						for(var i=0;i<$('.color_li1').length;i++){
							var li=$('.color_li1').eq(i);
							if(!li.hasClass('color_li_disabled')){
								$('.color_li1').eq(i).addClass('color_li_active');
								break;
							}
						}
	        		}
	        
	        	var out_color=$('.color_li_active:eq(0)').attr('data-value');
		    	var in_color=$('.color_li_active:eq(1)').attr('data-value');
		    	if(out_color==undefined || in_color==undefined)
		    		return;
		    	var api=apicolor+"&color0="+out_color+"&color1="+in_color;
		    	if(cars_color[out_color+'_'+in_color+'_'+bsy_id]){

		    		$('#cars_price').text(cars_price[out_color+'_'+in_color+'_'+bsy_id]);
		    		$('#cars_price1').text(cars_price1[out_color+'_'+in_color+'_'+bsy_id]);
			    	var imgUrl=cars_color[out_color+'_'+in_color+'_'+bsy_id];
			    	$('.carnew img').attr('src',imgUrl);
			    	$('.share_qq').attr('data-image',imgUrl);
			    	$('.share_xinlang').attr('data-image',imgUrl);
			    }
		    	getImgList(api);
		    	$('#album_images').find('.lazyload').lazyload({
		                effect : "fadeIn"
		        });
		}
	});
	},1000);
	
	function getImgList(api){
		
    	if(api){
    		apiuri=api;
    	}	        	
    	REX.get_json(apiuri,function(d){ 
	        var big_imgs = small_imgs = '';
	        if(d.code == '0') {
	        	$('.content_list').css('left','0px');
	            var height=600;
	            var width=900;
	            var sheight=window.innerHeight;
	            var swidth=window.innerWidth;
	
	            if(sheight<800){
	                height=sheight*0.75;
	                width=height*4/3;
	                if(width>swidth*0.75){
	                    width=swidth*0.75;
	                    height=width*3/4;
	                }
	                lefts=width;
	                $('.big_picture_box2').css('width','auto');
	                $(".big_picture").css('margin-top',(sheight-height)/2-50);
	            }
	            
	            $("img").lazyload({ 
					effect : "fadeIn" 
				});
	            
	            var alb='';
	            var imgLen=0;
	            page=1;
	            $.each(d.data,function(k,v){
	            	imgLen++;
	            	$('.content_list').css('width',imgLen*223+'px');
	                big_imgs += '<li style="height:'+height+'px;width:'+width+'px;"><a href="javascript:;">';
	                if(v.img_file){
	                	v1=uploadUrl+v.img_file;
	                }else
	                	v1=v;
	                dataImg=d.data;
	                var vv=v1;
	                if(sheight>=800)
	                    vv=REX.thumb(vv,'900x600');
	                big_imgs += '<img class="lazyload" src="'+staticUrl+'images/placeholder2.gif" zsrc="'+vv+'" style="width:20%;height:20%;padding:40% 20%;"  zstyle="width:auto;height:auto;margin:0 auto;display:inline-block;vertical-align: middle;max-width:'+width+'px;max-height:'+height+'px;"/>';
	                big_imgs += '</a></li>';	                    
	                small_imgs += '<li><a href="javascript:;">';
	                small_imgs += '<img src="'+REX.thumb(v1,'300x200')+'" style="margin:0 auto;display:inline-block;vertical-align: middle;max-width:200px;max-height:219px;width:auto;">';
	                small_imgs += '</a></li>';	                    
	                alb+='<li><a href="javascript:;"><img class="lazyload" src="'+REX.thumb(v1,'300x200')+'" width="210" height="139"></a></li>'	                    
	                $('.big_page').css('top',(height/2-20)+"px");
	                
	            });
	            $('#album_images').html(alb);	                
	            $('#big_picture,.picture').css({'max-height':height+'px'});
	            $('.big_picture,.picture').css('max-width',width+'px');
	            $('.picture_text').css('top',(height-50)+'px');
	            $('#big_picture').empty().append(big_imgs);	                	                
	            $('#small_picture').empty().append(small_imgs);
	            $('#small_picture').css('width',($('#small_picture li').length*140)+'px');
	            if(swidth<1000){
	                var smwidth=swidth/8;
	                var smheight=smwidth;
	                
	                $('#small_picture li').css({'width':smwidth+'px'});
	                $('#small_picture').parent().css({'width':(width-100)+'px','height':'100px'});//,'height':(smheight+37)+'px'});
	                $('.small_pic').css('width',width);	                    
	            }else{
	                   $('#small_picture').parent().css({'width':(width-100)+'px','height':105+'px'});
	                   $('#small_picture').css({'height':130+'px'});
	               }
	            $('#album_images').find('.lazyload').lazyload({
	            	effect : "fadeIn"
	        	});
	        }
	    });
    
	}
	
	$('.lazyload').lazyload({
	    effect : "fadeIn"
	});

	
    if ($('.color_li0').length == 1 && $('.color_li1').length == 1) {
        $('.color_li0').trigger('click');
        $('.color_li1').trigger('click');
    }

	var iindex=0;
	
	//查看大图弹窗
    $('.cont .content_list').on('click', 'li', function(){
        $('body').css({'height':'100%','overflow':'hidden'});
        iindex=$('.cont .content_list li').index($(this));
        $('#myApp-current-num').text(iindex+1);
        $('#small_picture li').removeClass('select');
        $('#small_picture li:eq('+iindex+')').addClass('select');
        /*$('#big_picture li:eq('+iindex+') img').attr('src',$('#big_picture li:eq('+iindex+') img').attr('zsrc'));*/
        $('.big_picture_box').show();
        $('.picture_box_bg').show();
        $('#big_picture').css('left',(-iindex*lefts)+'px');
       	showImg($('#big_picture li:eq('+iindex+') img'));
		$('#totalnum').text($('#big_picture li').length);
		$('.right-scroll').hide();
    });

    $('.big_picture_box').on('click','.close_pic',function(){
        $('body').css({'height':'auto','overflow':'auto'});
        $('.big_picture_box').hide();
        $('.picture_box_bg').hide();
    });
    
    $('.small_pic').on('click','.pre',function(){
        prevImg();
    });
    
    $('.big_picture').on('click','.prevArrow',function(){
        prevImg();
    });
	
	
	function prevImg(){
        var index=$('#small_picture li').index($('#small_picture .select'));            
        if(index<=0)
            return;
        index--;
        $('#myApp-current-num').text(index+1);
        $('#small_picture li').removeClass('select');
        $('#small_picture li:eq('+index+')').addClass('select');
        $('#big_picture').css({'left':'+='+(1*lefts)+'px'});
        showImg($('#big_picture li:eq('+index+') img'));            
	}
	
	$('.big_picture').on('click','.nextArrow',function(){
        nextImg();
    });    
    
    $('.small_pic').on('click','.next',function(){
        nextImg();
    }); 
    
    var bigImgIndex=0;
	        
    function nextImg(){
        var index=$('#small_picture li').index($('#small_picture .select'));
        if(index>=$('#small_picture li').length-1)
            return;
        index++;
        $('#myApp-current-num').text(index+1);
        $('#small_picture li').removeClass('select');
        $('#small_picture li:eq('+index+')').addClass('select');
        $('#big_picture').css({'left':'-='+(1*lefts)+'px'});
        showImg($('#big_picture li:eq('+index+') img'));
	}
    
    $('#small_picture').on('click','li',function(){
        var index=$('#small_picture li').index($(this));
        $('#myApp-current-num').text(index+1);
        $('#small_picture li').removeClass('select');
        $('#big_picture').css({'left':'-'+(index*lefts)+'px'});
        $(this).addClass('select');
        showImg($('#big_picture li:eq('+index+') img'));
    });
    
    function showImg(thi){	            
        var ind=$('#big_picture img').index(thi);
        var nowW=parseFloat($('.div_small_picture img').css('width').replace('px',''));
        var nowLeft=parseFloat((ind+1)*(nowW+6));
        var allLeft=parseFloat($('.div_small_picture').css('width'));	            
        if((ind+1)*lefts2>0.75*lefts)
        {
        	var ind2=ind-lefts*0.75/lefts2+1;
        	$('#small_picture').css('left',(-1*ind2*lefts2)+'px');
        }else{
        	
        	$('#small_picture').css('left','0px');
        }	            
        if(!thi.attr('zsrc'))
            return;
        bigImgIndex++;
        thi.after('<img id="bigImg_'+bigImgIndex+'" class="trueBigImg" src="'+thi.attr('zsrc')+'" style="'+thi.attr('zstyle')+';display:none;"/>');
        $('#bigImg_'+bigImgIndex).load(function(){
        	thi.remove();
        	$(this).show();
        });	            
	}
    
    function totalPrice(){
	    /*购车费用计算*/	            
	    $('.modals-carname').text($('.i_carname').text());
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
    
    $('.modals-close,#myModal').on('click',function(){
	            $('#myModal').hide();
	            $('.modal-dialog').hide();
	            $('.modal-backdrop').hide();
	            $('body').css({'overflow':'auto','height':'auto'});
	            
	        });
	        
	        $('.modal-dialog').on('click',function(e){
	            e.stopPropagation();
	        });
	        
	        $('#J_price_calculator').on('click',function(){
	            
	            $('#myModal').show();
	            $('.modal-dialog').show();
	            $('.modal-backdrop').show();
	            $('body').css({'overflow':'hidden','height':'100%'});
	            
	});
	
	
	/*初始内容*/
		
    $('.share-btn').on('click', function () {
        REX.share($(this));
    });

    // colors btn click


    $('.select-car-style').on('click', function () {
        $('.common_select_ul').show();
    });

    $('.common_select_ul').on('mouseleave', function () {
        $(this).hide();
    });

    $('.config_tab_nav').on('click', function () {
        $(this).addClass('current').siblings().removeClass('current');
        $('.nav-content').addClass('dp_none');
        $($('.nav-content ul').eq($(this).index())).parent().removeClass('dp_none');
    });

    $('#sale_order_btn').on('click', function () {
        var color0 = $('.color_li0').filter('.color_li_active'),
            color1 = $('.color_li1').filter('.color_li_active');
        if (color0.length == 0) {
            REX.msg('请选择外观颜色');
        }
        else if (color1.length === 0) {
            REX.msg('请选择内饰颜色');
        }
        else {
            if (!login) {
                $('#login-dialog-btn').trigger('click');
                window.next_step = function () {
                    $('#sale_order_btn').trigger('click');
                };
            }
            // 生成订单
            else {
                REX.ajaxpost({
                    'url'       : $(this).attr('data-url'),
                    'data'      : "c0=" + color0.attr('data-value') + "&c1=" + color1.attr('data-value'),
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
        }

    });
});
+function () {
    
    
    //往后 按钮
    $(".pre-l").click(function(){   
        var content = $(".cont"); 
        var content_list = $(".content_list");
        var v_width = content.width();
        var len = content.find("ul li").length;
        var page_count = Math.ceil(len / pageIndex) ;  
        if(page==1)
        	return;
        if( !content_list.is(":animated") ){    
        	content_list.animate({ left : '+='+v_width }, "slow");  
            page--;
        }
    });
    
    //往前 按钮
    $(".next-r").click(function(){
        var content = $(".cont"); 
        var content_list = $(".content_list");
        var v_width = content.width();
        var len = content.find("ul li").length;
        var page_count = Math.ceil(len / pageIndex) ;   
        if(!content_list.is(":animated") ){   
            if(page >=  page_count){ 
                page = page_count;
            }else{
                content_list.animate({ left : '-='+v_width }, "slow");
                page++;
            }
        }
    });
}();


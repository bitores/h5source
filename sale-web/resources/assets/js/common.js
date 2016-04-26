// 登录/注册回调
var login_callback = function () {
    $.get(STATUS_URL, function (d) {
        $('#login-status').html(d);
        if (typeof(window['next_step']) == 'function') {
            window['next_step']();
        }
    });
};
$(function(){
	// 右侧漂浮模块
	var divs = $('.process-box'), _config = [];
	for (var i = 0; i < divs.length; i ++) {
		var _div = $(divs[i]);
		_config.push({
			'x0'	: _div.offset().top,
			'x1'	: _div.offset().top + _div.outerHeight()
		});
	}

	$(window).scroll(function(){
		var sTop =$(document).scrollTop(),
			middle_line = sTop + ($(window).outerHeight() / 5);
		if(sTop < 400){
			$('.right-scroll').fadeOut('fast');
		}else{
			$('.right-scroll').fadeIn('fast');
		}
		for (var i = 0; i < _config.length; i ++) {
			if (middle_line >= _config[i].x0 && middle_line < _config[i].x1) {
				$('.right-scroll-list ul li:eq('+ i +')')
				.addClass('line-active').siblings().removeClass('line-active');
			}
        }
	});
	$('.right-scroll-list ul li').on('click',function(){
		$('body,html').animate({'scrollTop':_config[$(this).index()].x0}, 300);
	});

	$('.right-scroll h5').on('click',function(){
		$('body,html').animate({'scrollTop':0},400);
	});
        
        
         /** {{{ 品牌下拉框 **/
    $('#buy_coty_label').on('click', function () {
        if ($('#coty_opts').css('display') == 'none') {
            $('ul.common-select').hide();
            $('#coty_opts').slideDown(30);
        }
    });

    $('#buy_coty_label').on('focus', function () {
        $(this).trigger('click');
    });

    $('#coty_opts').on('mouseleave', function (){
        $(this).hide();
    });

    $('#coty_opts li').live('click', function (){
        $(this).parent().hide(1);
        $($(this).attr('data-label')).val($(this).html());
        $($(this).attr('data-taunid')).val($(this).attr('data-tuanval'));   // 品牌id(1)
        $($(this).attr('data-bsyid')).val($(this).attr('data-bsyval'));  //品牌id
        $($(this).attr('data-bsy1')).val($(this).attr('data-bsy1val'));  //车系 id
        var url = $($(this)).attr('data-bsyaction');
        var tuanid = $('#bsy_id').val();
        var li = '';
        //取车系
        $.ajax({
            url   : url,
            type  : 'POST',
            data  : {tuanid:tuanid},
            success :function(d){
                if(d.code == '0'){
                    $.each(d.data,function(k,v){
                        li +=  '<li data-value="'+v.bsy_id+'"  data-label="#buy_mileage_label" data-target="#buy_mileage_range" >';
                        li += '' + d.data[k].bsy_name + '</li>';
                    });
                    $("#mileage_opts").empty().append(li);
                }
            }
        });
        
    });
    /** }}} **/
    
    /** {{{ 车系下拉框 **/
    $('#buy_mileage_label').on('click', function () {
        if ($('#mileage_opts').css('display') == 'none') {
            $('#mileage_opts').slideDown(30);
        }
    });

    $('#buy_mileage_label').on('focus', function () {
        $(this).trigger('click');
    });

    $('#mileage_opts').on('mouseleave', function (){
        $(this).hide();
    });

    $('#mileage_opts').on('click', 'li', function (){
        $(this).parent().hide(1);
        $($(this).attr('data-label')).val($(this).html());
        $($(this).attr('data-target')).val($(this).attr('data-value'));
        
    });
    /** }}} **/

    /** {{{ 分站点击显示 **/
    $('.area').on('click',function(){
        $('.hot-city').removeClass('dp_none');
    });
    var element=$('.hot-city ul li a');
    element.on('click',function(){
        var _val=$(this).text();
        $('.logo a').children('span.area').text(_val);
        $('.hot-city').addClass('dp_none');
    })
    $('.hot-city').on('mouseleave',function(){
        $(this).addClass('dp_none');
    });
     /** }}} **/
    
    
});
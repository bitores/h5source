@include('layouts/meta')
<link type="text/css" rel="stylesheet" href="/css/colors.css?{_CACHE_VER_}" />
<script>var a4s_query_url = '{url:"@sale-a4s-id"}';</script>
<script  type="text/javascript" src="/js/sale.order.js"></script>
</head>
<body>

@include('layouts/header')
<div class="pay-main">
	<div class="crumbs">
		<ul class="clearfix">
			<li><span>1</span><a href="javascript:;">提交订单</a></li>
			<li><i></i></li>
			<li><span>2</span><a href="javascript:;">确认订单</a></li>
			<li><i></i></li>
			<li class="active-v"><span>3</span><a href="javascript:;">选择支付方式</a></li>
			<li><i></i></li>
			<li><span>4</span><a href="javascript:;">支付成功</a></li>
		</ul>
	</div>
	<div class="payment-cont">
		<h3>在线支付</h3>
        <div class="pay-type clearfix">
            <p>支付定金：<span id='price_txt' data-price='{$order['co_deposit']}'>人民币  {$order['co_deposit']} 元</span></p>
            
            <a class="pay_type_btn" href="javascript:;" data-id="4" style="float:left; margin-right:40px;"><img src="/images/pay-type_03.jpg"></a>
            <a class="pay_type_btn hide" href="javascript:;" data-id="3"><img src="/images/ALLINPAY-LOGO.jpg"></a>
            <a class="pay_type_btn hide" href="javascript:;" data-id="2" style="float:left;"><img src="/images/pay-type_08.jpg"></a>
            
        </div>
        <div class="pay-type-btn">
            <form action="" method="get" id="pay-form" target="_blank"></form>
            <a href="javascript:;" data-url="{url:'@sale-payafter'}" style="background:#CCC" id="pay-btn">确认支付</a>
        </div>
        <br />
        <form action="{url:'@sale-rem'}" method="post" id="rem_form">
            <input type="hidden" name="rem[cr_order_id]" id="cr_order_id" value="{$order['co_id']}" />
            <h3>线下支付</h3>
            <p style="margin: 33px auto;">请转账至快抢车官方账号，转账成功后拨打快抢车客服热线<span>400-626-9191</span>，提供银行流水单号，客服核对成功后即可安排发车</p>
        <ul>
        {foreach $banklist $k $v }
    		<li class="bg_img sel">
    			<input type="hidden" name="bank_id" id="{$v['bankid']}" value="{$v['bankid']}">
                <table class="user-bank" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                    <tr><td><span>支付金额：</span></td><td style="color:#ff0000" id='price_txt2'>人民币  {$order['co_deposit']} 元</td></tr>
                    <tr><td><span>收款户名：</span></td><td>磁锋网络科技（杭州）有限公司</td></tr>
                    <tr><td><span>收款帐号：</span></td><td>{$v['companyaccount']}</td></tr>
                    <tr class="last-tr"><td><span>开户行：</span></td><td>{$v['bankaddress']}</td></tr>
                </table>
            </li>
            <p></p>
		{/foreach}
        </ul>
        <input type="hidden" name="rem[cr_bank_id]" id="bank_id" value="" />
            <p style="margin:15px auto;">如果您已经付款，您也可以在线输入您付款的银行流水单号，客服核对成功即可安排发车</p>
            <p class="payment-text" style="margin: 0 auto;">
                <input type="text" placeholder="请输入流水单号" name="rem[cr_tn]" id="cr_tn" class="placeholder">
                <a href="javascript:;" id="rem_submit_btn" >确认</a>
            </p>
        </form>
	</div>
</div>
@include('layouts/newfooter')
<script>
    var s_status = false;

    $(function () {
        $(".bg_img").on('click', function () {
			var id ;
            $(this).removeClass("sel");
            $(this).addClass("seld");
			$(this).siblings().removeClass("seld");
			$(this).siblings().addClass("sel");
			 id = $(".seld input").attr('id');
			 $('#bank_id').val(id) ;
        });
        
        $('.pay_type_btn').on('click', function () {
            var pt = $(this).attr('data-id'), _this = $(this);
            $('.pay_type_btn').removeClass('active-bg');
            _this.addClass('active-bg');
            REX.get_json('{url:'@user-cdspayform-sn-%s-pt-~', $order['co_sn']}' + pt, function (d) {
                if (d.code == '0') {
                    s_status = true;
                     // # bug  需要清空form里面的内容
                    $('#pay-form').empty();
                    // console.log(d);
                    $('#pay-form').append(d.html);
                    $('#pay-form').attr('action', d.action);
                    $('#pay-form').attr('method', d.method);
                    $('#pay-btn').css('background', '#FE7216');
                }
                else {
                    REX.msg(d.msg, $.noop, 'fail');
                }
            });
        });

        $('#pay-btn').on('click', function () {
            if (s_status == true){
                var obj = this;
                $.dialog({
                    id      : $(obj).attr('data-id') ,
                    content : 'url:' + $(obj).attr('data-url'),
                    title   : $(obj).attr('data-title'),
                    lock    : $(obj).attr('data-lock') != undefined,
                    padding : 0 ,
                    drag    : false,
                    cache   : false,
                    min     : false,
                    max     : false
                });
                // 提交表单
                $('#pay-form').submit();
            }
        });

        $('#rem_submit_btn').on('click', function () {
            REX.formpost('#rem_form', function (d) {
                if (d.code == '0') {
                    location.href = '{url:'@ucenter-order'}';
                }
                else {
                    REX.msg(d.msg, function () {
                        if (d.field != undefined) {
                            $('#' + d.field).focus();
                        } 
                    });
                }
            });
            
        });
        
    });
</script>
</body>
</html>
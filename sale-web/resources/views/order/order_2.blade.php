@include('layouts/meta')
<link type="text/css" rel="stylesheet" href="/css/colors.css?{_CACHE_VER_}" />
<script>var a4s_query_url = '{url:"@sale-a4s-id"}';</script>
<script  type="text/javascript" src="/js/sale.order.js"></script>
</head>
<body>

@include('layouts/header')
<script type="text/javascript">
    // console.log({$regions_test});
</script>
<div class="confirm-mian">
    <div class="crumbs">
        <ul class="clearfix">
            <li><span>1</span><a href="javascript:;">提交订单</a></li>
            <li><i></i></li>
            <li class="active-v"><span>2</span><a href="javascript:;">确认订单</a></li>
            <li><i></i></li>
            <li><span>3</span><a href="javascript:;">选择支付方式</a></li>
            <li><i></i></li>
            <li><span>4</span><a href="javascript:;">支付成功</a></li>
        </ul>
    </div>
    <div class="confirm-infor">
        <h5>确认订单信息</h5>
    </div>
    <table class="confirm-form" cellpadding="0" cellspacing="0" border="1">
        <tr>
            <td>订单号 : <span>{$order['co_sn']}</span></td>
            <td>订单时间 : <span>{$order['co_adate']|date, Y-m-d H:i}</span></td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>车主姓名 : <span>{$order['co_customer_name']}</span></td>
            <td>身份证号 : <span>{$order['co_customer_id']}</span></td>
            <td>联系方式 : <span>{$order['co_customer_mobile']}</span></td>
        </tr>
        <!-- <tr>
            <td colspan="3" >发车点 : <span>&nbsp;&nbsp;{$regions[$order['co_release_region']]['name']}</span></td>
        </tr> -->
        <tr>
            <td colspan="3" >提车地点 : <span>
                {if $order['co_dmode'] == '1'}
                    &nbsp; &nbsp;
                    {$regions[$a4s['at_region0']]['name']}
                    {$regions[$a4s['at_region1']]['name']}
                    {$regions[$a4s['at_region2']]['name']}
                    &nbsp;
                    {$a4s['at_addr']}
                    &nbsp;
                    {$a4s['at_name']}
                {else}
                    &nbsp; &nbsp;
                    {$regions[$order['co_region0']]['name']}
                    {$regions[$order['co_region1']]['name']}
                    {$regions[$order['co_region2']]['name']}
                    &nbsp;
                    {$order['co_addr']}
                {/if}
            </span></td>
        </tr>
    </table>
    
    <div id="confirm">
        <div class="car-information clearfix">
            <img src="{__UPLOAD_URL__}{$cds['cds_cover']|thumb,300x200}" width="253" height="168">
            <div class="controduction car-color">
                <h4>{$car['cc_bsy2_name']}</h4>
                <ul class="clearfix  " style="width:100%;display:block;float: none">
                    <li style="width:55px;">外观颜色 : </li>
                    <li class="color_li color_li0">
                        <a href="javascript:;" class="cc_color cc_color0_{$car['cc_color0']}" style="background: #{$color0[$car['cc_color0']]['color_code']};border-radius: 50%;" title="{$color0[$car['cc_color0']]['color_name']}">{$color0[$car['cc_color0']]['color_name']}</a>
                    </li>
                    <li style="width:85px;margin-right: 0px;text-align:left;">{$color0[$car['cc_color0']]['color_name']}</li>
                    <li  style="width:55px;">内饰颜色 : </li>
                    <li class="color_li color_li1">
                        <a href="javascript:;" class="cc_color cc_color1_{$car['cc_color1']}" style="background: #{$color1[$car['cc_color1']]['color_code']};border-radius: 50%;" title="{$color1[$car['cc_color1']]['color_name']}">{$color1[$car['cc_color1']]['color_name']}</a>
                    </li>
                    <li style="width:85px;text-align:left;">{$color1[$car['cc_color1']]['color_name']}</li>
                </ul>
                <p>车价 : <b>{$order['co_car_amount'] / 10000} 万元</b> 运费 : <b>{$order['co_freight']} 元</b></p>
                <p>总价 : <span>{$order['co_amount'] / 10000 } 万元</span></p>
                <p>定金 : <span>{$order['co_deposit']|amount} 元</span></p>
                <a href="{url:'@sale-pay-sn-%s', $order['co_sn']}" class="pay-btn">支付定金</a>
                <a href="javascript:;" data-url="{url:'@sale-contract-coid-%d', $order['co_id']}" data-width='1100' data-height='700' class="dialog">查看合同</a>&nbsp;
                <a href="{url:'@sale-co-sn-%s' , $order['co_sn']}">返回修改</a>
            </div>
        </div>
    </div>
</div>
@include('layouts/newfooter')

</body>
</html>
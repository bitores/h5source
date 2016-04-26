@include('layouts/meta')
<link type="text/css" rel="stylesheet" href="/css/colors.css?{_CACHE_VER_}" />
<script>var a4s_query_url = '{url:"@sale-a4s-id"}';
	function showPro(str){
		if(str=='uidimg0'){
			$('#user_idimg0').append('<div id="uidimg0_div" style="width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:999;text-align: center;background: #FFF;"><img src="/images/uploading.GIF" style="width:auto;height:50%;margin-top: 30px;margin-left: 55px;"/></div>')
		}else{
			$('#user_idimg1').append('<div id="uidimg1_div" style="width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:999;text-align: center;background: #FFF;"><img src="/images/uploading.GIF" style="width:auto;height:50%;margin-top: 30px;margin-left: 55px;"/></div>')		
		}
	}
	function hidePro(str){
		if(str=='uidimg0'){
			$('#uidimg0_div').remove();
		}else{
			$('#uidimg1_div').remove();	
		}
	}
</script>
<script  type="text/javascript" src="/js/sale.order.js"></script>

</head>
<body>
@include('layouts/header')
<div class="order-main">
	<div class="crumbs">
		<ul class="clearfix">
			<li class="{$step == '1' ? 'active-v' : ''}"><span>1</span><a href="javascript:;">提交订单</a></li>
			<li><i></i></li>
			<li class="{$step == '2' ? 'active-v' : ''}"><span>2</span><a href="javascript:;">确认订单</a></li>
			<li><i></i></li>
			<li class="{$step == '3' ? 'active-v' : ''}"><span>3</span><a href="javascript:;">选择支付方式</a></li>
			<li><i></i></li>
			<li class="{$step == '4' ? 'active-v' : ''}"><span>4</span><a href="javascript:;">支付成功</a></li>
		</ul>
	</div>
	<div class="car-information clearfix">
		<img src="{__UPLOAD_URL__}{$car['cc_cover']|thumb,300x200}" width="253" height="168">
		<div class="controduction car-color" style="width:480px;">
			<h4>{$car['cc_bsy2_name']}</h4>
			<ul class="clearfix  " style="width:100%;display:block;">
                <li style="width:55px;">外观颜色 : </li>
                <li class="color_li color_li0">
                    <a href="javascript:;" class="cc_color cc_color0_{$car['cc_color0']}"  style="background: #{$color0[$car['cc_color0']]['color_code']};border-radius: 50%;" title="{$color0[$car['cc_color0']]}">{$color0[$car['cc_color0']]['color_name']}</a>
                </li>
                <li style="width:85px;margin-right: 0px;text-align:left;">{$color0[$car['cc_color0']]['color_name']}</li>
                <li  style="width:55px;">内饰颜色 : </li>
                <li class="color_li color_li1">
                    <a href="javascript:;" class="cc_color cc_color1_{$car['cc_color1']}" style="background: #{$color1[$car['cc_color1']]['color_code']};border-radius: 50%;"  title="{$color1[$car['cc_color1']]}">{$color0[$car['cc_color1']]['color_name']}</a>
                </li>
                <li style="width:85px;text-align:left;">{$color1[$car['cc_color1']]['color_name']}</li>
			</ul>
			<p>车价 : <b>{$order['co_car_amount'] / 10000} 万元</b> <!--运费 : <b id="label_freight1">{$order['co_freight']} 元</b>--></p>
			<!--<p>总价 : <span>{$order['co_amount'] / 10000 + $order['co_freight'] / 10000} 万元</span></p>-->
			<p>定金 : <span>{$order['co_deposit']|amount} 元</span></p>
		</div>
	</div>
    <form action="{url:('@sale-codist-sn-%s', $order['co_sn'])}" method="post" id="order_form">
        <input type="hidden" name="order[co_dmode]"   id="co_dmode"   value="{if $order}{$order['co_dmode']}{else}{$car['cc_type'] == '1' ? 2 : 1}{/if}"/>
        <input type="hidden" name="order[co_a4s_id]"  id="co_a4s_id"  value="{:intval($order['co_a4s_id'])}" data-url="{url:'@sale-calcfreight-ccid-%d-dist', $order['co_cc_id']}"/>
        <input type="hidden" name="order[co_region0]" id="co_region0" value="{:intval($order['co_region0'])}"/>
        <input type="hidden" name="order[co_region1]" id="co_region1" value="{:intval($order['co_region1'])}"/>
        <input type="hidden" name="order[co_region2]" id="co_region2" value="{:intval($order['co_region2'])}"/>
        <input type="hidden" name="order[co_freight]" id="co_freight" value="{:intval($order['co_freight'])}" />
        <input type="hidden" name="order[co_release_region]"  id="co_release_region"  value="{:intval($order['co_release_region'])}" />
        <input type="hidden" name="order[co_distance]" id="co_distance"  value="{:intval($order['co_distance'])}" />
        <input type="hidden" name="order[co_customer_image0]" id="co_customer_image0" value="{$order['co_customer_image0']}"/>
        <input type="hidden" name="order[co_customer_image1]" id="co_customer_image1" value="{$order['co_customer_image1']}"/>
        <div class="buycar-infor">
            <h5>购车人信息 <span>请留下真实个人信息，确保提车成功</span></h5>
            <p><input type="text" placeholder="请输入真实姓名"    class="placeholder2" name="order[co_customer_name]"   id="co_customer_name"   value="{$order['co_customer_name']}"></p>
            <p><input type="text" placeholder="请输入身份证号码"    class="placeholder2" name="order[co_customer_id]"     id="co_customer_id"     value="{$order['co_customer_id']}"></p>
            <p><input type="text" placeholder="请输入手机号码"      class="placeholder2" name="order[co_customer_mobile]" id="co_customer_mobile" value="{$order['co_customer_mobile']}"></p>
            <h4>请上传身份证照片</h4>
            <div class="download-file clearfix">
                <div style="height:120px;width:180px;position: relative;display:block;float: left;margin:0 10px 0 0;" id="user_idimg0">
                    <img class="{if !$order['co_customer_image0']}hide{/if}" style="height:120px;width:180px;" src="{if $order['co_customer_image0']}{__UPLOAD_URL__}{$order['co_customer_image0']}{/if}" />
                    <a href="javascript:;" class="reupload_btn {if !$order['co_customer_image0']}hide{/if}">重新上传</a>
                    <iframe src="{url:'@sale-upload-conf-%s-callback-%s', 'idimg', 'uidimg0'}" style="{if $order['co_customer_image0']}display:none;{/if}height:120px;width:180px;border:none;overflow:hidden;" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" id="iframe_upload_uidimg0"></iframe>
                    
                </div>
                <div style="height:120px;width:180px;position: relative;display:block;float: left;margin:0;" id="user_idimg1">
                    <img class="{if !$order['co_customer_image1']}hide{/if}" style="height:120px;width:180px;" src="{if $order['co_customer_image1']}{__UPLOAD_URL__}{$order['co_customer_image1']}{/if}" />
                    <a href="javascript:;" class="reupload_btn {if !$order['co_customer_image1']}hide{/if}">重新上传</a>
                    <iframe src="{url:'@sale-upload-conf-%s-callback-%s', 'idimg', 'uidimg1'}" style="{if $order['co_customer_image1']}display:none;{/if}height:120px;width:180px;border:none;overflow:hidden;" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" id="iframe_upload_uidimg1"></iframe>
                </div>
            </div>
            <p>请上传正反两面，<em>提车时请携带原件</em>，每张图片大小不超过  5 M，支持JPG、PNG格式</p>
        </div>
<!--         <div class="transport-infor">
        	<h5>发车地</h5>
        	{foreach $cda $k $v}
        	<p style='margin-left:15px;font-size:15px;'>{$v['cda_region0_name']} {$v['cda_region1_name']}</p>
        	{/foreach}
        </div> -->
        
        <div class="transport-infor">
            <h5>提车点</h5>
            <div class="infor-style">
                <p>提车方式：</p>
                <ul class="clearfix" id="desposit_select">
                    <li><a href="javascript:;">自提</a></li>
                    <li class="select"><a href="javascript:;">提车点</a></li>
                </ul>
            </div>
        </div>
        <div class="desposit city-add hide" style='width:725px;height:105px;'>
        	
            <!--<br />
            <ul class="clearfix">
                <li style="width:420px;" class="dialog" data-id="region_dialog" data-width="805px" data-height="300px" data-url="{url:'@sale-c4s-ccid-%d-callback-%s-title-%s', $car['cc_id'], 'a4scallback', '选择您的所在地区'}">
                    <span id="a4s_region">&nbsp;
                    {if $a4s}
                        {$regions[$a4s['at_region0']]['name']}
                        {$regions[$a4s['at_region1']]['name']}
                        {$regions[$a4s['at_region2']]['name']}
                        {$a4s['at_name']}
                    {else}
                        请选择提车点
                    {/if}
                    </span>
                </li>
            </ul>
            <div id="a4s_list">
                {if $addr['a4s']}
                <p data-val="{$addr['a4s']['at_id']}" class="active-bg">
                    <b>{$addr['a4s']['at_name']}</b>
                    <span> {$addr['a4s']['at_addr']}</span>
                </p>
                {/if}
            </div>-->
        </div>
        
        <div class="desposit address-menu">
            <p>运费 : <span id="label_freight">{:intval($order['co_freight'])}元</span></p>
            <div class="city-add">
                <ul style="display: inline-block;" >
                    <li style="width:340px;display: block;" class="dialog" data-id="region_dialog" data-width="805px" data-height="300px" data-url="{url:'@misc-rv3select-callback-%s-title-%s', 'cuscallback', '选择您的所在地区'}">
                        <span id="cus_region">
                        {if $order['co_dmode'] == '2'}
                            {$regions[$order['co_region0']]['name']}
                            {$regions[$order['co_region1']]['name']}
                            {$regions[$order['co_region2']]['name']}
                        {else}
                            	请选择您希望提车的城市
                        {/if}
                        </span>
                    </li>
                </ul>
                <input type="hidden" style="vertical-align: top;" placeholder="请输入您的详细地址" name="order[co_addr]" id="co_addr" class="placeholder" value="">
            </div>
        </div>
        <div class="address-menu"><a href="javascript:;" class="submit-btn" id="co_submit">提交信息</a></div>
    </form>
</div>

@include('layouts/newfooter')
{if $order && false}
<script>

    $(function(){
        $('#desposit_select li').eq({$order['co_dmode'] - 1}).trigger('click');
    });
</script>
{/if}
</body>
</html>
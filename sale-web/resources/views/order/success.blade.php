@include('layouts/meta')
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
			<li><span>3</span><a href="javascript:;">选择支付方式</a></li>
			<li><i></i></li>
			<li class="active-v"><span>4</span><a href="javascript:;">支付成功</a></li>
		</ul>
	</div>
	<div class="success">
        {if $log && $log['pay_ndate'] > 0}
		<img src="/images/success_03.png">
		<div class="succe-r">
			<h2>订单已经支付成功 <a href="{url:'@ucenter-order'}"> 查看全部订单</a></h2>
			<p>快抢车客服人员会立刻与您取得联系，请耐心等待</p>
		</div>
        {else}
        
        {/if}
	</div>
</div>
@include('layouts/newfooter')
</body>
</html>
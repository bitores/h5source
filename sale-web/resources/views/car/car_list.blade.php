@include('layouts/meta')
<link type="text/css" rel="stylesheet" href="css/colors.css?{_CACHE_VER_}" />
<link type="text/css" rel="stylesheet" href="/css/category.css"  />
<link type="text/css" rel="stylesheet" href="/css/index/index_new.css"  />
<link type="text/css" rel="stylesheet" href="/css/information.css"  />
<script type="text/javascript" src="/js/category.js" ></script>
<script type="text/javascript" src="/js/brand.js" ></script>
<script type="text/javascript" src="/js/modal.js"></script>

</head>
<!--<script type="text/javascript" src="/js/pages.js"></script>-->
<script type="text/javascript">
	var category = "{url:'@category-list~'}";
	var strOS= navigator.userAgent.toLowerCase();
	if(strOS.indexOf('iphone ')>-1 || strOS.indexOf('android')>-1){
		location.href='{url:'wap:carres-cardetail-ccid_%d%scdsid_%d',$car['cc_id'],'/',$cds['cds_id']}';
	}
</script>

<body>

	@include('layouts/header')

	<div class="brand-box">
		<div class="brand-content">
			<!-- 位置 -->
			<div class="brand-index">
				<h4>您的位置：<a href="/">首页 ></a>&nbsp;&nbsp;<a href="{url:'@category-index'}"> 品牌选车 ></a>&nbsp;&nbsp;<span class="last-tt">{$cds[cds_bsy1_name]}</span></h4>
			</div>
			<!-- 优惠活动 -->
			<!-- <div class="sale-act">
				<div class="title">优惠活动</div>
				<div class="act-tt"><a href="##">宝马3系<span>直降7万</span></a></div>
				<div class="act-tt"><a href="##">英菲尼迪<span>最高优惠14.3万</span></a></div>
				<div class="act-tt"><a href="##">大众POLO<span>5.89万起</span></a></div>
			</div> -->
			
		</div>
		<!-- 车辆汇总 -->
			<div class="car-display">
				<div class="car-info">
					<div class="feature-port feature-category1">
						<h1 class="feature-name"><i class="pic1"></i>车型</h1>
						<div class="option">
							 <a {if empty($ccbsy2)} class="feature linked" {/if} href="{url:'@category-carlist-v-%d',$cid}">全部车型</a>
							 {foreach $cars_unique $k $v}
							 	<li>
									<a {if $v['cc_bsy2'] == $ccbsy2}class="linked"{/if} title = "{$v[cc_bsy2_name]}" href="{url:'@category-carlist-v-%d-ccbsy2-%d',$cid,$v['cc_bsy2']}">{$v[cc_bsy2_name]|cut,24}</a>
								</li>	
							 {/foreach}		
						</div>
					</div>
					<!-- <div class="feature-port feature-category2">
						<h1 class="feature-name"><i class="pic2"></i>排量</h1>
						<div class="option">
							<a class="feature linked">全部</a>
							<a class="feature">1.8T</a>
							<a class="feature">1.6T</a>
						</div>
					</div> -->
					<div class="feature-port feature-category3">
						<h1 class="feature-name"><i class="pic3"></i>外观颜色</h1>
						<div class="option">
							<a href="{url:'@category-carlist-v-%d',$cid}" {if empty($colorws)} class="all-list feature linked" {/if}>全部</a>
						
							{foreach $colorw $k $v}
								<a href="{url:'@category-carlist-v-%d-colorw-%d-ccbsy2-%d-colorn-%d',$cid,$v['cc_color0_id'],$ccbsy2,$colorns}"  title="{$v['cc_color_name0']}"  {if $v['cc_color0_id'] == $color1code} class=" feature linked" {else} class="feature"{/if} data-value="{$k}" data-color="" data-color-li=".color_li1" data-target="#preview_color0">
									<i  class="circle"  style="background: #{$v['cc_color0']};border-radius: 50%;" onclick="get({$v['cid']})"></i>
								</a>
							{/foreach}

						</div>
					</div>
					<div class="feature-port feature-category4">
						<h1 class="feature-name"><i class="pic4"></i>内饰颜色</h1>
						<div class="option">
							<a {if empty($colorns)} class=" all-list feature linked" {/if} href="{url:'@category-carlist-v-%s',$cid}" >全部</a>
							{foreach $colorn $k $v}
								<a href="{url:'@category-carlist-v-%s-colorn-%s-ccbsy2-%d-colorw-%d',$cid,$v['cc_color1_id'],$ccbsy2,$colorws}" title="{$v['cc_color_name1']}"  {if $v['cc_color1_id'] == $color2code} class=" feature linked" {else} class="feature"{/if}  data-value="{$k}" data-color="" data-color-li=".color_li0" data-target="#preview_color1" href="javascript:;">
								<i  class="circle"   style="background: #{$v['cc_color1']};border-radius: 50%;"></i></a>
							{/foreach}
							
						</div>
					</div>
				</div><!-- 左侧信息 -->
				<div id="mainContent">
				<div class="feature-car">
				{if $cars}
				{foreach $cars $k $v}
					<div class="car-line"> 
						<div class="left-img"><a href="{url:'@sale-view-id-%d',$v['cc_id']}" target="_blank" rel="nofollow"><img src="{__UPLOAD_URL__}{$v['cc_cover']}" alt="{$v['cc_bsy2_name']}" ></a></div>
						<div class="right-content">
						<!-- 判断汽车是否还有现货 -->
						{if $v['cc_instock']>1 && $v[cc_bsy2_name] != ""}
							<div class="line1">
								{if  $v['cc_sale_type']==1}
								<span class="current-car">现车</span>
								{elseif $v['cc_sale_type']==2}
								<span class="presell-car">预售</span>
								{/if}
								<a href="{url:'@sale-view-id-%d',$v['cc_id']}"  target="_blank" class="car-name">{$v['cc_bsy2_name']}</a>
							</div>
							<div class="line2">
								<span class="feature-title">外观：</span><span><i class="circle" style="background-color:#{$v['cc_color0']}"></i></span><span class="color">{$v['color0_name']}</span>
								<span class="feature-title">内饰：</span><span><i class="circle" style="background-color:#{$v['cc_color1']}"></i></span><span class="color">{$v['color1_name']}</span>
						   	</div>
							<div class="line3">
									<span class="zd-price">指导价：<i>{$v[cc_price1]}</i>万</span><span class="save">节省：{$v[cc_price1]-$v[cc_price]}万元</span><span class="current-price">￥<b>{$v[cc_price]}</b>万元</span>
									{if $v['cc_sale_tag'] == 1}<span class="discount">特价</span>{/if}
							</div>
							{/if}
						</div>
					</div>
					{/foreach}
				{else}
				<div class="car-line"> 暂无数据 </div>
				{/if}	
					<!-- 分页 -->
					{include common/newpagination.tpl.html}
										
				</div><!-- 右侧车辆 -->
			</div>
			</div>
	</div>
	<!-- 右侧浮动返回顶部等 -->

	@include('layouts/float')

	@include('layouts/newfooter')
	
</body>
</html>
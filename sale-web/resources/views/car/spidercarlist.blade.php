<html>
<head>
<title>{if !empty($_sconfig['title'])}{$_sconfig['title']}{else}{:join('_', $_stitle)}{/if}</title>
<meta name="keywords" content="{if !empty($_sconfig['title'])}{$_sconfig['title']}{else}{:join('_', $_stitle)}{/if}" />
<meta name="description" content="{if !empty($_sconfig['title'])}{$_sconfig['title']}{else}{:join('_', $_stitle)}{/if}"/>
<link type="text/css" rel="stylesheet" href="{__STATIC_URL__}css/colors.css?{_CACHE_VER_}" />
<link type="text/css" rel="stylesheet" href="{__CTPL_URL__}css/category.css"  />
<link type="text/css" rel="stylesheet" href="{__CTPL_URL__}css/index_new.css"  />
<link type="text/css" rel="stylesheet" href="{__CTPL_URL__}css/information.css"  />

</head>

<body>

	<div class="brand-box">
		<div class="brand-content">
			<!-- 位置 -->
			<div class="brand-index">
				<h4>您的位置：<a href="/">首页 ></a>&nbsp;&nbsp;<a href="{url:'@category-index'}"> 品牌选车 ></a>&nbsp;&nbsp;<span class="last-tt">{$cds[cds_bsy1_name]}</span></h4>
			</div>
			
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
				</div><!-- 左侧信息 -->
				<div id="mainContent">
				<div class="feature-car">
				{if $cars}
				{foreach $cars $k $v}
					<div class="car-line"> 
						<div class="left-img"><a href="{url:'@sale-view-id-%d',$v['cc_id']}" target="_blank"><img src="{__UPLOAD_URL__}{$v['cc_cover']}" alt="{$v['cc_bsy2_name']}" rel="nofollow"></a></div>
						<div class="right-content">
						<!-- 判断汽车是否还有现货 -->
						{if $v['cc_instock']>1 && $v[cc_bsy2_name] != ""}
							<div class="line1">
								
								<a href="{url:'@sale-view-id-%d',$v['cc_id']}"  target="_blank" class="car-name">{$v['cc_bsy2_name']}</a>
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
	
</body>

</html>
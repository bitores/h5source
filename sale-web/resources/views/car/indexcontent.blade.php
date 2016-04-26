<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<!-- 品牌导航 -->
			<div id="mainContent">
			<div class="brand-category">
				<ul class="brand-car-list">
					{foreach $cars $k $v}
						<li>
						<a href="{url:'@category-carlist-v-%d',$v['cds_id']}" target="_blank">
								<img src="{__UPLOAD_URL__}{$v['cds_cover']}" alt="{$v['cds_name']}" rel="nofollow">
								<div class="name">{$v['cds_name']}</div>
								<div class="brand-price">￥{$v['cds_price0']}万 ~ {$v['cds_price1']}万</div>
							</a>
						</li>
					{/foreach}
				</ul>
			</div>	
			</div>	

<div ng-controller="brSearchController">
	<!--m_brSearch_head-->
	<header class="m_brSearch_head">
		<a class="logo" href="javaScript:void(0);"><img src="/img/icon/logo.png" alt="logo" /></a>
		<div class="m_brSearch_input">
			<input type="text" placeholder="输入汽车品牌 车系" />
		</div>
		<a class="m_brSearch_user" href="javaScript:void(0);"><img src="/img/icon/user_icon.png" alt="用户" /></a>
	</header>
	<!--m_brSearch_menu-->
	<div class="f-cb m_brSearch_menu">
		<a class="brand_btn" href="javaScrip：void(0);">选择品牌<img src="/img/icon/down_icon.png" alt="下拉" /></a>
		<a class="order_btn" href="javaScrip：void(0);">排序<img src="/img/icon/down_icon.png" alt="下拉" /></a>
	</div>
	<!--m_brSearch_list-->
	<div class="m_brSearch_list f-cb" ng-repeat="brSearch_lists in brSearch_list">
		<img class="m_brSearch_car_img" ng-src="@{{brSearch_lists.image_src}}" alt="@{{brSearch_lists.title}}" />
		<div class="m_brSearch_list_cnt">
			<div class="f-cb m_brSearch_list_title">
				<p>@{{brSearch_lists.title}}</p>
				<img src="/img/icon/hot_car_icon2.png" alt="" />
			</div>
			<div class="m_brSearch_list_box">
				<strong>@{{brSearch_lists.sale_pirce | currency:'￥'}}</strong><span>万</span>
				<b>@{{brSearch_lists.market_price | currency:'￥'}}万</b>
			</div>
			<div class="m_brSearch_list_box">
				<i class="f-prr1">直降@{{brSearch_lists.drop_price}}万</i>
				<i>成交@{{brSearch_lists.sold_num}}</i>
			<div>
		</div>
	</div>
		
</div>
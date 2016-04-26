<!--banner-->
<div>
    <slide ng-repeat="banners in banner">
        <img src='@{{banners.image}}' alt='@{{banners.caption}}' />
    </slide>
</div>

<!--menu-->
<ul class="f-cb m_menu">
	<li ng-repeat="menus in menu" class="f-fl">
		<a href="javaScript:void(0);">
			<img ng-src='@{{menus.image}}' alt='@{{menus.caption}}' />
			<span>@{{menus.caption}}</span>
		</a>
	</li>
</ul>

<!--car_menu-->
<ul class="f-cb m_car_menu">
	<li ng-repeat="car_menus in car_menu" class="f-fl">
		<a href="javaScript:void(0);">
			<img ng-src='@{{car_menus.image}}' alt='@{{car_menus.caption}}' />
			<span>@{{car_menus.caption}}</span>
		</a>
	</li>
	<li class="f-fl loadMore">
		<a class="f-pt15" href="javaScript:void(0);">
			<strong>更<i>多</i></strong>
			<strong>品<i>牌</i></strong>
		</a>
	</li>
</ul>

<!--hot_car-->
<div class="f-cb m_hot_car u_head">
	<header class="head">热门车型<a href="javaScript:void(0);">更多</a></header>
	<div ng-repeat="hot_cars in hot_car" class="f-fl m_hot_car_box"> 
		<img ng-src="@{{hot_cars.image_src}}" alt="@{{hot_cars.title}}" />
		<div class="m_hot_car_title">@{{hot_cars.title}}<span></span></div>
		<p>
			<strong>@{{hot_cars.sale_pirce | currency:'￥'}}</strong><span>万</span>
			<b>@{{hot_cars.market_price | currency:'￥'}}万</b>
			<i>直降@{{hot_cars.drop_price}}万</i>
		</p>
	</div>
</div>

<!--hot_activity-->
<div class="m_hot_activity u_head">
	<header class="head">热门活动<a href="javaScript:void(0);">更多</a></header>
	<div ng-repeat="hot_activitys in hot_activity" class="m_hot_activity_box">
		<img ng-src="@{{hot_activitys.image_src}}" alt="@{{hot_activitys.title}}" />
		<p>
			<strong>@{{hot_activitys.title}}</strong>
			<em>直降<span>@{{hot_activitys.drop_price}}</span>万</em>
		</p>
	</div>
</div>
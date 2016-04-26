@include('layouts/meta')
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="css/help.css"/>

<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=SHC33aEdxeqxdaheuX4iGsM1"></script>

<body>
<!-- 导航部分 -->

@include('layouts/header')
<!-- 帮助中心主内容 -->
<div class="help-main">
	<div class="help-content clear">

		<div class="help-left">
			<ul class="big-sort">
			
			{foreach $list $k $v}
				<li class="sort">
					<dl>
						<dt>{$v['catname']}</dt>
						{foreach $v['help']  $key $val}
						<a href="{url:'@help-index-id-%d',$val['id']}" style="display:block"><dd {if  $val['id'] == $id} class="help-this"  {/if} >{$val['title']}</dd></a>
						{/foreach}
					</dl>
				</li>
			{/foreach}
			</ul>
		</div>
		
		<div class="help-right">
		
			<div class="helpconmin">
				<div class="port-name">{$helpinfo['title']}</div>
				<div class="port-content">
				{if $helpinfo['title']=='联系我们'}
				<div style="height:308px;border:#ccc solid 1px;font-size:12px" id="map"></div>
				{/if}
					{$helpinfo['detail']|html}
				</div>
			</div>

		</div>
	</div>
</div>







<!-- 页脚 -->
@include('layouts/newfooter')
<script type="text/javascript">
    //创建和初始化地图函数：
    function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }
    function addMapOverlay(){
      var markers = [
        {content:"联合大厦B座11楼",title:"快抢车杭州总部",imageOffset: {width:-46,height:-21},position:{lat:30.27282,lng:120.104}}
      ];
      for(var index = 0; index < markers.length; index++ ){
        var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
        var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
          imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
        })});
        var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
        var opts = {
          width: 200,
          title: markers[index].title,
          enableMessage: false
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
        marker.setLabel(label);
        addClickHandler(marker,infoWindow);
        map.addOverlay(marker);
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      };
    }
    //向地图添加控件
    function addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
      map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      map.addControl(navControl);
      var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
      map.addControl(overviewControl);
    }
    function createMap(){ 
      map = new BMap.Map("map"); 
      map.centerAndZoom(new BMap.Point(120.103932,30.272953),19);
      // var point = new  BMap.Point(120.103932,30.272953);
      // map.centerAndZoom(point, 15);
      // var marker = new BMap.Marker(point);  // 创建标注
      // map.addOverlay(marker);               // 将标注添加到地图中
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    }
    var map;
    initMap();
  </script>
</body>
</html>
@include('layouts/meta')
<link type="text/css" rel="stylesheet" href="/css/colors.css?{_CACHE_VER_}" />
<link type="text/css" rel="stylesheet" href="/css/category.css"  />
<link type="text/css" rel="stylesheet" href="/css/index/index_new.css"  />
<!-- <script type="text/javascript" src="/js/category.js" ></script>  -->
</head>
<!--<script type="text/javascript" src="/js/pages.js"></script>-->

<script>
function get(id){   
        $.ajax({
        data:{'id':id},
        type:"post",
        url:"{surl:@category-indexcontent}",
        success:function(msg){
            if(msg) {
                $("#mainContent").html(msg);
               $('#postid').val(id); 
               $("#aid_"+id).parent().attr('id','checks');
               $("#aid_"+id).parent().siblings().attr('id','')
            }
        }
         
        });
}
var feedbackurl='{url:'@index-feedback'}';
var verURL='{url:'@misc-sms~'}';
var sendsms = '{url: '@index-sendsms'}';

/* var category = "{url:'@category-indexcontent-id-dd~'}";
category = category.replace('dd',$('#postid').val()); */

</script>

<SCRIPT type="text/JavaScript">
    $(function(){
    	/* $(".brand_li").each(function(i){
    		if(i>9){
    			$(this).hide();
    		}
    	}) */
    	$("#checks2").click(function(){
	    	$(this).siblings('li').each(function(i){
	    		if(i>0){
	    			$(this).siblings('li').eq(i).show();
	    		}
	    	});
	    	$(this).hide();
    	})
    })
    
</SCRIPT>
<body>
	<!--{include common/header.tpl.html}-->


	<div class="brand-box">
		<div class="brand-content">
			<!-- 位置 -->
			<div class="brand-index">
				<h4>您的位置：<a href="/">首页 ></a>&nbsp;&nbsp;<a href=""> 品牌选车 </a>&nbsp;</h4>
			</div>
			<!-- 优惠活动 -->
			 <div class="sale-act">
				 <!--<div class="title">优惠活动</div>
				<div class="act-tt"><a href="{url:'@category-index-id-%d',$v['bsy_id']}"><img src="/images/brand/brand_{$v['bsy_id']}.png" alt="">宝马3系<span>直降7万</span></a></div>
				<div class="act-tt"><a href="##">英菲尼迪<span>最高优惠14.3万</span></a></div>
				<div class="act-tt"><a href="##">大众POLO<span>5.89万起</span></a></div> -->
			</div> 
			
			<!-- 品牌导航 -->
			<div class="brand-category">
			<input type="hidden" value="" name="postid" id="postid" />
				<ul class="brand-name">
				    <li id="all-brand"><a href="{url:'@category-index'}" class="t_c">全部品牌</a></li>
					{foreach $brand $k $v}
					{if $k>9}
						<li style="display:none;" {if $id==$v['cds_bsy0']} id="checks"{/if} class="brand_li" >
							<div>
								<a tid = "aid_{$v['cds_bsy0']}" href="{url:'@category-index-id-%d',$v['cds_bsy0']}" rel="nofollow">
									<img src="{__STATIC_URL__}/images/icon/b_{$v['cds_bsy0']}.jpg" alt="{$v['cds_bsy0_name']}">
								</a>
								 <!-- onclick="get({$v['cds_bsy0']})" -->
								<a tid = "aid_{$v['cds_bsy0']}" href="{url:'@category-index-id-%d',$v['cds_bsy0']}">
									<span>{$v['cds_bsy0_name']}</span>
								</a>
							</div>
						</li>
					{else}
					<li  {if $id==$v['cds_bsy0']} id="checks"{/if} class="brand_li" >
						<div>
							<a tid = "aid_{$v['cds_bsy0']}" href="{url:'@category-index-id-%d',$v['cds_bsy0']}" rel="nofollow">
								<img src="{__STATIC_URL__}/images/icon/b_{$v['cds_bsy0']}.jpg" alt="{$v['cds_bsy0_name']}">
							</a>
							<a tid = "aid_{$v['cds_bsy0']}" href="{url:'@category-index-id-%d',$v['cds_bsy0']}">
								<span>{$v['cds_bsy0_name']}</span>
							</a>
						</div>
					</li>
					{/if}
					{/foreach}
					<li class="no-mr" id="checks2"><a  class="more-category">更多品牌</a></li>
				</ul>
				<li class="list"></li>
			</div>
			<div id="mainContent">
			<div class="brand-category">
				<ul class="brand-car-list">
					{foreach $cars $k $v}
						<li>
						<a href="{url:'@category-carlist-v-%d',$v['cds_id']}" target="_blank" rel="nofollow">
								<img src="{__UPLOAD_URL__}{$v['cds_cover']}" alt="{$v['cds_name']}" >
								<div class="name">{$v['cds_name']}</div>
								<div class="brand-price">￥{$v['cds_price0']}万 ~ {$v['cds_price1']}万</div>
							</a>
						</li>
					{/foreach}
				</ul>
			</div>
			</div>	 
			<!--数据加载提示，默认隐藏-->
			<!-- <div class="add-more">数据正在加载...</div> -->
		</div>
	</div>

	<!-- 右侧浮动返回顶部等 -->
	@include('layouts/float')

	@include('layouts/newfooter')
	<script type="text/javascript">
	 $(".brand-name li").each(function(index,e)
               {
               	  if(index%6==5)
               	  {
               	  	$(this).addClass("no-mr");
               	  }
     })


	var saleurl="{url:'@category-carlist-v-dd'}";
	var imgurl="{__UPLOAD_URL__}";

	 $(".brand-name .more-category").click(function  () {
	 	$.ajax()
	 })

	</script>
	<script type='text/javascript' src='/js/modal.js'></script>
</body></html>
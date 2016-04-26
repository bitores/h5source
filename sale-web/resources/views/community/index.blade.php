<!--{// S_meta子模板 }-->
@include('layouts/meta')
<!--{// E_meta子模板 }-->

<script src="/js/lib/jquery.lazyload.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/information.css"/>
<style>

</style>
</head>

<body>
@include('layouts/header')
<div class="car-news">
    <div class="center-width">
        <div class="news-banner">
        	<ul class="nbann">
        	{foreach $slider  $k $v}
        		{if $k==0}
        		<li class="bannershow">
        		{else}
        		<li style="display: none;" >
        		{/if}
                    <img src="{__UPLOAD_URL__}{$v['cover']}" class="bnn-img" />
	                {if $k==0}
	        		<div class="nbanshow nav-words">
	        		{else}
	        		<div class="nav-words">
	        		{/if}
                        <h4>{$v['title']}</h4>
                        <p>{$v['summary']}</p>
                        <a href='{url:'@news-view-id-%d',$v['id']}' target="_blank"  class="nbanmore">查看更多详情</a>
                    </div>
                </li>
            {/foreach}
<!--         		<li style="display: none;" >
                    <img src="/images/icon/banner-new1.jpg" class="bnn-img" />
                    <div class="nav-words">
                        <h4>超值大空间超值大空间超值大空间</h4>
                        <p>超值大空间豪车行情国人对车内空间的需求可以说已经上升到了面子的问题</p>
                        <a href="##"  class="nbanmore">查看更多详情</a>
                    </div>
                </li>
                
        		<li style="display: none;">
                    <img src="images/icon/banner-new2.jpg" class="bnn-img" />
                    <div class="nav-words">
                        <h4>超值大空间超值大空间超值大空间</h4>
                        <p>超值大空间豪车行情国人对车内空间的需求可以说已经上升到了面子的问题</p>
                        <a href="##"  class="nbanmore">查看更多详情</a>
                    </div>
                </li> -->       		
        	</ul>
            <ul class="fanye">
                    <li class="connow"></li>
                    <li></li>
                    <li></li>
            </ul>
            <div class="navigation">
            	<div class="nbanup nbanico">
            		<a href="javascript:;"><img src="/images/icon/nbanup.png"/></a>
            	</div>     		
            	<div class="nbannext nbanico">
            		<a href="javascript:;"><img src="/images/icon/nbannext.png"/></a>
            	</div>
            </div>
        </div>

    	<div class="con-left">
            <div class="consult-list">
                <h1 class="first-title">提车</h1>
                 {foreach $getcar $k $v}
	                <div class="consult-line">
	                    <div class="left-img"><a href='{url:'@news-view-id-%d',$v['id']}'  target="_blank"><img src="{__UPLOAD_URL__}{$v['cover']}" alt="{$v['title']}" ></a></div>
	                    <div class="right-content">
	                        <a href='{url:'@news-view-id-%d',$v['id']}'  target="_blank"><div class="news-tt">{$v['title']}</div></a>
	                        <div class="news-info">发布时间：{:date('Y/m/d',$v['adate'])}&nbsp;&nbsp;&nbsp;点击次数：{$v['views']}</div>
	                        <div class="news-brief">{$v['summary']}</div>
	                    </div>
	                </div>
				{/foreach}
            </div>
	{include common/newpagination.tpl.html}

    	</div>

        <div class="con-right">
            <div class="sort-list">
                <h1 class="first-title">行业 <a href='{url:'@news-lists-catid-10'}' class="more" target ="_blank" >更多>></a></h1>
                <ul class="sort-news">
                	{foreach $industry $k $v}
	                	{if $k ==0}
	                    <li class="top-news">
	                        <a href='{url:'@news-view-id-%d',$v['id']}' class="left-img"  target ="_blank" ><img src="{__UPLOAD_URL__}{$v['cover']}" alt=""></a>
	                        <div class="right-content">
	                            <a href='{url:'@news-view-id-%d',$v['id']}'  target ="_blank" ><div class="news-tt">{$v['title']}</div></a>
	                            <a href="javascript:;"><div class="news-brief">{$v['summary']}</div></a>
	                        </div>
	                    </li>
	                    {else}
	                    <li class="news-line"><a href='{url:'@news-view-id-%d',$v['id']}' target ="_blank" >{$v['title']}</a></li>
	                    {/if}
                    {/foreach}

                </ul>
            </div>
            
            <div class="sort-list">
                <h1 class="first-title">活动 <a href='{url:'@news-lists-catid-11'}' class="more" target ="_blank" >更多>></a></h1>
                <ul class="sort-news">
                {foreach $activity $k $v}
	                	{if $k ==0}
	                    <li class="top-news">
	                        <a href='{url:'@news-view-id-%d',$v['id']}' class="left-img" target ="_blank" ><img src="{__UPLOAD_URL__}{$v['cover']}" alt=""></a>
	                        <div class="right-content">
	                            <a href='{url:'@news-view-id-%d',$v['id']}' target ="_blank" ><div class="news-tt">{$v['title']}</div></a>
	                            <a href="javascript:;"><div class="news-brief">{$v['summary']}</div></a>
	                        </div>
	                    </li>
	                    {else}
	                    <li class="news-line"><a href='{url:'@news-view-id-%d',$v['id']}' target ="_blank" >{$v['title']}</a></li>
	                    {/if}
                    {/foreach}
                    
                    
                </ul>
            </div>
            
            <div class="sort-list">
                <h1 class="first-title">实用 <a href='{url:'@news-lists-catid-12'}' class="more" target ="_blank" >更多>></a></h1>
                <ul class="sort-news">
                	{foreach $useful $k $v}	                	
	                    <li class="news-line"><a href='{url:'@news-view-id-%d',$v['id']}' target ="_blank" >{$v['title']}</a></li>
                    {/foreach}
                </ul>
            </div>
            
            <div class="sort-list">
                <h1 class="first-title">生活 <a href='{url:'@news-lists-catid-13'}' class="more" target ="_blank" >更多>></a></h1>
                <ul class="sort-news">
                    {foreach $live $k $v}	                	
	                    <li class="news-line"><a href='{url:'@news-view-id-%d',$v['id']}' target ="_blank" >{$v['title']}</a></li>
                    {/foreach}
                    
                </ul>
            </div>
        </div>

    	<div class="clear"></div>
    </div>
    <!-- {include news/hots.tpl.html} -->
</div>

@include('layouts/newfooter')

<script type="text/javascript" src="/js/news.js"></script>
<script>
    $(function(){
        if (!{$list}){
            $(".con-left-title ul li:first").addClass("headline-active");
        }
        
    });
</script>
</body>
</html>
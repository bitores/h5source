<!--{// S_meta子模板 }-->
@include('layouts/meta')
<!--{// E_meta子模板 }-->
<link rel="stylesheet" type="text/css" href="/css/information.css"/>
<style>

</style>
</head>

<body>
@include('layouts/header')
<div class="car-news">
    <div class="center-width">
        <div class="news-list">
            <h1 class="list-tt"><i></i>{$catname}</h1>
            <ul class="article-list">
            {if $lists}
	            {foreach $lists $k $v}
	                       <li>
	                            <a href='{url:'@news-view-id-%d',$v['id']}' >{$v['title']}</a>
	                            <span class="pub-time">{:date('Y-m-d',$v['adate'])}</span>
	                        </li>
				{/foreach}
			{else}
				<li style="border-bottom:0px">
	               <a href="javascript:;">暂无内容</a>
	            </li>
			{/if}
              </ul>
        </div>
        	{include common/newpagination.tpl.html}

    	<div class="clear"></div>
    </div>
</div>

@include('layouts/newfooter')
</body>
</html>
<!--{// S_meta子模板 }-->
@include('layouts/meta')
<!--{// E_meta子模板 }-->
<link rel="stylesheet" type="text/css" href="/css/information.css"/>

<style type="text/css">
	#a1{text-align: center; width: 600px;height: 400px;margin: 0 auto;}
</style>
<link href="{url:'news-view-id-%d',$article['id']}"rel="canonical" />
</head>
<body>
@include('layouts/header')
	<div class="infomain">
		<h4><a href="/">首页 </a>&nbsp;> &nbsp;<a href="{url:'news'}"  style="color:#999" >新车资讯  </a>&nbsp;> &nbsp;<a href="{url:'news-view-id-%d',$article['id']}" class="infonow">{$article['title']}</a></h4>
		<div class="infomain_con">
			<div class="infomc_mid">
				<h1>{$article['title']}</h1>
				<h5>{$article['adate']|date,Y年m月d日 H:i}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{$article['views']}次浏览&nbsp;&nbsp;&nbsp; 作者:&nbsp; {$article['nick']}</h5>
				<div class="infomc_article">
					<!--<img src="{__UPLOAD_URL__}{$article['cover']}" alt="{$article['title']}">-->
					<p>{$article['detail']|html}</p>
<!--					<img src="{__UPLOAD_URL__}{$article['cover']}" alt="{$article['title']}">-->
				</div>					
			</div>			
			<div class="infomc_page">	
				{if $page['prev']}
					<a href="{url:'news-view-id-%d',$page['prev']}" class="infomcpup">{$page['prev_title']}</a>
					{else}<a href="javascript:void(0)" class="infomcpup" style="color: #999;">没有了</a>
				{/if}
				{if $page['next']}
					<a href="{url:'news-view-id-%d',$page['next']}" class="infomcpdown">{$page['next_title']}</a>
					{else}<a href="javascript:void(0)" class="infomcpdown" style="color: #999;">没有了</a>
				{/if}
			</div>
		</div>	
	</div>
	  
	<script type="text/javascript" src="/ckplayer/ckplayer.js" charset="utf-8"></script>
	<script type='text/javascript'>
		function show_video(){
			var txt=$('.infomc_mid').html();			
			var videoIndex=txt.indexOf('[video]');
			var videoOver=txt.indexOf('[/video]');
			if(videoIndex<0){
				return;
			}
			var txtv=txt.substring(videoIndex,videoOver+8);
				var videourl=txt.substring(videoIndex+7,videoOver);
				txt=txt.replace(txtv,'<div id="a1"></div>');
				$('.infomc_mid').html(txt);
				var flashvars={
				    f: videourl,
				    c:0,
				    p:1,
				    loaded:'loadedHandler'
				};
				var allurl=videourl+'->video/mp4';
				var video=[allurl];
				CKobject.embed('/ckplayer/ckplayer.swf','a1','ckplayer_a1','600','400',false,flashvars,video);
				show_video();
		}		
		show_video();
	</script>

@include('layouts/newfooter')
</body>
</html>
function ShowHide(cur,old){
	$('.nbann li').eq(cur).stop(false,true).show();
	$('.nbann li').eq(old).stop(false,true).hide();
	$('.fanye li').eq(cur).addClass("connow");
	$('.fanye li').eq(old).removeClass("connow");
	$('.nbann li').eq(cur).addClass("bannershow");
	$('.nbann li').eq(old).removeClass("bannershow");	
}
$('.nbanup').click(function(){
	var last=$('.nbann li').length-1;
	var old=$('.nbann li[class^="bannershow"]').index('.nbann li');
	var cur=old==last?last-1:old-1;
	ShowHide(cur,old);
});

$('.nbannext').click(function(){
	var last=$('.nbann li').length-1;
	var old=$('.nbann li[class^="bannershow"]').index('.nbann li');
	var cur=old==last?0:old+1;
	ShowHide(cur,old);
}); 

$('.fanye li').each(function(){
	$(this).click(function(){
		var cur=$(this).index('.fanye li');
		var old=$('.fanye li[class^="connow"]').index('.fanye li');
		ShowHide(cur,old);
	})
})

var autoplay=setInterval(function(){
    $('.nbannext').click();
},3000);
$('.news-banner').mouseenter(function(){
    clearInterval(autoplay);
});
$('.news-banner').mouseleave(function(){
    autoplay=setInterval(function(){
        $('.nbannext').click();
    },3000);
});






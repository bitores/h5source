;$(function () {

    /**$('#left-mbtn').on('click', function () {
        if ($(this).hasClass('icon-minus')) {
            $(this).removeClass('icon-minus');
            $('.left-sub-menu').addClass('left-sub-menu-hide');
        }
        else {
            $(this).addClass('icon-minus');
            $('.left-sub-menu').removeClass('left-sub-menu-hide');
        }
    });**/

    $(".item-list>li>a").each(function() {
        $this = $(this);
        if ($this[0].href == String(window.location)) {            
            $(this).addClass("nav-bg"); 
            $('.item-list li.li_d a').find('.add-icon').addClass('sign');  
            $('.item-list li.li_d').find('.child-list').css('display','block');     
        }else{
            $('.item-list li.li_d a').find('.add-icon').removeClass('sign');
            $('.item-list li.li_d').find('.child-list').css('display','none');
        }
    });
    
    
    
    $('#passwd-dialog-btn').on('click', function () {
        REX.dialog(this);
    });

    /*$(".li_d").click(function(){
            $(this).toggleClass("currentDd");
            $(this).next(".child-list").slideToggle(500);
    })*/

//  $(window).scroll(function(){
//
//      var lefts = "#lefts";
//      //var logs  = $(lefts).parent().offset().top;
//
//      if($(window).scrollTop() > ($(lefts).parent().offset().top) &&
//              ($(lefts).parent().height() + $(lefts).parent().position().top - 30) > ($(window).scrollTop() + $(lefts).height())){
//          $(lefts).css({"top":0,'position':'fixed','left': $(lefts).offset().left});
//      }
//      else if($(window).scrollTop() < ($(lefts).parent().offset().top)){
//          $(lefts).css({"position":'relative','left':0});
//      }
//  });
});
$(function(){
        var downrange    = 100;                  //下边界-参考正在加载提示层/px
        var num = 0                             //初始页码
        var main = $(".brand-car-list");     //主体
        var loaddiv = $(".add-more")        //加载提示层
        var totalheight = 0;            
        //判断是否需要异步
        function ifLoad(){
            //滚动条距离顶部距离
            var scrolltotop=parseFloat($(window).scrollTop());
            //窗口高度
            var winheight = parseFloat($(window).height());
            //内容总高度
            var conheight = parseFloat($(document).height())-downrange; 
            //总高度
            totalheight = scrolltotop + winheight;

            //判断是否加载，当操作高度比内容大，空间充裕->加载
            if(totalheight >= conheight){
                ajaxLoad(num);
                num++;
            }

        }



        //ajax-fun
        function ajaxLoad(page){
            $.ajax({
                url: category,
                type:"post",
                data:"page="+page,
                success:function(d){
                  var str="";
                  for (var i = d.text.length - 1; i >= 0; i--) {
                    var li = d.text[i];
                    console.log();
                    str +='<li><a href="#"><img src="{__CTPL_URL__}'+li.cc_cover+'" alt=""><div class="name">'+li.bsy_name+'</div><div class="brand-price">￥'+li.minprice+'万 ~ '+li.maxprice+'万</div></a></li>';
                  };

                  // $(".brand-car-list").append();
                  // d.data
                        //追加数据
                        main.append(str);
                }
            })
        }

        //加载中隐藏显示
        loaddiv.ajaxStart(function(){
             $(this).show();
            }).ajaxStop(function(){
                $(this).hide();
            })



        //scroll-fun
        $(window).scroll(ifLoad);

    })
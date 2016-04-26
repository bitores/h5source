/*
 * common.js
 * $Id$
 */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (str) {
        var len = this.length, from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
            from += len;
        }
        for (; from < len; from ++) {
            if (from in this && this[from] === str) {
                return from;
            }
        }
        return -1;
    };
}
;(function ($, _W) {
    if (_W.REX == undefined) {

        _W.REX = {

            /**
             * AJAX 状态值 (防止多次提交)
             *
             */
            onajax      : false,



            /**
             * 输出内容到控制台
             *
             */
            debug       : function (msg) {
                if ("console" in window) {
                    console.log(msg);
                }
            },

            /**
             * 缩略图
             *
             *  document.write(REX.thumb('2013-12-01/pre_foo.jpg'));
             *  output : 2013-12-01/pre_foo_thumb.jpg
             *
             *  document.write(REX.thumb('2013-12-01/pre_foo.jpg', '100x80'));
             *  output : 2013-12-01/pre_foo.100x80.jpg
             *  
             */
            thumb       : function (url, format) {
                var i = url.lastIndexOf('.');
                return i >= 0 ? (url.substr(0 , i) + (format == undefined ? '_thumb' : ('.' + format)) + url.substr(i)) : url;
            },

            /**
             * 提示消息
             *
             *  icon 取值范围: hits (默认), succ, i, fail
             *
             *  <a href="javascript:;" id="test-btn">Simple Text</a>
             *  $('#test-btn').on('click', function () {
             *      REX.msg('操作失败了', function () { ... }, 'fail');
             *  });
             */
            msg         : function (msg, callback, icon) {
                $.dialog.tips(msg, 1, '32X32/' + (typeof(icon) != 'undefined' ? icon : 'hits') + '.png', function () {
                    if (callback != undefined && typeof(callback) == 'function') {
                        callback();
                    }
                });
            },

            /**
             * 操作确认
             *  <a href="javascript:;" id="test-btn">Simple Text</a>
             *
             *  $('#test-btn').on('click', function () {
             *      REX.confirm('确定跳转?',
             *          function () {
             *              // 确定了
             *          },
             *          function () {
             *              // 取消了
             *          }
             *      );
             *  });
             */
            confirm     : function (msg, yesfunc, nofunc) {
                /**
                    弹窗组件存在兼容性问题
                    return $.dialog.confirm(msg,
                                typeof (yesfunc) == 'function' ? yesfunc : $.noop,
                                typeof (nofunc) == 'function'  ? nofunc  : $.noop);
                **/
                if (confirm(msg)) {
                    if (typeof (yesfunc) == 'function') {
                        yesfunc();
                    }
                }
                else if (typeof (nofunc) == 'function') {
                    nofunc();
                }
            },

            /**
             * 弹层
             *
             *  <a href="javascript:;" id="test-btn" data-url="http://..." data-id="..." data-title="it's a demo">Simple Text</a>
             *
             *  $('#test-btn').on('click', function () {
             *      REX.dialog(this);
             *  });
             */
            dialog      : function (obj,callback) {
                var _obj = $(obj);
                $.dialog({
                    id      : _obj.attr('data-id') ,
                    content : 'url:' + _obj.attr('data-url'),
                    title   : _obj.attr('data-title'),
                    lock    : _obj.attr('data-lock') != undefined,
                    padding : 0 ,
                    drag    : false,
                    cache   : false,
                    min     : false,
                    max     : false,
                    width   : _obj.attr('data-width')  == undefined ? 'auto' : _obj.attr('data-width'),
                    height  : _obj.attr('data-height') == undefined ? 'auto' : _obj.attr('data-height')
                });
                if (callback != undefined && typeof(callback) == 'function') {
                    callback();
                }
            },

            /**
             * focus
             *
             */
            focus        : function (obj, offset) {
                if ($(obj).length > 0) {
                    offset = offset == undefined ? 0 : parseInt(offset);
                    $('html, body, .content').stop(true, true).animate({
                        scrollTop: $(obj).offset().top - offset
                    }, 150, function () {
                        $(obj).focus();
                    });
                }
                else if (window.console) {
                    console.log (obj, 'DOM节点未找到 ...');
                }

            },

            /**
             * ajax post
             *
             *  REX.ajaxpost({
             *      url     : 'http://...',
             *      data    : 'name=foo&id=2...',
             *      succ    : function () {...},
             *      fail    : function () {...}
             *   });
             * 
             */
            ajaxpost    : function (request) {
                if (REX.onajax) {
                    REX.msg('请求处理中!', null, 'hits');
                    return false;
                }
                else {
                    if (request.url == undefined || request.url == '') {
                        REX.msg('ACTION 为空!', null, 'fail');
                        return false;
                    }
                    if (request.data == undefined || request.data == '') {
                        REX.msg('POST 内容为空!', null, 'fail');
                        return false;
                    }
                    REX.onajax = true;
                    $.ajax({
                        type        : "POST",
                        url         : request.url,
                        data        : request.data,
                        processData : false,
                        dataType    : 'json',
                        success     : function (data) {
                            REX.onajax = false;
                            if (request.succ != undefined) {
                                request.succ(data);
                            }
                        },
                        error       : function(data){
                            REX.onajax = false;
                            if (request.fail != undefined && typeof(request.fail) == 'function'){
                                request.fail(data)
                            }
                            else {
                                REX.msg('服务器繁忙, 请稍后再试!', null, 'fail');
                            }
                        }
                    });
                }
            },

            /**
             * 表单方式 ajax post
             *
             *  REX.formpost('#formid',
             *          function (d) { succ ...},
             *          function (d) { fail ....}
             *  );
             * 
             */
            formpost    : function(id, succ, fail) {
                if (REX.onajax) {
                    REX.msg('请求处理中!');
                    return false;
                }
                else {
                    var _form  = typeof(id) == 'string' ? $(id) : id;
                    REX.isajax = true;
                    $.ajax({
                        type        : "POST",
                        url         : _form.attr('action'),
                        data        : _form.serialize() + '&isajax=1',
                        processData : false,
                        dataType    : 'json',
                        success     : function (data) {
                            REX.onajax = false;
                            if (succ != undefined) {
                                succ(data);
                            }
                        },
                        error       : function (data) {
                            REX.onajax = false;
                            if (fail != undefined) {
                                fail(data)
                            }
                            else {
                                REX.msg('服务器繁忙, 请稍后再试!', null, 'fail');
                            }
                        }
                    });
                }
            },

            /**
             * 表单方式 ajax get
             *
             *  REX.formpost(url,
             *          function (d) { succ ...},
             *          function (d) { fail ....}
             *  );
             * 
             */
            get_json    : function (url, succ, fail) {
                if (REX.onajax) {
                    REX.msg('请求处理中, 请稍后再试!');
                    return false;
                }
                else {
                    REX.onajax = true;
                    $.ajax({
                        type        : "GET",
                        url         : url,
                        processData : false,
                        dataType    : 'json',
                        success     : function (data) {
                            REX.onajax = false;
                            if (succ != undefined) {
                                succ(data);
                            }
                        },
                        error       : function(data){
                            REX.onajax = false;
                            if (fail != undefined && typeof(fail) == 'function'){
                                fail(data)
                            }
                            else {
                                REX.msg('服务器繁忙, 请稍后再试!', null, 'fail');
                            }
                        }
                    });
                }
            },

            /**
             * get html
             *
             *  REX.formpost(url,
             *          function (d) { succ ...},
             *          function (d) { fail ....}
             *  );
             * 
             */
            get_html    : function (url, succ, fail) {
                if (REX.onajax) {
                    REX.msg('请求处理中, 请稍后再试!');
                    return false;
                }
                else {
                    REX.onajax = true;
                    $.ajax({
                        type        : "GET",
                        url         : url,
                        success     : function (data) {
                            REX.onajax = false;
                            if (succ != undefined) {
                                succ(data);
                            }
                        },
                        error       : function(data){
                            REX.onajax = false;
                            if (fail != undefined && typeof(fail) == 'function'){
                                fail(data)
                            }
                            else {
                                REX.msg('服务器繁忙, 请稍后再试!', null, 'fail');
                            }
                        }
                    });
                }
            },

            /**
             * 获取 cookie 项目值
             * 
             */
            get_cookie    : function(str, key) {
                var ret = [];
                str = str.split(';');
                for (var k in str) {
                    var tmp = str[k].split('=');
                    if (key == $.trim(tmp[0])) {
                        return $.trim(tmp[1]);
                    }
                }
                return ret;
            },

            /**
             * 获取过期表达式
             * 
             */
            get_expires     : function (sec) {
                var exp = new Date(); 
                exp.setTime(exp.getTime() + sec * 1000);
                return ";expires=" + exp.toGMTString() + ';path=/';
            },


            /**
             * 分享接口配置
             * 
             */
            share_type      : {
                sina    : 'http://service.weibo.com/share/share.php?url=#URL#&title=#TITLE#&pic=#PIC#',
                qweibo  : 'http://share.v.t.qq.com/index.php?c=share&a=index&url=#URL#&title=#TITLE#&summary=#SUMMARY#&pic=#PIC#',
                qzone   : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=#URL#&title=#TITLE#&pics=#PIC#&summary=#SUMMARY#',
                wechat  : 'http://s.jiathis.com/qrcode.php?url='
            },

            /**
             * 分享
             * 
             */
            share           : function (obj) {
                if (typeof(REX.share_type[obj.attr('data-type')]) != 'undefined') {
                    var url = REX.share_type[obj.attr('data-type')];
                    if (obj.attr('data-type') == 'wechat') {
                        url += encodeURIComponent(obj.attr('data-url'));
                        if (obj.attr('data-load') == undefined) {
                            var append = $('<img id="share-wx-qr" src="' + url + '" width="100" height="100" />');
                            append.css({
                                'display'   : 'none',
                                'position'  : 'absolute',
                                'top'       : -110,
                                'left'      : -43,
                                'border'    : '3px solid #eee'
                            });
                            obj.attr('data-load', 1);
                            obj.css('position', 'relative');
                            obj.append(append);
                        }
                        $('#share-wx-qr').show();
                        
                        obj.on('mouseleave', function () {
                            $('#share-wx-qr').hide();
                        });
                        
                        $('#share-wx-qr').on('mouseleave', function () {
                            $(this).hide();
                        });
                    }
                    else {
                        var title = encodeURIComponent(obj.attr('data-title') ? obj.attr('data-title') : document.title),
                            target_url = encodeURIComponent(obj.attr('data-url') ? obj.attr('data-url') : location.href),
                            summary = encodeURIComponent(obj.attr('data-summary') ? obj.attr('data-summary') : '');
                        url = url.replace('#SUMMARY#', summary);
                        url = url.replace('#URL#', target_url).replace('#TITLE#', title);
                        url = url.replace('#PIC#', encodeURIComponent(obj.attr('data-image'))).replace(/#\w+#/, '');
                        window.open(url);
                    }
                }
            },
            browser    : function () {
                var ua = navigator.userAgent.toLowerCase();
                return {
                    'is_ipad'       : ua.match(/ipad/i) == 'ipad',
                    'is_iphone'     : ua.match(/iphone os/i) == 'iphone os',
                    'is_webkit'     : ua.match(/AppleWebKit/i) == 'applewebkit',
                    'is_android'    : ua.match(/android/) == 'android',
                    'is_apple'      : navigator.platform.toLowerCase().match(/(ipad)|(iphone)/) != null
                };
            }
        }

        // end
    };
})(jQuery, window);


/* {{{ ipad,iphone */
window.browser = REX.browser();
/* }}} */

if (browser.is_ipad || browser.is_android) {
    var hd = document.getElementsByTagName('HEAD').item(0); 
    var js= document.createElement("script"); 
    js.type = "text/javascript"; 
    js.src  = STATIC_URL + 'js/monoevent.js'; 
    hd.appendChild(js); 
}
/* {{{ 全站通用  */
$(function () {
    if (browser.is_android || browser.is_apple || browser.is_ipad) {
        $('.top, .navigation, .cooperate, .bd ul, .foot').css('width', $(document).width());
    }

    /** {{{ 导航效果 **/
    if ($(".nav-mdd ul li.cur").length > 0) {
        var _active_li       = $(".nav-mdd ul li.cur"),
            _active_li_left  = _active_li.position().left,
            _active_li_width = _active_li.outerWidth(true),
            _pipe            = $(".curBg"),
            _nav_box         = $(".nav-mdd");
            _target          = $(".nav-mdd ul li a");

        _pipe.animate({
            "left"  : _active_li_left,
            "width" : _active_li_width
        });

        _target.mouseenter(function () {
            var _parent = $(this).parent(),
                _width  = _parent.outerWidth(true),
                _left   = _parent.position().left;

            _pipe.stop(true, true).animate({
                "left"  : _left,
                "width" : _width
            }, "fast");
        });

        _nav_box.mouseleave(function () {
            _pipe.stop(true, true).animate({
                "left"  : _active_li_left,
                "width" : _active_li_width
            }, "fast");
        });
    }
    /** }}} **/

    /* {{{ placeholder */
    if ($.browser.msie && $.browser.version < 10) {

        $('.placeholder').each(function(i, obj){

            var _obj = $(obj);
            if (_obj.val() == '') {
                _obj.val(_obj.attr('placeholder'));
            }

            _obj.on('blur', function () {
                if ($(this).val() == '') {
                    $(this).val($(this).attr('placeholder'));
                }
            });
            
            _obj.on('focus', function () {
                if ($(this).val() == $(this).attr('placeholder')) {
                    $(this).val('');
                }
            });

        });
    }
    /* }}} */


    /* {{{ 右上角用户菜单效果 */
    $('#login-status').on('mouseenter','.welcome_user',function(){
         $(this).find('.select_operation').addClass('active_h');   
         $(this).find('.user_select_box').removeClass('dp_none'); 
    });


    $('#login-status').on('mouseleave','.welcome_user',function(){
         $(this).find('.select_operation').removeClass('active_h');   
         $(this).find('.user_select_box').addClass('dp_none'); 
    });
    /* }}} */

    $("#top-search-form").on("submit", function(){
        var search_text = $("#search_text").val();
        if(/^([0-9a-z]|[^u4e00-u9fa50])+$/i.test(search_text) && search_text.length<15){
            location.href = SEARCH_URL + search_text;
        }
        else {
            setTimeout(function() {
                REX.msg('请输入关键字', function() {
                    $("#search_text").focus();
                });
            }, 20);
        }
        return false;
    });

    $('.simulation').hover(function(){
        $('.tab_menu').removeClass('dp_none');
    },function(){
        $('.tab_menu').addClass('dp_none');
    })


    $('.tab_header a').on('click',function(index){
        $(this).addClass('active').siblings().removeClass('active');
        var _index = $(this).index();
        $('.item_con').eq(_index).removeClass('dp_none').siblings().addClass('dp_none');
    });
    

    $('.weixin').hover(function(){
       $(this).find('.code').toggleClass('dp_none'); 
    });
    
    /* {{{ add follow */
    $('.add-follow-btn').on('click', function () {
        if (!login) {
            REX.msg('请先登录', function() {
                REX.dialog($('#login-dialog-btn'));
            }, 'hits');
        }
        else {
            if (REX.onajax) {
                REX.msg('请求处理中!');
                return false;
            }
            else {
                var _this = $(this);
                REX.onajax = true;
                $.getJSON($(this).attr('data-url'), function (d) {
                    if (d.code == '0') {
                        REX.msg(d.msg, function() {
                            REX.onajax = false;
                            if (d.utype =='0') {
                                // cancle
                                _this.find('b').removeClass('focused');
                            }
                            else {
                                // cancle
                                _this.find('b').addClass('focused');
                            }
                        }, 'succ');
                    }
                    else if (d.code == '3') {
                        REX.msg(d.msg, function() {
                            REX.onajax = false;
                            REX.dialog($('#login-dialog-btn'));
                        }, 'hits');
                    }
                });
            }
        }
    });

    $('.active_box').hover(function(){
        $(this).css('z-index','111');
        $(this).next('.data-icon').css('z-index','1111');
        var introduce = $(this).find('.car_introduce');
        if(introduce.height() > 28 &&　introduce.height() < 60){
            $(this).find('.none_item_title').css('margin-top','0px');
        }
    },function(){
        $(this).css('z-index','10');
        $(this).next('.data-icon').css('z-index','10');
    });


    /** {{{ 回到顶部 **/
    $('.back_top').on('click',function(){
        $('html,body').animate({scrollTop:0}, 400);
    });
    /* }}} */


    /** {{{ 表单提交 **/
    $('#search_submit').on('click',function(){
        var search_text = $("#search_text").val();
        if(/^([0-9a-z]|[^u4e00-u9fa50])+$/i.test(search_text) && search_text.length<15){
            var url = SEARCH_URL + search_text;
            $('#top-search-form').attr({
                'action':url
            }).get(0).submit();
        }
    });
    /* }}} */


    /** {{{ 动态咨询热门文章最后一条线去掉 **/
        $('.hot-actile>.hot-cont').last().css('border-bottom','none');
    /* }}} */


        /** {{{ 首页搜索框 **/
        var search_text = $('#search_text'),
            select_search_content = $('.select_search_content');
        search_text.live('focus',function(){
            show_input($(this));
        }).live('click',function(){
            show_input($(this));
        }); 


        // 显示搜索框   v2 开头 为 sprites img
        function show_input(obj){
             obj.closest('.search').find(select_search_content).removeClass('dp_none');
             obj.closest('.search_form').addClass('search_form_active v2-search_form1');
             obj.closest('.search').find('.select_search_content').addClass('search_content_active');      
             var h =  obj.closest('.search').find('.select_search_content').height();
             obj.closest('.search').css('height',(h+60)+'px');      
        }

        // 隐藏搜索框
        function hide_input(){
            search_text.closest('.search_form').removeClass('search_form_active v2-search_form1');
            $('.search').find(select_search_content).addClass('dp_none').removeClass('search_content_active');      
        }
         /** {{{ 点击其他区域隐藏搜索框 IE8 兼容 **/
         $('#search').on('mouseleave',function(event){
            hide_input();
         });
        /* }}} */

         /** {{{ 搜索框默认填充 **/
        if(typeof(HOT_KWS) != "undefined"){
            for (var i = 0; i < HOT_KWS.length; i++) {
                $('#select_search_ul').append("<li>"+HOT_KWS[i]+"</li>");
            }            
        }

        /* }}} */

         /** {{{ 根据输入框文字输入遍历结果 IE8 兼容 **/
        window.on_search = false;
        search_text.attr('data-last', '');
        search_text.on('keyup',function(){
            var _this = $(this);
            if (!window.on_search) {
                search_words = $("#search_text").val();
                if (search_words != _this.attr('data-last') &&
                        /^([0-9a-z]|[^u4e00-u9fa50])+$/i.test(search_words) && search_words.length < 15) {
                    window.on_search = true;
                    $.getJSON(ADV_URL + encodeURI(search_words), function(data, httpcode){
                        $('#select_search_h2').text("搜索建议");
                        if (data.length > 1) {
                            var append = '';
                            $('#select_search_ul').empty();
                            for (var i = 0; i < data.length; i++) {
                                append += "<li>" + data[i] + "</li>";
                            }
                            $('#select_search_ul').append(append);
                        }
                        else {
                            $('#select_search_ul').empty();
                            $('#select_search_ul').append('<li class="no-record">无搜索建议</li>');
                        }
                        // 更新搜索词
                        _this.attr('data-last', search_words);
                        window.on_search = false;
                    });
                }
            }
        });

        /* }}} */
        

        $('.select_search_ul li').live('click',function(){
            var val   = $(this).text(),
            serch = $(this).closest('.search');  
            serch.find('#search_text').val(val);          
            serch.find('.search_form').removeClass('search_form_active');
            serch.find(select_search_content).addClass('dp_none').removeClass('search_content_active');
            $('#search_submit').trigger('click'); 

        });

    /* }}} */

    /** {{{ 新版关于我们 **/
        $('.ab-tab-ul li').on('click',function(index){
            var _index =$(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.ab-tab-content').addClass('dp_none');
            $('.ab-tab-content').eq(_index).removeClass('dp_none');
        });
    /* }}} */



    /** {{{ 新版关于我们 **/
        $('.bank-news').off('click').on('click',function(){
            $(this).find('.user_icon').toggleClass('active_h');
            $(this).find('#bank-select').toggleClass('dp_none');
        });

        $('#bank-select li').on('click',function(){
            var val = $(this).text();
            $(this).closest('.bank_div').find('.result-span').text(val);
        });


        if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
            $(window).load(function(){
                $('input:-webkit-autofill').each(function(){
                    var text = $(this).val();
                    var name = $(this).attr('name');
                    $(this).after(this.outerHTML).remove();
                    $('input[name=' + name + ']').val(text);
                });
            });
        }

    /* }}} */


        /* {{{ register dialog */
        $('#register-dialog-btn').on('click', function () {
            REX.dialog(this);
        });
        /* }}} */
            
        /* {{{ login dialog */
        $('#login-dialog-btn').on('click', function () {
            REX.dialog(this);
        });
        
        $('#login-dialog-btn2').on('click', function () {
            console.log(1);
            REX.dialog(this);
            
            

        });
        
        /* }}} */
        
        /** {{{ 分站点击显示 **/
        $('.city_choose').on('click',function(){
            $('.hot-city').removeClass('dp-hidden');
            $('.city_select').addClass('active_h');
        });
        var element=$('.hot-city ul li a');
        element.on('click',function(){
            var _val=$(this).text();
            $('.city_choose').find('span.city').text(_val);
            $('.hot-city').addClass('dp-hidden');
            $('.city_select').removeClass('active_h');
        })
        $('.hot-city').on('mouseleave',function(){
            $(this).addClass('dp-hidden');
            $('.city_select').removeClass('active_h');
        });
         /** }}} **/

});
/* }}} */

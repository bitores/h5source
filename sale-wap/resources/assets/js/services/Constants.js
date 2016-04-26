define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd, angular,angular_route,angular_resource) {
    //常量配置到$scope
    function Constant() {
        //客户端检测
        var WebEdition = function () {
            //浏览器版本
            this.version = {};
            //浏览器内核   只输出内核 不输出排版引擎
            this.web_core_code = {};
            //浏览器外壳名称
            this.web_name_code = {};
            this.run();
        }
        WebEdition.prototype = {
            run: function () {
                //浏览器版本
                this.edition();

                //浏览器内核
                this.web_core();

                //浏览器外壳  判断各种客户端
                this.web_core();
            }, 
            edition: function () {
                //判断不同浏览器内核
                var ua = navigator.userAgent.toLowerCase();
                var s;
                if ("ActiveXObject" in window) this.version.ie = 11;
                (s = ua.match(/msie ([\d]+)/i)) ? this.version.ie = s[1] :
                (s = ua.match(/firefox\/([\d]+)/i)) ? this.version.firefox = s[1] :
                (s = ua.match(/chrome\/([\d]+)/i)) ? this.version.chrome = s[1] :
                (s = ua.match(/opera.([\d]+)/i)) ? this.version.opera = s[1] :
                (s = ua.match(/version\/([\d]+).*safari/i)) ? this.version.safari = s[1] : this.version.unkonw = 0;
            },
            web_core: function () {
                //浏览器外壳  判断各种客户端
                //目前支持 微信识别
                var ua = navigator.userAgent.toLowerCase();
                // alert(this.version.MicroMessenger);
              
              
                //其他外壳
                if (s = ua.match(/gecko\/([\d]+)/i)) this.web_core_code.Gecko = s[1];
                if (s = ua.match(/applewebkit\/([\d]+)/i)) this.web_core_code.WebKit = s[1];
                if (s = ua.match(/trident\/([\d]+)/i)) this.web_core_code.Trident = s[1];
                if (s = ua.match(/presto\/([\d]+)/i)) this.web_core_code.Presto = s[1];
                if (s = ua.match(/blink\/([\d]+)/i)) this.web_core_code.Blink = s[1];
                
                //微信
                if (s = ua.match(/MicroMessenger\/([\d]+)/i)) this.web_core_code.MicroMessenger = s[1]; 
            },
            web_name: function () {

            }
        }
        var AppName = new WebEdition();
        
        //判断当前客户端
        // function AppName(){
        //     var ua = navigator.userAgent;
        //     console.log(ua);
        // }
        // AppName();
        
        return {
            //链接地址常量 
            IMG_ADDRESS:IMG_ADDRESS,
            WAP_ADDRESS:WAP_ADDRESS,
            API_ADDRESS:API_ADDRESS,
            // 图片大小常量
            IMG_WIFI_SISE:IMG_WIFI_SISE,
            IMG_4G_SISE:IMG_4G_SISE,
            IMG_3G_SISE:IMG_3G_SISE,
            // 客户端类型
            APP_WAP_TYPE:APP_WAP_TYPE,
            APP_IOS_TYPE:APP_IOS_TYPE,
            APP_ANDROID_TYPE:APP_ANDROID_TYPE,
            // 请求设置
            CONNECTION:CONNECTION,
            INS:20
        }
    }
    
    var Constants = Constant();
    return Constants;
});
(function(){
var Require_Config={
    "baseUrl": './',//依赖相对路径
     //配置angular的路径
    "paths":{
        // 一些库文件
        "angular":'/angular/angular.min', 
        "angular-animate":"/angular-animate/angular-animate.min",
        "angular-cookies":"/angular-cookies/angular-cookies.min",
        "angular-messages":"/angular-messages/angular-messages.min",
        "angular-resource":"/angular-resource/angular-resource.min",
        "angular-route":"/angular-route/angular-route.min",
        "angular-touch":"/angular-touch/angular-touch.min",
        "zepto":"/zepto/zepto.min",
        "jweixin":"/js/lib/jweixin-1.0.0",
        //js文件
        "config":"/js/config",
        "wxshare":"/js/common/wxshare",

        // filter
        "Filters":"/js/filter/filters",
        // service
        "Log":"/js/service/Log",
        "Car":"/js/service/Car",
        
        //controller
        "IndexController":"/js/controller/home/index",
        "BrandController":"/js/controller/car/brand",
        "ModelController":"/js/controller/car/model",
        "KCJController":"/js/controller/help/bargain",
        "NoneController":"/js/controller/inquiry/none",
        "ResultController":"/js/controller/inquiry/result",
        "EvaluateController":"/js/controller/seller/evaluate",
        "MainController":"/js/controller/seller/main",
        "OfferController":"/js/controller/seller/offer",
        "AftersaleController":"/js/controller/user/aftersale",
        "AftersalingController":"/js/controller/user/aftersaling",
        "BookedController":"/js/controller/user/booked",
        "CollectedController":"/js/controller/user/collected",
        "FeedbackController":"/js/controller/user/feedback",
        "MineController":"/js/controller/user/mine",
        "PersonalController":"/js/controller/user/personal",
        "BargainController":"/js/controller/help/bargain"
    },
    //这个配置是你在引入依赖的时候的包名
    "shim":{
        "angular":{
            exports:"angular"
        },
        "angular-animate":{
            deps: ['angular'],   //依赖什么模块
            exports:"angular-animate"
        },
        "angular-cookies":{
            deps: ['angular'],   //依赖什么模块
            exports:"angular-cookies"
        },
        "angular-messages":{
            deps: ['angular'],   //依赖什么模块
            exports:"angular-messages"
        },
        "angular-resource":{
            deps: ['angular'],   //依赖什么模块
            exports:"angular-resource"
        },
        "angular-route":{
            deps: ['angular'],   //依赖什么模块
            exports:"angular-route"
        },
        "angular-touch":{
            deps: ['angular'],   //依赖什么模块
            exports:"angular-touch"
        },
        "zepto":  {
            exports:"zepto"
        },
        "jweixin":  {
            exports:"jweixin"
        }
    },
    deps:['config','zepto','jweixin'],
    urlArgs: "debug=" + (new Date()).getTime(),
    waitSeconds:0
}
require.config(Require_Config);
//应用配置
require(['zepto','angular','angular-route','angular-resource',"angular-animate", "angular-messages", "angular-cookies", 
    // filter
    "Filters",
    // service
    "Log",
    "Car",
    //controller
    'IndexController',
    "BrandController",
    "ModelController",
    "KCJController",
    "NoneController",
    "ResultController",
    "EvaluateController",
    "MainController",
    "OfferController",
    "AftersaleController",
    "AftersalingController",
    "BookedController",
    "CollectedController",
    "FeedbackController",
    "MineController",
    "PersonalController"
    // ,"BargainController"
    ], function (nnd,angular,angular_route,angular_resource,angular_animate, angular_messages, angular_cookies, 
     Filters,
    Log,
    Car,
    IndexController,
    BrandController,
    ModelController,
    KCJController,
    NoneController,
    ResultController,
    EvaluateController,
    MainController,
    OfferController,
    AftersaleController,
    AftersalingController,
    BookedController,
    CollectedController,
    FeedbackController,
    MineController,
    PersonalController
    // ,BargainController
    ) {
    console.log('加载bijiawap.js  Require_Config');
    //判断客户端类型
    var WebEdition = function () {
        //浏览器版本
        this.version = {};
        //浏览器内核   只输出内核 不输出排版引擎
        // this.web_core_code = {};
        //浏览器外壳名称
        // this.web_name_code = {};
        this.run();
    };
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
            var s;
            
            //其他外壳
            if (s = ua.match(/gecko/gi)) this.version.Gecko = true;
            if (s = ua.match(/applewebkit/gi)) this.version.WebKit = true;
            if (s = ua.match(/trident/gi)) this.version.Trident = true;
            if (s = ua.match(/presto/gi)) this.version.Presto = true;
            if (s = ua.match(/blink/gi)) this.version.Blink = true;
            
            //微信
            if (s = ua.match(/MicroMessenger/gi)) this.version.MicroMessenger = true; 
            //安卓
            if (s = ua.match(/Android Mobile/gi)) this.version.Android = true; 
            //IOS
            if (s = ua.match(/kuaiqiangcheios/gi)) this.version.IOS = true; 
        },
        web_name: function () {

        }
    };
    window.AppName = new WebEdition();
    
    //创建应用与依赖组件
    var kbjmobeli = angular.module('kbjmobeli', ['ngRoute', "ngResource", "ngAnimate", "ngMessages", "ngCookies"]);

    // kbjmobeli.animation(".comm_view", function($rootScope) {
    //     return {
    //         enter: function(element, done) {
    //             element.css({
    //                 position: "absolute",
    //                 top: 0,
    //                 left: "100%",
    //                 "z-index": 100,
    //                 width: "100%",
    //                 "min-height": "100%",
    //                 opacity: 0
    //             }),
    //             $(element).animate({
    //                 left: 0,
    //                 opacity: 1
    //             }, 500)
    //         },
    //         leave: function(element, done) {
    //             element.css({
    //                 position: "absolute",
    //                 top: 0,
    //                 left: 0,
    //                 "z-index": 99,
    //                 "min-height": "100%",
    //                 width: "100%",
    //                 opacity: 1
    //             }),
    //             $(element).animate({
    //                 left: "-100%",
    //                 opacity: 0
    //             }, {
    //                 duration: 400,
    //                 complete: function() {
    //                     $rootScope.commimglodas.run()
    //                 }
    //             })
    //         }
    //     }
    // });
    // //绑定Filters
    // kbjmobeli.filter("xx",Filters.xx);  

    // //构造函数
    kbjmobeli.service("Log",Log);
    kbjmobeli.service("Car",Car);
        
    // /*---------- 绑定Controller ----------*/
    // //首页
    kbjmobeli.controller("IndexController",IndexController);
    kbjmobeli.controller("BrandController",BrandController);
    kbjmobeli.controller("ModelController",ModelController);
    kbjmobeli.controller("KCJController",KCJController);
    kbjmobeli.controller("NoneController",NoneController);
    kbjmobeli.controller("ResultController",ResultController);
    kbjmobeli.controller("EvaluateController",EvaluateController);
    kbjmobeli.controller("MainController",MainController);
    kbjmobeli.controller("OfferController",OfferController);
    kbjmobeli.controller("AftersaleController",AftersaleController);
    kbjmobeli.controller("AftersalingController",AftersalingController);
    kbjmobeli.controller("BookedController",BookedController);
    kbjmobeli.controller("CollectedController",CollectedController);
    kbjmobeli.controller("FeedbackController",FeedbackController);
    kbjmobeli.controller("MineController",MineController);
    kbjmobeli.controller("PersonalController",PersonalController);
    // kbjmobeli.controller("BargainController",BargainController);


    kbjmobeli.run(function ($rootScope,$location,$routeParams,$route) {
        console.log('kbjmobeli run ...');
    //     //方便获得当前状态的方法，绑到根作用域
    //     // $rootScope.$state = $state;
    //     // $rootScope.$stateParams = $stateParams;
        $rootScope.goIndex = function(){
            console.log("go index...");
            $location.path('/');
        }

        $rootScope.goCollection = function(){
            console.log("go index...");
            $location.path('/collection');
        }

        $rootScope.goMine = function(){
            console.log("go index...");
            $location.path('/inquiry');
        }
    })
    kbjmobeli.config(function($provide,$routeProvider,$locationProvider,$httpProvider) {
        console.log('route config ...');
    //     console.log($routeProvider);
        $routeProvider.
        //首页
        when('/', { controller: 'IndexController', templateUrl: '/index/V' ,resolve:{
            init:function($rootScope){
                console.log(1);
                $rootScope.footer = true;
                
            }
        }}).
        when('/index', { controller: 'IndexController', templateUrl: '/index/V' ,resolve:{
            init:function($rootScope){
                $rootScope.footer = true;
            }
        }}).
        when('/index.html', { controller: 'IndexController', templateUrl: '/index/V' ,resolve:{
            init:function($rootScope){
            }
        }}).
        // car
        when('/s', { controller: 'BrandController', templateUrl: '/s/brand/V' ,resolve:{
            init:function($rootScope){
                console.log(1);
                $rootScope.footer = true;
                
            }
        }}).
        when('/s/b:id', { controller: 'BrandController', templateUrl: '/s/brand/V' ,resolve:{
            init:function($rootScope){
                console.log(1);
                $rootScope.footer = true;
                
            }
        }}).
        when('/s/b:id/s:id', { controller: 'ModelController', templateUrl: '/s/model/V' ,resolve:{
            init:function($rootScope){
                $rootScope.footer = true;
            }
        }}).
        when('/s/b:id/s:id/t:id', { controller: 'ModelController', templateUrl: '/s/model/V' ,resolve:{
            init:function($rootScope){
            }
        }}).
        //collection
        when('/collection', { controller: 'IndexController', templateUrl: '/index/V' ,resolve:{
            init:function($rootScope){
                $rootScope.footer = true;
            }
        }}).
        when('/collection/:carid', { controller: 'IndexController', templateUrl: '/index/V' ,resolve:{
            init:function($rootScope){
            }
        }}).
        //inquiry
        when('/inquiry', { controller: 'ResultController', templateUrl: '/result/V' ,resolve:{
            init:function($rootScope){
                console.log(1);
                $rootScope.footer = true;
                
            }
        }}).
        when('/inquiry/:id', { controller: 'OfferController', templateUrl: '/offer/V' ,resolve:{
            init:function($rootScope){
                $rootScope.footer = true;
            }
        }}).
        when('/profile/:id', { controller: 'MainController', templateUrl: '/main/V' ,resolve:{
            init:function($rootScope){
            }
        }}).

        // when('/help', { controller: 'BargainController', templateUrl: '/bargain/V' ,resolve:{
        //     init:function($rootScope){
        //     }
        // }}).

        //错误页面
        when('/error/404', { controller: 'ErrorController', templateUrl: '/error/404/V',resolve:{
            init:function($rootScope){
            }
        }}).
        when('/error/500', { controller: 'ErrorController', templateUrl: '/error/500/V',resolve:{
            init:function($rootScope){
            }
        }}).
        otherwise({ redirectTo: '/error/404' });
        
        //全局添加API接口指标
        $httpProvider.defaults.headers.common["Accept"] = "version=1.0.1&client_type=wap";
        //开启HTML5链接 
        $locationProvider.html5Mode(true);
    })
    
    //手动启动mobule 
    angular.bootstrap($("html")[0],["kbjmobeli"]); 
});
})();
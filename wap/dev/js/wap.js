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
        //js文件
        "config":"/js/config",

        // filter
        "Filters":"/js/filter/filters",
        // service
        "Api":"/js/service/Api",
        "Log":"/js/service/Log",
        "Car":"/js/service/Car",
        
        //controller
        "IndexController":"/js/controller/indexCtrl"
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
    deps:['config','zepto'],
    urlArgs: "debug=" + (new Date()).getTime(),
    waitSeconds:0
}
require.config(Require_Config);
//应用配置
require(['zepto','angular','angular-route','angular-resource',"angular-animate", "angular-messages", "angular-cookies", 
    // filter
    "Filters",
    // service
    "Api",
    "Log",
    "Car",
    //controller
    'IndexController'
    ], function (nnd,angular,angular_route,angular_resource,angular_animate, angular_messages, angular_cookies, 
    Filters,
    Api,
    Log,
    Car,
    IndexController
    ) {
    console.log('加载bijiawap.js  Require_Config');
    
    //创建应用与依赖组件
    var app = angular.module('app', ['ngRoute', "ngResource", "ngAnimate", "ngMessages", "ngCookies"]);

    // app.animation(".comm_view", function($rootScope) {
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
    app.filter("xx",Filters);  

    // //构造函数
    app.service("Api",Log);
    app.service("Log",Log);
    app.service("Car",Car);
        
    // /*---------- 绑定Controller ----------*/
    // //首页
    app.controller("IndexController",IndexController);

    app.run(function ($rootScope,$location,$routeParams,$route) {
        console.log('app run ...');
    //     //方便获得当前状态的方法，绑到根作用域
    //     // $rootScope.$state = $state;
    //     // $rootScope.$stateParams = $stateParams;
        $rootScope.goIndex = function(){
            console.log("go index...");
            $location.path('/');
        }
    })
    app.config(function($provide,$routeProvider,$locationProvider,$httpProvider) {
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
        // when('/s', { controller: 'BrandController', templateUrl: '/s/brand/V' ,resolve:{
        //     init:function($rootScope){
        //         console.log(1);
        //         $rootScope.footer = true;
                
        //     }
        // }}).
        // when('/s/b:id', { controller: 'BrandController', templateUrl: '/s/brand/V' ,resolve:{
        //     init:function($rootScope){
        //         console.log(1);
        //         $rootScope.footer = true;
                
        //     }
        // }}).
        // when('/s/b:id/s:id', { controller: 'ModelController', templateUrl: '/s/model/V' ,resolve:{
        //     init:function($rootScope){
        //         $rootScope.footer = true;
        //     }
        // }}).
        // when('/s/b:id/s:id/t:id', { controller: 'ModelController', templateUrl: '/s/model/V' ,resolve:{
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
    // angular.bootstrap($("html")[0],["app"]); 
    angular.bootstrap(document,["app"]); 
});
})();
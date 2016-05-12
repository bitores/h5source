(function(){
var Config={
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
        "config":"/js/config",
        "app":"/js/app",
        "router":"/js/router",

        // filter
        "Filters":"/js/filter/filters",
        // service
        "Api":"/js/service/Api",
        "Log":"/js/service/Log",
        "Car":"/js/service/Car",
        // interceptor -- 过滤器
        "loading":"/js/interceptor/loading"
    },
    //这个配置是你在引入依赖的时候的包名
    "shim":{
        "app": {
            deps: ['zepto','router','angular','angular-route','angular-resource',"angular-animate", "angular-messages", "angular-cookies"]
        },
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
        "zepto":{
            exports:"zepto"
        }
    },
    deps:['config'],
    urlArgs: "debug=" + (new Date()).getTime(),
    waitSeconds:0
}
require.config(Config);
//应用配置
require(["app"], function (app) {
    console.log('加载bootstrap.js ');
    
    // $httpprovider.interceptors.push('loading')
    //手动启动mobule 
    angular.bootstrap(document,["app"]); 
});
})();
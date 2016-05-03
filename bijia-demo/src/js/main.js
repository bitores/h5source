//https://github.com/kenkozheng/HTML5_research/tree/master/AngularRequireJS
console.log("require main.js")
var baseUrl = document.getElementById('main').getAttribute('data-baseurl');
// require config
var config = {
    "baseUrl": baseUrl,//依赖相对路径
	 //配置angular的路径
    "paths":{
    	// 一些库文件
        "angular":"/pkg/angular", 
        "angular-animate":"/pkg/angular-animate",
        "angular-cookies":"/pkg/angular-cookies",
        "angular-messages":"/pkg/angular-messages",
        "angular-resource":"/pkg/angular-resource",
        "angular-route":"/pkg/angular-route",
        "angular-ui-router":"/pkg/angular-ui-router",
        "angular-sanitize":"/pkg/angular-sanitize",
        "swiper":"/lib/swiper.min",
        "zepto":"/lib/zepto.min",
        //js文件
        'bootstrap': "/src/js/bootstrap",
        'app': "/src/js/app",
        'router': "/src/js/router",
        'init':"/src/js/init",
        //.....以及其他的js文件，这里省略
        'math':"/src/js/filter/math",
        'info':"/src/js/service/info",
        'indexCtr':"/src/js/controller/indexCtr",
        'alert':"/src/js/directives/alert"
        
    },
    //这个配置是你在引入依赖的时候的包名
    "shim":{
        "angular":{
            exports:"angular"
        },
		"angular-animate": {
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-animate"
        },
		"angular-cookies":  {
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-cookies"
        },
		"angular-messages":  {
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-messages"
        },
		"angular-resource":  {
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-resource"
        },
        "angular-route":{
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-route"
        },
        "angular-ui-router":{
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-ui-router"
        },
		"angular-sanitize":  {
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-sanitize"
        },
		"swiper":  {
			exports:"swiper"
        },
		"zepto":  {
			exports:"zepto"
        },
    },
    deps:['init'],//先加载
    urlArgs: "bust=" + (new Date()).getTime(),  //防止读取缓存，调试用
    waitSeconds:0
};

require.config(config);

// require run
//应用配置
require(['bootstrap',
    //Filters
    //Direetives
    //Services
    //TopController
    //Controller
], function (router2
	// ,
	//
    ) {

        console.log('main app require');
    // app.run(['$rootScope','$state','$stateParams',
    //     function ($rootScope, $state, $stateParams) {
    //         console.log('app run ...');
    //         //方便获得当前状态的方法，绑到根作用域
    //         $rootScope.$state = $state;
    //         $rootScope.$stateParams = $stateParams
    //     }
    //  ])
     // .config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider){
        // console.log('route config ...');
        //用于改变state时跳至顶部
        // $uiViewScrollProvider.useAnchorScroll();
        // 默认进入先重定向
        // $urlRouterProvider.when("", "/PageTab");
        // $urlRouterProvider.otherwise('/');
        // $stateProvider
            // .state('index',{
            //     url:'/index',
            //     views: {
            //         '':{
            //             templateUrl:'/src/views/PageTab.html'
            //         },
            //         'main1@index':{
            //             templateUrl:'/src/views/PageTab.html'
            //         },
            //         'main2@index':{
            //             templateUrl:'/src/views/PageTab.html'
            //         }
            //     }
            // })
            // .state("PageTab", {
            //     // abstract: true 表明此状态不能被显性激活，只能被子状态隐性激活
            //     url: "/PageTab",
            //     templateUrl: "/src/views/PageTab.html"
            // })
            // .state("PageTab.Page1", {
            //     url:"/Page1",
            //     templateUrl: "/src/views/Page1.html"
            // })
            // .state("PageTab.Page2", {
            //     url:"/Page2",
            //     templateUrl: "/src/views/Page2.html"
            // })
            // .state("PageTab.Page3", {
            //     url:"/Page3",
            //     templateUrl: "/src/views/Page3.html"
            // });


        //全局添加API接口指标
        // $httpProvider.defaults.headers.common["Accept"] = "version=1.0.1&client_type=wap";
        //开启HTML5链接 
        // $locationProvider.html5Mode(true);                      
    // })

	 //创建应用与依赖组件
    // var  kqcmobeli = angular.module('kqcmobeli', ['ngRoute','ngResource','ngAnimate','ngMessages','ngCookies','ngSanitize']);



    // $rootScope.$on('$locationChangeSuccess',function(evt,next,current){
            // $rootScope.path = $location.path()
//          console.log('地址变化后')
               
//         	var url = $location.path();
//      	var url_data,jsonid;
//      	(url_data = url.match(/^\/detail\/(?:([^\/]+))\/(?:([^\/]+))\$/i)) ? jsonid = url_data :jsonid={};
//      	
//      	if(typeof jsonid[1] == "undefined"){
//      		
//      	}else{
//      		if($rootScope.Url == true){
//      			$rootScope.Url = false;
//      			$rootScope.commview = false;
//      			return
//      			evt.preventDefault();
//      			
//      			console.log(1);
//	        	}
//
//      	}
//      	console.log(jsonid);
//      	console.log(evt,next,current);
            // console.log(evt) 
            // console.log(next) 
            // console.log(current)
//          if($rootScope.path == $location.path){
//              console.log("地址变化后 地址一样")
//              evt.preventDefault();
//          }

			
        	
        // })
        
        // $rootScope.$on('$routeChangeStart',function(evt,next,current){
        	
        	
//      	if($rootScope.Url){
//      		if($rootScope.path == $location.path()){
//      			evt.preventDefault();
//	            }
//      	}
//      	
        	
            //路由前
//         console.log('路由前')
////         console.log(evt) 
////         console.log(next) 
////         console.log(current)
//			console.log($rootScope.search,$location.search())
//			console.log(($rootScope.path == '/search.html' && $location.path() == '/search.html'),$rootScope.search !=  $location.search())
//         if(($rootScope.path == '/search.html' && $location.path() == '/search.html') && (($rootScope.search ==  $location.search()))){
//              console.log("地址变化前 地址一样")
////              $rootScope.commview = false;
//              evt.preventDefault();
//          }
//      	$rootScope.path = $location.path()
//      	$rootScope.search ==  $location.search()

        // })
        
        // $rootScope.$on("$routeChangeSuccess",function(evt,next,current){
        	
            //路由后
//             console.log('路由后')
            // console.log(evt)   
            // console.log(next)   
            // console.log(current)           
        // });
        // $rootScope.$on("$routeChangeError",function(evt,next,current){
            //路由失败
            // console.log('路由失败')
            // console.log(evt,next,current)           
        // });
        // $rootScope.$on("$routeUpdate",function(evt,next,current){
            //路由重新使用某个控制器
            // console.log('路由重新使用某个控制器')
            // console.log(evt,next,current)           
        // });
        
    // });


    

    

});
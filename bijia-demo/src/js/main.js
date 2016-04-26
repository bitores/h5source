console.log("require main.js")
// require config
require.config({

	 //配置angular的路径
    paths:{
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
        //.....以及其他的js文件，这里省略
        'init':"/src/js/init"
    },
    //这个配置是你在引入依赖的时候的包名
    shim:{
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
    deps:['init','bootstrap'],//先加载
    urlArgs: "bust=" + (new Date()).getTime(),  //防止读取缓存，调试用
    waitSeconds:0
});

// require run
//应用配置
require([
	// ,
    //Filters
    //Direetives
    //Services
    //TopController
    //Controller
], function (angular,angular_route,angular_ui_router,angular_resource,angular_animate,angular_messages,angular_upload,angular_upload_shim,angular_cookies,angular_sanitize
	// ,
	//
    ) {




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
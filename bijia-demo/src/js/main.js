console.log("require main.js")
// require config
require.config({

	 //配置angular的路径
    paths:{
    	// 一些库文件
        "angular":"path/to/angular", 
        "angular-route":"path/to/angular-route",
        //js文件
        'bootstrap': "/src/js/bootstrap",
        'app': "/src/js/app",
        'router': "/src/js/router"
        //.....以及其他的js文件，这里省略
    },
    //这个配置是你在引入依赖的时候的包名
    shim:{
        "angular":{
            exports:"angular"
        },
        "angular-route":{
            exports:"angular-route"
        },
        "angular-ui-route":{
            exports:"angular-ui-route"
        },
    },
    deps:['bootstrap'],//先加载
    urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
});

// require run
//应用配置
require(['zepto','swiper','angular','angular-route','angular-resource','angular-animate','angular-messages','angular-upload','angular-upload-shim','angular-cookies','angular-sanitize'
	// ,
    //Filters
    //Direetives
    //Services
    //TopController
    //Controller
], function (nnd,swiper,angular,angular_route,angular_resource,angular_animate,angular_messages,angular_upload,angular_upload_shim,angular_cookies,angular_sanitize
	// ,
    ) {




	 //创建应用与依赖组件
    var  kqcmobeli = angular.module('kqcmobeli', ['ngRoute','ngResource','ngAnimate','ngMessages','ngCookies','ngSanitize']);



    $rootScope.$on('$locationChangeSuccess',function(evt,next,current){
            $rootScope.path = $location.path()
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

			
        	
        })
        
        $rootScope.$on('$routeChangeStart',function(evt,next,current){
        	
        	
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

        })
        
        $rootScope.$on("$routeChangeSuccess",function(evt,next,current){
        	
            //路由后
//             console.log('路由后')
            // console.log(evt)   
            // console.log(next)   
            // console.log(current)           
        });
        $rootScope.$on("$routeChangeError",function(evt,next,current){
            //路由失败
            // console.log('路由失败')
            // console.log(evt,next,current)           
        });
        $rootScope.$on("$routeUpdate",function(evt,next,current){
            //路由重新使用某个控制器
            // console.log('路由重新使用某个控制器')
            // console.log(evt,next,current)           
        });
        
    });


    //全局添加API接口指标
    $httpProvider.defaults.headers.common["Accept"] = "version=1.0.1&client_type=wap";
    //开启HTML5链接 
    $locationProvider.html5Mode(true);

    //手动启动mobule
    angular.bootstrap($("html")[0],["kqcmobeli"]);

});
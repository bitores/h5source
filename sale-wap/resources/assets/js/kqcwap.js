require.config(Require_Config);
//应用配置
require(['zepto','angular','app','angular-route','angular-resource','angular-animate',
    //Filters
    'isCapitalzed',
    //Direetives
    'MyDirective','swiper','slide',
    //Services
    'DEMO','Constants','Car','Common','Community','Help','Index','Order','Pay','Product','User','Search',
    //TopController
    'KqcController',
    //Controller
    'IndexController','CommunityController','CarController','HelpController','UserController','brSearchController',
    'SearchController',
    //Demo
    'ListController','DemoController','ShowController','ClassController','BookController'
], function (nnd,angular,app,angular_route,angular_resource,angular_animate,
    isCapitalzed,
    MyDirective,swiper,slide,
    DEMO,Constants,Car,Common,Community,Help,Index,Order,Pay,Product,User,Search,
    KqcController,
    IndexController,CommunityController,CarController,HelpController,UserController,brSearchController,
    SearchController,
    ListController,DemoController,ShowController,ClassController,BookController
    ) {

    //创建路由服务
    app.kqcmobeli.config(function($routeProvider,$locationProvider,$httpProvider) {
        $routeProvider.

        when('/', { controller: 'brSearchController', templateUrl: '/brSearch/V'}).
        when('/index', { controller: 'IndexController', templateUrl: '/index/V'}).
        when('/book', { controller: 'BookController', templateUrl: '/book/V' }).
        when('/show', { controller: 'ShowController', templateUrl: '/show/V' }).
        when('/class', { controller: 'ClassController', templateUrl: '/class/V' }).
        when('/search', { controller: 'SearchController', templateUrl: '/search/V' }).

        otherwise({ redirectTo: '/' });
        
        $httpProvider.defaults.headers.common["Accept"] = "version=1.0.1&client_type=wap";
        //开启HTML5链接 
        $locationProvider.html5Mode(true);
    });
    
    $(".loding").hide();
    
    //手动启动mobule
    angular.bootstrap($("body")[0],["kqcmobeli"]);
    

});


 requirejs.onError = function (error) {
     console.log(error);
     console.log(error.requireType);
     console.log(error.requireModules);
     if (error.requireType === 'timeout') {
         console.log('modules: ' + error.requireModules);
     }
    throw error;
 };

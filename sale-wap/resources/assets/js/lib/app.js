
define(['zepto','angular','angular-route','angular-resource','angular-animate',
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
],function (nnd,angular,angular_route,angular_resource,angular_animate,
    isCapitalzed,
    MyDirective,swiper,slide,
    DEMO,Constants,Car,Common,Community,Help,Index,Order,Pay,Product,User,Search,
    KqcController,
    IndexController,CommunityController,CarController,HelpController,UserController,brSearchController,
    SearchController,
    ListController,DemoController,ShowController,ClassController,BookController
    ) {


    //创建应用与依赖组件
    var  kqcmobeli = angular.module('kqcmobeli', ['ngRoute','ngResource']);
    
    //绑定Direetives
    //kqcmobeli.directive("swiper",swiper);
    //kqcmobeli.directive("slide",slide);
    
    //绑定Filters
    kqcmobeli.filter("isCapitalzed",isCapitalzed);
    
    //绑定Services
    kqcmobeli.constant("Constants",Constants);
    
    //obj 对象
    // kqcmobeli.factory("GetCatList",GetCatList);
    
    //构造函数
    kqcmobeli.service("Common",Common);          //基础接口
    kqcmobeli.service("User",User);				//用户相关
    kqcmobeli.service("Index",Index);			//首页相关
    kqcmobeli.service("Help",Help);
    kqcmobeli.service("Community",Community);
    kqcmobeli.service("Car",Car);
    kqcmobeli.service("Product",Product);
    kqcmobeli.service("Order",Order);
    kqcmobeli.service("Search",Search);

    //顶层控制器
    kqcmobeli.controller("KqcController",KqcController);
    
    
    
    //绑定Controller
    kqcmobeli.controller("IndexController",IndexController);
    kqcmobeli.controller("brSearchController",brSearchController);
    kqcmobeli.controller("ListController",ListController);
    kqcmobeli.controller("DemoController",DemoController);
    kqcmobeli.controller("ShowController",ShowController);
    kqcmobeli.controller("ClassController",ClassController);
    kqcmobeli.controller("BookController",BookController);
    kqcmobeli.controller("IndexController",IndexController);
    kqcmobeli.controller("CommunityController",CommunityController);
    kqcmobeli.controller("CarController",CarController);
    kqcmobeli.controller("HelpController",HelpController);
    kqcmobeli.controller("UserController",UserController);
    kqcmobeli.controller("SearchController",SearchController);

    return {
        kqcmobeli:kqcmobeli
    }
});
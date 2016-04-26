//链接地址常量 
var IMG_ADDRESS ="http://images.kuaiqiangche.com",
    WAP_ADDRESS ="http://m.kuaiqiangche.com",
    API_ADDRESS ="http://new_api.kuaiqiangche.cc";
// 图片大小常量  根据网络环境提供给用户3种不同类型的图片
var IMG_WIFI_SISE = "1000",
    IMG_4G_SISE = "600",
    IMG_3G_SISE = "480";
// 客户端类型 根据页面需求目前只划分4个
var APP_WAP_TYPE = "WAP",
    APP_IOS_TYPE = "IOS",
    APP_ANDROID_TYPE = "ANDROID";
    APP_WEIXIN_TYPE = 'WEIXIN';
// 请求设置
var CONNECTION = "";


var Require_Config = {
    paths: {
        //通用库 
        'zepto': [
            // 'http://apps.bdimg.com/libs/zepto/1.1.4/zepto.min',
            '/js/lib/zepto.min'
        ],
        'angular': [
            // 'http://apps.bdimg.com/libs/angular.js/1.4.6/angular',
            '/js/lib/angular'
        ],
        //插件
        'angularAMD': [
            'http://cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min'
        ],
        'angular-route': [
            // 'http://apps.bdimg.com/libs/angular.js/1.4.6/angular-route.min',
            '/js/lib/angular-route.min'
        ],
        'angular-resource': [
            //'http://apps.bdimg.com/libs/angular.js/1.4.6/angular-resource.min',
            '/js/lib/angular-resource.min'
        ],
        'angular-animate': [
            //'http://apps.bdimg.com/libs/angular.js/1.4.6/angular-animate.min',
            '/js/lib/angular-animate.min'
        ],
        //应用配置
        'app': [
            '/js/lib/app'
        ],
        //controller 顶层控制器
        'KqcController': [
            '/js/controller/KqcController'
        ],
        //controller 控制器
        'BookController': [
            '/js/controller/BookController'
        ],
        'ClassController': [
            '/js/controller/ClassController'
        ],
        'ShowController': [
            '/js/controller/ShowController'
        ],
        'DemoController': [
            '/js/controller/DemoController'
        ],
        'ListController': [
            '/js/controller/ListController'
        ],
        'CarController': [
            '/js/controller/CarController'
        ],
        'HelpController': [
            '/js/controller/HelpController'
        ],
        'CommunityController': [
            '/js/controller/CommunityController'
        ],
        'UserController': [
            '/js/controller/UserController'
        ],
        'IndexController': [
            '/js/controller/IndexController'
        ],
        'PayController': [
            '/js/controller/PayController'
        ],
        'IndexController': [
            '/js/controller/IndexController'
        ],
        'SearchController': [
            '/js/controller/SearchController'
        ],
        'brSearchController': [
            '/js/controller/brSearchController'
        ],
        //direetives 指令
        'MyDirective': [
            '/js/direetives/MyDirective'
        ],
        'swiper': [
            '/js/direetives/swiper'
        ],
        'slide': [
            '/js/direetives/slide'
        ],
        //filters 过滤器
        'isCapitalzed': [
            '/js/filters/isCapitalzed'
        ],
        //services 服务
        'Constants': [
            '/js/services/Constants'
        ],
        'Car': [
            '/js/services/Car'
        ],
        'Common': [
            '/js/services/Common'
        ],
        'Community': [
            '/js/services/Community'
        ],
        'Help': [
            '/js/services/Help'
        ],
        'Index': [
            '/js/services/Index'
        ],
        'Order': [
            '/js/services/Order'
        ],
        'Pay': [
            '/js/services/Pay'
        ],
        'Product': [
            '/js/services/Product'
        ],
        'User': [
            '/js/services/User'
        ],
        'Search': [
            '/js/services/Search'
        ],
        'DEMO': [
            '/js/services/DEMO'
        ]
    },
    shim: {
        'zepto': {
            exports: 'zepto'
        },
        'angular': {
            exports: 'angular'
        },
        //angular 插件
        'angularAMD': {
            deps: ['angular'],
            exports: 'angularAMD'
        },
        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        },
        'angular-resource': {
            deps: [,'angular'],
            exports: 'angular-resource'
        },
        'angular-animate': {
            deps: [,'angular'],
            exports: 'angular-animate'
        }
    },
    deps: ['app'],
    //fileExclusionRegExp: /build/,
    urlArgs: "v=" + version
}


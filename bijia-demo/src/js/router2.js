//http://www.tuicool.com/articles/zeiy6ff
//https://github.com/angular-ui/ui-router
define(['angular','angular-ui-router','angular-resource','angular-animate','angular-messages','angular-cookies','angular-sanitize'],
    function(angular){
    console.log('router...',app);
    var app = angular.module('app', ['ui.router','ngResource','ngAnimate','ngMessages','ngCookies','ngSanitize']);
    app.run(['$rootScope','$state','$stateParams',
        function ($rootScope, $state, $stateParams) {
            console.log('app run ...');
            //方便获得当前状态的方法，绑到根作用域
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams
        }
     ])
    app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider){
        console.log('route config ...');
        //用于改变state时跳至顶部
        // $uiViewScrollProvider.useAnchorScroll();
        // 默认进入先重定向
        // $urlRouterProvider.when("", "/PageTab");
        // $urlRouterProvider.otherwise('/');
        $stateProvider
            // .state({
            //     url:'/index',
            //     views: {
            //         '':{
            //             templateUrl:'../views/PageTab.html'
            //         },
            //         'main1@index':{
            //             templateUrl:'../views/PageTab.html'
            //         },
            //         'main2@index':{
            //             templateUrl:'../views/PageTab.html'
            //         }
            //     }
            // })
            .state("PageTab", {
                // abstract: true 表明此状态不能被显性激活，只能被子状态隐性激活
                'url': "/PageTab",
                'templateUrl': "/src/views/PageTab.html",
                'controller':''
            })
            .state("PageTab.Page1", {
                'url': "/Page1",
                'templateUrl': "/src/views/Page1.html",
                'controller':''
            })
            .state("PageTab.Page2", {
                'url': "/Page2",
                'templateUrl': "/src/views/Page2.html",
                'controller':''
            })
            .state("PageTab.Page3", {
                'url': "/Page3",
                'templateUrl': "/src/views/Page3.html",
                'controller':function($scope){

                }
            });
    $urlRouterProvider.otherwise('/PageTab');

        //全局添加API接口指标
        // $httpProvider.defaults.headers.common["Accept"] = "version=1.0.1&client_type=wap";
        //开启HTML5链接 
        $locationProvider.html5Mode(true);                      
    })


    angular.bootstrap(document, ['app']);
});
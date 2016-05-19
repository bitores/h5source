//http://www.tuicool.com/articles/zeiy6ff
//https://github.com/angular-ui/ui-router
define(['zepto','angular','angular-ui-router','angular-resource','angular-animate','angular-messages','angular-cookies','angular-sanitize',
    //Filters
    'math',
    //Direetives
    'alert',
    //Services
    'info',
    //TopController
    //Controller
    'indexCtr'
    ],
    function('nnz',angular,angular_ui_router,angular_resource,angular_animate,angular_messages,angular_cookies,angular_sanitize,
    //Filters
    math,
    //Direetives
    alert,
    //Services
    info,
    //TopController
    //Controller
    indexCtr

        ){
    console.log('router...',app);
    var app = angular.module('app', ['ui.router','ngResource','ngAnimate','ngMessages','ngCookies','ngSanitize']);

    //动画
    app.animation('.fadeOut', function(){
        return {
            // 'enter':function(ele,parentEle,afterEle,donecallback){console.log('enter');},
            // 'leave':function(ele,donecallback){console.log('leave');},
            // 'move':function(ele,parentEle,afterEle,donecallback){console.log('move');},
            // 'addClass':function(ele,className,donecallback){console.log('addClass');},
            // 'removeClass':function(ele,className,donecallback){console.log('removeClass');}

            enter: function(element, done) {
                console.log("enter.......");
                element.css({
                    opacity: 0.5,
                    position: "relative",
                    top: "10px",
                    left: "20px"
                  })
                  .animate({
                    top: 0,
                    left: 0,
                    opacity: 1
                    }, 1000, done);
            }
        }
    })

     //绑定Filters
    app.filter("Int",math.Int);              //取整
    app.filter("Float",math.Fraction);              //取整
    
    // 定义指令
    app.directive('alert',alert);

    /*---------- 通用配置 ---------- */
    app.constant("WEB_CODE",'20160428');

    //绑定services
    app.service("info",info);


    app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider){//,$rootScope
        console.log('route config ...');
        //用于改变state时跳至顶部
        $uiViewScrollProvider.useAnchorScroll();

        $stateProvider
            .state("PageTab0", {
                // abstract: true 表明此状态不能被显性激活，只能被子状态隐性激活
                'url': "/PageTab",
                'templateUrl': "/src/views/PageTab.html",
                'controller':''
            })
            .state("PageTab", {
                'url': "/PageTab/:asf",
                'templateUrl': "/src/views/PageTab.html",
                'controller':function($scope, $stateParams){
                    $scope.asf = $stateParams.asf;
                }
            })
            .state("PageTab.Page1", {
                'url': "/Page1",
                'templateUrl': "/src/views/Page1.html",
                'controller':''
            })
            .state("PageTab.Page2", {
                //http://127.0.0.1:8080/#/PageTab/6564/Page2/45/343?p=10&m=45
                'url': "/Page2/:pp/{sorted}?from&to",
                'templateUrl': "/src/views/Page2.html",
                'controller':''
            })
            .state("PageTab.Page3", {
                'url': "/Page3",
                'templateUrl': "/src/views/Page3.html",
                'controller':indexCtr
            });
            // $urlRouterProvider.otherwise('/PageTab');



        //全局添加API接口指标
        // $httpProvider.defaults.headers.common["Accept"] = "version=1.0.1&client_type=wap";
        //开启HTML5链接 
        // $locationProvider.html5Mode(true);  
        // 关于angularjs-ui-router的 html5Model开启后的一些问题,解决的核心还是要配置nginx                    
    })

    app.run(['$rootScope','$state','$stateParams',
        function ($rootScope, $state, $stateParams) {
            console.log('app run ...');
            //方便获得当前状态的方法，绑到根作用域
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            console.log($state,$stateParams);


            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){console.log('stateChangeStart');})
            $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){console.log('stateNotFound');})
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){console.log('stateChangeSuccess');})
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){console.log('stateChangeError');})

            $rootScope.$on('$viewContentLoading', function(event, viewConfig){console.log('viewContentLoading',viewConfig);})
            $rootScope.$on('$viewContentLoaded', function(event){console.log('viewContentLoaded');})

            $state.go('PageTab.Page3');
        }
     ])

});
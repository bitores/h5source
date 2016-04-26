define(["app"],function(app){
    return app.run(['$rootScope','$state','$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams
        }
     ])
     .config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider){
        //用于改变state时跳至顶部
        $uiViewScrollProvider.useAnchorScroll();
        // 默认进入先重定向
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home',{
            //abstract: true,
            url:'/home',
            views: {
                'main@': {
                    templateUrl: '../view/home.html'
                }
            }
        }) 

        //全局添加API接口指标
        // $httpProvider.defaults.headers.common["Accept"] = "version=1.0.1&client_type=wap";
        //开启HTML5链接 
        $locationProvider.html5Mode(true);                      
    })
});
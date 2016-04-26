(function () {
    //创建核心模块
    var myapp = angular.module('myapp', []);

    //创建路由服务
    function myappRouteConfig($routeProvider) {
        $routeProvider.
        when('/', { controller: IndexController, templateUrl: 'index.html' }).
        when('/list', { controller: IndexController, templateUrl: 'list.html' }).
        when('/login', { controller: IndexController, templateUrl: 'login.html' }).
        otherwise({redirectTo:'/'});
    }

    //页面路由配置
    var myapp = angular.module('myapp', [
           'ngCookies',
           'ngResource',
           'ngSanitize',
           'ngRoute'
    ]).config(['$routeProvider', '$routeSegmentProvider', '$httpProvider', function ($routeProvider, $routeSegmentProvider, $httpProvider) {
        //配置项
        //$httpProvider.defaults.timeout = 500;
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //$httpProvider.defaults.useXDomain = true;

        
        //$routeSegmentProvider.options.autoLoadTemplates = true;
        //路由配置 
        $routeSegmentProvider
            .when('/login', 'login')
            .when('/manage', 'manage.list')
            .segment('login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .segment('manage', {
                templateUrl: 'views/manage/manage.html',
                controller: 'ManageCtrl'
            })
            .within()
                .segment('list', {
                    templateUrl: 'views/manage/managelist.html'
                })
            .up()


        $routeProvider.otherwise({ redirectTo: '/main' });

        // configure $http to catch message responses and show them
        $httpProvider.responseInterceptors.push(['$q', '$rootScope', function ($q, $rootScope) {
            var setMessage = function (response) {
                // if the response has a text and a type property, it is a
                // message to be shown
                if (response.data.text && response.data.type) {
                    $rootScope.message = {
                        text: response.data.text,
                        type: response.data.type,
                        show: true
                    };
                }
            };

            return function (promise) {
                return promise.then(
                  // this is called after each successful server request
                  function (response) {
                      setMessage(response);
                      return response;
                  },
                  // this is called after each unsuccessful server request
                  function (response) {
                      setMessage(response);
                      return $q.reject(response);
                  });
            };
        }]);
    }]);

    console.log(app);
    function DemoController($scope) {
        $scope.demo = { text: "demo" }
    }
    function BookController($scope) {
        $scope.books = [
            { text: "demo", number: 1, id: 1 },
            { text: "demo1", number: 4, id: 2 },
            { text: "demo2", number: 5, id: 3 },
        ];
        $scope.remove = function (index) {
            $scope.books.splice(index, 1)
        }
    }
    function ShowController($scope) {
        $scope.text = "text";
        $scope.type.show = true;

        $scope.show_type = function () {
            $scope.type.show = true;
        }
        $scope.hide_type = function () {
            $scope.type.show = false;
        }
    }
    function ClassController($scope) {
        $scope.text = "text";
        $scope.type.c1 = true;
        $scope.type.c2 = false;

        $scope.c1 = function () {
            $scope.type.c1 = true;
            $scope.type.c2 = false;
        }
        $scope.c2 = function () {
            $scope.type.c2 = true;
            $scope.type.c1 = false;
        }
    }
})
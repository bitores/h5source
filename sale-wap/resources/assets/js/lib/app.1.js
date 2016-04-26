//创建核心模块
var myapp = angular.module('myapp', ['ngRoute']);

//创建路由服务
function myappRouteConfig($routeProvider,$location) {
    $routeProvider.
    when('/', { controller: 'Demo', templateUrl: '/index.html' }).
    when('/list', { controller: 'Book', templateUrl: '/list.html' }).
    when('/login', { controller: 'Show', templateUrl: '/login.html' }).
    otherwise({ redirectTo: '/' });
}

//匹配路由到服务模块
myapp.config(myappRouteConfig);


myapp.controller("Demo",function($scope) {
    $scope.demo = { text: "demo" }
});

myapp.controller("Book",function($scope) {
   $scope.books = [
        { text: "demo", number: 1, id: 1 },
        { text: "demo1", number: 4, id: 2 },
        { text: "demo2", number: 5, id: 3 },
    ];
    $scope.remove = function (index) {
        $scope.books.splice(index, 1)
    }
});

myapp.controller("Show",function($scope) {
    $scope.text = "text";
    $scope.type = true;
    $scope.show_type = function () {
        $scope.type = true;
    }
    $scope.hide_type = function () {
        $scope.type = false;
    }
});

myapp.controller("Class",function($scope) {
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
});
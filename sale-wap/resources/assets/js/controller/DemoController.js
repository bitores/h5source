define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd, angular,angular_route,angular_resource) {
    //注释对应控制器作用
    function DemoController($scope) {
        $scope.demo = { text: "demo" }
    };
    
    return DemoController;
});
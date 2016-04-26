define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd, angular,angular_route,angular_resource) {
    //注释对应控制器作用
    function ShowController($scope) {
        $scope.text = "text";
        $scope.type = true;
        $scope.show_type = function () {
            $scope.type = true;
        }
        $scope.hide_type = function () {
            $scope.type = false;
        }
    }
    
    return ShowController;
});
define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd, angular,angular_route,angular_resource) {
    //注释对应控制器作用
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

    return ClassController;
});
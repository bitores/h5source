define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd, angular,angular_route,angular_resource) {
    //注释对应控制器作用
    function BookController($scope){
        $scope.books = [
            { text: "demo", number: 1, id: 1 },
            { text: "demo1", number: 4, id: 2 },
            { text: "demo2", number: 5, id: 3 },
        ];
        $scope.remove = function (index) {
            $scope.books.splice(index, 1)
        }
    }
    
    return BookController;
});
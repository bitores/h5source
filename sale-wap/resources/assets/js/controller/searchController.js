define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd,angular,angular_route,angular_resource
    ) {

    //注释对应控制器作用
    function SearchController($scope){
        $scope.text = "ceshi"
        $scope.list = [
          {
              name:"小张",
              href:"/"
          },
          {
              name:"小王",
              href:"/show"
          },
          {
              name:"小李",
              href:"/book"
          },
          {
              name:"小陈",
              href:"/class"
          },
        ]
    }

    return SearchController;
});
//帮助中心

define(['zepto','angular','angular-route','angular-resource'
], function (nnd,angular,angular_route,angular_resource
) {

    //注释对应控制器作用
    function HelpController($scope,Help){

        //数据静态化处理

        //帮助中心信息
        Help.Gethelp().then(function(data){
            console.log(data);
        },function(data) {
            console.log(data);
        })
    }

    return HelpController;
});
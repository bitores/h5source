//用户中心

define(['zepto','angular','angular-route','angular-resource'
], function (nnd,angular,angular_route,angular_resource
) {

    //用户相关接口封装
    function UserController($scope,Order,User){

        //数据静态化处理

        /*交易 我的订单*/
        Order.Getmyorder().then(function (data) {
                    console.log(data);
                }, function (data) {
                    console.log(data);
                })
        /*交易 创建订单*/
        Order.Addorder().then(function (data) {
                    console.log(data);
                }, function (data) {
                    console.log(data);
                });

     }

    return UserController;
});

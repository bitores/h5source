//车辆

define(['zepto','angular','angular-route','angular-resource'
], function (nnd,angular,angular_route,angular_resource
) {

    //车辆相关接口封装
    function CarController($scope,Car,Product){
        //数据静态化处理

        var car_id=1;
        /* 商品详情页基础信息 */
        Car.Getitembaseinfo(car_id).then(function (data) {
            console.log(data);
        }, function (data) {
            console.log(data);
        });
        /* 商品详情页 轮播图 */
        Car.Getitemplayimg(car_id).then(function (data) {
            console.log(data);
        }, function (data) {
            console.log(data);
        });
        /* 商品详情页 成交记录 */
        Car.Getdeallog().then(function (data) {
            console.log(data);
        }, function (data) {
            console.log(data);
        });

        /* 商品详情页 购买配置 */
        Car.Getitemparam(car_id).then(function (data) {
            console.log(data);
        }, function (data) {
            console.log(data);
        });

        /* 车辆列表 */
        var pid=0;
        Product.Getcargetgory(pid).then(function (data) {
            console.log(data);
        }, function (data) {
            console.log(data);
        });
    }

    return CarController;
});
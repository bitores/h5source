//商品信息

define(['zepto','angular','angular-route','angular-resource'
], function (nnd,angular,angular_route,angular_resource){
    //获取社区

    //http://new_api.kuaiqiangche.cc/common/rate_params 地址
    //自带方法 $get 获取 $save post提交 $query 查询 返回对象是将会是数组
    function Product($resource,$http,$q) {
//商品详情页基础信息
this.Getitembaseinfo= function (car_id) {
    return $http({
        method:'GET',
        url:API_ADDRESS+'/item/base',
        params:{car_id:car_id}
    }).then(function (data) {
        return $q.when(data);
    }, function (data) {
        return $q.reject(data);
    });
}
//商品详情页轮播图
this.Getitemplayimg= function (car_id) {
    return $http({
        method:'GET',
        url:API_ADDRESS+'/item/play_img',
        params:{car_id:car_id}
    }).then(function (data) {
        return $q.when(data);
    }, function (data) {
        return $q.reject(data);

    });
}
//商品详情页   成交记录
this.Getdeallog= function () {
    return $http({
        method:'POST',
        url:API_ADDRESS+'/item/deal_log',
        params:{}
    }).then(function (data) {
        return $q.when(data);
    }, function (data) {
        return $q.reject(data);
    });
}
//商品详情页 购买配置
this.Getitemparam= function (car_id) {
    return $http({
        method:'GET',
        url:API_ADDRESS+'/item/params',
        params:{car_id:car_id}
    }).then(function (data) {
        return $q.when(data);
    }, function (data) {
        return $q.reject(data);
    });
}
    }
    return Product;
});
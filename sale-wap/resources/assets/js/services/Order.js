//订单
define(['zepto','angular','angular-route','angular-resource'
], function (nnd,angular,angular_route,angular_resource){
    //获取订单
    //http://new_api.kuaiqiangche.cc/common/rate_params 地址
    //自带方法 $get 获取 $save post提交 $query 查询 返回对象是将会是数组

    function Order($resource,$http,$q) {
        /*交易 我的订单*/
        this.Getmyorder= function () {
            return  $http({
                method:'GET',
                url:API_ADDRESS+'/order/my',
                params:{}
            }).then(function (data) {
                return $q.when(data);
            }, function (data) {
                return $q.reject(data);
            });
        }
        /*提交订单*/
        this.Addorder= function (car_id,name,id_num,mobile,id_img0,id_img1) {
            return $http({
                method:'POST',
                url:API_ADDRESS+'/order/create',
                params:{car_id:car_id,name:name,id_num:id_num,mobile:mobile,id_img0:id_img0,id_img1:id_img1}
            }).then(function (data) {
                return $q.when(data);
            }, function (data) {
                return $q.reject(data);
            });
        }
    }
    return Order;
});
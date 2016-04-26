// 车辆相关
define(['zepto','angular','angular-route','angular-resource'
], function (nnd,angular,angular_route,angular_resource){
    //获取社区

    //http://new_api.kuaiqiangche.cc/common/rate_params 地址
    //自带方法 $get 获取 $save post提交 $query 查询 返回对象是将会是数组

    function Car($resource,$http,$q) {
        //车辆列表
        this.Getcargetgory= function (pid) {
            return $http({
                method:'GET',
                url:API_ADDRESS+'/car/category',
                params:{pid:pid}
            }).then(function (data) {
                return $q.when(data);
            }, function (data) {
                return $q.reject(data);
            });
        }
    }
    return Car;
});
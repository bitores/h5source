define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd, angular,angular_route,angular_resource) {
    //获取车辆列表服务
    
    //http://new_api.kuaiqiangche.cc/common/rate_params 地址
    //自带方法 $get 获取 $save post提交 $query 查询 返回对象是将会是数组
    function DEMO($resource,$http,$q) {
        var _this = this;
        this.Getparamsdata = {};
        this.Getparams = function (id) {
            var deferred = $q.defer();
            return $http({
                method:'GET',
                url:API_ADDRESS + 'common/rate_params',
                data:{id:id}
            }).then(function(data) {
                this.Getparamsdata = data;
                return $q.when(data);
            },function(data) {
                return $q.reject(data);
            });
        }
        this.Getparams = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET',
                url:API_ADDRESS + 'common/rate_params',
                data:{id:0}
            }).then(function(data) {
                this.Getparamsdata = data;
                return $q.when(data);
            },function(data) {
                return $q.reject(data);
            });
        }
    }
    
    return DEMO;
});
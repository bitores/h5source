//帮助
define(['zepto','angular','angular-route','angular-resource'
], function (nnd, angular,angular_route,angular_resource) {
    //获取帮助

    //http://new_api.kuaiqiangche.cc/common/rate_params 地址
    //自带方法 $get 获取 $save post提交 $query 查询 返回对象是将会是数组
    function Help($resource,$http,$q) {
        var _this = this;
        this.Getparamsdata = {};
        this.Gethelp = function () {
            var deferred = $q.defer();
            return $http({
                method: 'GET',
                url: API_ADDRESS + '/help/index',
                params: {}
            }).then(function (params) {
                this.Getparamsdata = params;
                return $q.when(params);
            }, function (params) {
                return $q.reject(params);
            });
        }
    }

    return Help;
});
//社区相关
define(['zepto','angular','angular-route','angular-resource'
], function (nnd,angular,angular_route,angular_resource){
    //获取社区

    //http://new_api.kuaiqiangche.cc/common/rate_params 地址
    //自带方法 $get 获取 $save post提交 $query 查询 返回对象是将会是数组

    function Community($resource,$http,$q) {
        var _this = this;
        //this.Getparamsdata = {};
        //文章相关
        this.Getcategory = function (num) {
            var deferred = $q.defer();
            return $http({
                method: 'GET',
                url: API_ADDRESS + '/article/category',
                params: {num:num}
            }).then(function (data) {
                this.Getparamsdata = data;
                return $q.when(data);
            }, function (data) {
                return $q.reject(data);
            });
        }
        //文章列表
        this.Gettable= function (num) {
            return $http({
                method:'GET',
                url:API_ADDRESS+'/article/table',
                params:{num:num},
            }).then(function (data) {
                //this.Getparamsdata=data;
                return $q.when(data)
            }, function (data) {
                return $q.reject(data);
            });
        }
        //文章详情页
        this.Getdetail= function (id) {
            console.log(id);
            return $http({
                method:'GET',
                url:API_ADDRESS+'/article/detail',
                params:{id:id},
            }).then(function (data) {
                return $q.when(data);
            }, function (data) {
                return $q.reject(data);
            });
        }
    }
    return Community;
});
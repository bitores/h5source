//首页
define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd, angular,angular_route,angular_resource) {

	function Index($resource,$http,$q) {
        var _this = this;
        //banner
        this.Getbanner = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET', 
                url:API_ADDRESS + 'index/banner',
                cache: true,
                responseType: JSON,
                params:{
                	type: "wap"
                }
            }).then(function(params) {
                return $q.when(params);
            },function(params) {
                return $q.reject(params);
            });
        }
        //热门车型
        this.GethotCar = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET', 
                url:API_ADDRESS + 'index/hot_car',
                cache: true,
                responseType: JSON,
                params:{
                	num: 10
                }
            }).then(function(params) {
                return $q.when(params);
            },function(params) {
                return $q.reject(params);
            });
        }
        //热门品牌
        this.GethotBrand = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET', 
                url:API_ADDRESS + 'index/hot_brand',
                cache: true,
                responseType: JSON,
                params:{
                	num: 10
                }
            }).then(function(params) {
                return $q.when(params);
            },function(params) {
                return $q.reject(params);
            });
        }//车友社区列表
        this.GethotBbs = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET', 
                url:API_ADDRESS + 'index/car_bbs',
                cache: true,
                responseType: JSON,
                params:{
                	num: 10
                }
            }).then(function(params) {
                return $q.when(params);
            },function(params) {
                return $q.reject(params);
            });
        }
	
	}
	
	return Index;
});
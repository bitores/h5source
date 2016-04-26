//用户中心
define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd, angular,angular_route,angular_resource) {

	function User($resource,$http,$q) {
        var _this = this;
        //登录
        this.GetuserLogin = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET', 
                url:API_ADDRESS + 'user/mobile_login',
                cache: true,
                responseType: JSON,
                params:{
                	mobile: 18267125322,
                	verify_code: 188509
                }
            }).then(function(params) {
                return $q.when(params);
            },function(params) {
                return $q.reject(params);
            });
        }
        //注销
        this.Getlogout = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET', 
                url:API_ADDRESS + 'user/logout',
                cache: true,
                responseType: JSON,
                params:{
                	access_token: "1sdam1adfa124nads"
                }
            }).then(function(params) {
                return $q.when(params);
            },function(params) {
                return $q.reject(params);
            });
        }
        //用户注册协议
        this.Getagreement = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET', 
                url:API_ADDRESS + 'user/agreement',
                cache: true,
                responseType: JSON,
                params:{ }
            }).then(function(params) {
                return $q.when(params);
            },function(params) {
                return $q.reject(params);
            });
        }
    }
	
	return User;
	
});
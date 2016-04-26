// 基础接口
define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd, angular,angular_route,angular_resource) {

	function Common($resource,$http,$q) {
        var _this = this;
        //猜你喜欢
        this.GetuserLike = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET', 
                url:API_ADDRESS + 'common/power_push',
                cache: true,
                responseType: JSON,
                params:{num:10}
            }).then(function(params) {
                return $q.when(params);
            },function(params) {
                return $q.reject(params);
            });
        }
        //费率计算
        this.GetrateParams = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET', 
                url:API_ADDRESS + 'common/rate_params',
				cache: true,
				responseType: JSON,
                params:{
                	price: 10000,
                	dpm: 2.1,
                	car_id: 10
                }
            }).then(function(params) {
                return $q.when(params);
            },function(params) {
                return $q.reject(params);
            });
        }
        //短信发送
        this.GetsmsSend = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET', 
                url:API_ADDRESS + 'common/mobile_sms_send',
                cache: true,
                responseType: JSON,
                params:{
                	mobile: 18267125322
                }
            }).then(function(params) {
                return $q.when(params);
            },function(params) {
                return $q.reject(params);
            });
        }
        //首页搜索
        this.Getsearch = function () {
            var deferred = $q.defer();
            return $http({
                method:'GET', 
                url:API_ADDRESS + 'common/search',
                cache: true,
                responseType: JSON,
                params:{
                	keyword: "马自达",
                	num: 10
                }
            }).then(function(params) {
                return $q.when(params);
            },function(params) {
                return $q.reject(params);
            });
        }
        //统计信息
        this.Getcountinfo= function (source,path,user_agent,channel,client_type,access_token) {
            return $http({
                method:'GET',
                url:API_ADDRESS+'/channel/count_info',
                params:{source:source,path:path,user_agent:user_agent,client_type:client_type,access_token:access_token}
            }).then(function (data) {
                return $q.when(data);
            }, function (data) {
                return $q.reject(data);
            });
        }
    }
	
	return Common;
	
});
define(['angular'],function(angular){
// angularJs提供四种拦截器，
// 其中两种成功拦截器（request、response），
// 两种失败拦截器（requestError、responseError）。

// request 方法 接收请求配置对象(request configuration object)作为参数
// request 方法 必须返回配置对象或者 promise 
// response 方法 接收响应对象(response object)作为参数
// response 方法 必须返回响应对象或者 promise 

// 响应对象包括了请求配置(request configuration)，头(headers)，状态(status)和从后台过来的数据(data)


// 拦截器来测一下从后台返回响应需要多少时间。
// 可以通过给每个请求和响应加上时间

// 1、 定义拦截器

// 2、注册拦截器
// module.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.interceptors.push('timestampMarker');
// }]);
// 3、然后我们可以这样:

// $http.get('https://api.github.com/users/naorye/repos').then(function(response) {
//     var time = response.config.responseTimestamp - response.config.requestTimestamp;
//     console.log('The request took ' + (time / 1000) + ' seconds.');
// });
    return function ($q, $injector){

        return {
            // 时间戳(请求和响应拦截器)
            request:function(config){
                // config.requestTimestamp 请求开始时间戳
                console.log("--------loading----------");
                config.requestTimestamp = new Date().getTime();
                return config;

                // var deferred = $q.defer();
                // someAsyncService.doAsyncOperation().then(function(){
                //     // ...
                //     deferred.resolve(config);
                // }, function(){
                //     // ...
                //     deferred.resolve(config);
                // })
                // return deferred.promise;
            },
            // 请求恢复 (请求异常拦截)
            requestError: function(rejectReason){
                console.log("--------loading  request error------");
                if (rejectReason === 'requestRejector') {
                    // Recover the request
                    return {
                        transformRequest: [],
                        transformResponse: [],
                        method: 'GET',
                        url: 'https://api.github.com/users/naorye/repos',
                        headers: {
                            Accept: 'application/json, text/plain, */*'
                        }
                    };
                } else {
                    return $q.reject(rejectReason);
                }
            },
            responce:function(responce){
                console.log("--------loading  response------");
                // response.config.responseTimestamp 请求响应时间戳
                response.config.responseTimestamp = new Date().getTime();
                var time = response.config.responseTimestamp - response.config.requestTimestamp;
                console.log('The request took ' + (time / 1000) + ' seconds.');
                return response;
            },
            
            responceError: function(responce){
                console.log("--------loading  request error------");
                 response.config.responseTimestamp = new Date().getTime();
                var time = response.config.responseTimestamp - response.config.requestTimestamp;
                console.log('The request took ' + (time / 1000) + ' seconds.');
                if (response.status == 419){ // 拦截419
                    //如果Session过期
                    //Session 恢复 (响应异常拦截器)
                    // var SessionService = $injector.get('SessionService');
                    var $http = $injector.get('$http');
                    var deferred = $q.defer();

                    // Create a new session (recover the session)
                    // We use login method that logs the user in using the current credentials and
                    // returns a promise
                    // SessionService.login().then(deferred.resolve, deferred.reject);

                    // When the session recovered, make the same backend call again and chain the request
                    return deferred.promise.then(function() {
                        return $http(response.config);
                    });
                } else if (response.status == 401) { // 拦截401

                  var rootScope = $injector.get('$rootScope'); 
                  var state = $injector.get('$rootScope').$state.current.name; 
                  rootScope.stateBeforLogin = state; 
                  rootScope.$state.go("login"); 
                  return $q.reject(response); 
                } else if (response.status === 404) { // 拦截404
                    console.log('loading:',404);
                  return $q.reject(response); 
                } 
            }
        }

    }

	
})
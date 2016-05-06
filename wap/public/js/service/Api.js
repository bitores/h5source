define(['angular'],function(angular){
	return function($http, $q){

		this.post = function(data){
			return $http({
				'method':"POST",
				'url':API_ADDRESS,
				'data':data
			}).then(function(res){
				//success
				$q.resolve(res);
			},function(res){
				// reject
				$q.reject(res);
			},function(res){
				// error
				$q.error(res);
			})
		}

		this.get = function(){
			return $http({
				'method':"GET",
				'url':API_ADDRESS,
				'data':data
			}).then(function(res){
				//success
				$q.resolve(res);
			},function(res){
				// reject
				$q.reject(res);
			},function(res){
				// error
				$q.error(res);
			})
		}
		
	}
});
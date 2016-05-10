define(['angular'],function(angular){

	function Api($http,$q){

		this.post = function(url,data){
			return $http({
				'method':'POST',
				'url':API_ADDRESS+'/'+url,
				'data':data
			}).then(function(res){
				return $q.when(res.data);
			},function(res){
				return $q.reject(res.data);
			},function(){
				return false
			})
		}

		this.get = function(url){
			return $http({
				'method':'GET',
				'url':API_ADDRESS+'/'+url
			}).then(function(res){
				return $q.when(res.data);
			},function(res){
				return $q.reject(res.data);
			},function(){
				return false
			})
		}
	}

	return Api;	
})
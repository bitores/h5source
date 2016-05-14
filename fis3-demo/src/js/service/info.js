define(['angular'],function(angular){
	return function($http,$q){

		this.getInfo = function(){
			return $http({
				'method':'GET',
				'url':'http://new_api.kuaiqiangche.cc/car/category'
			}).then(function(data){
				//
				console.log('success1',data);
				return $q.when(data);
			},function(data){
				//
				console.log('success2');
				return $q.reject(data);
			},function(){
				//
				console.log('success3');
				return false
			})
		}
		
	}
	
})
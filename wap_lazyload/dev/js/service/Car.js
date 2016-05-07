define(['angular'],function(angular){
	return function($http,Api){

		this.test = function(data){
			return Api.get(data);
		}
	}
});
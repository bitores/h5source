define(['app','Api'],function(app){
	app.service("Car",function($http,Api){

		this.test = function(data){
			return Api.get(data);
		}
	})
});
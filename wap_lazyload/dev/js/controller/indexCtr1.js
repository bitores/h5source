define(['app',"Car","Log"],function(app){

	app.controller("indexCtr1",function($scope, $http,Car,Log){
		Log.show('加载首页');
		$scope.title="加载首页";
		Car.test({}).then(function(res){
			console.log('Api post  .. Car post');
		});
	}); 
})
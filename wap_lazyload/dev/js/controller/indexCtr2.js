define(['app','Car','Log'],function(app){
	app.controller("indexCtr2",function($scope, $http, Log, Car){
		Log.show('加载第二页');
		$scope.title="加载第二页";
		Car.test({}).then(function(res){
			console.log('Api post  .. Car post');
		});
	}); 
})
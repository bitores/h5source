define(['app','Log'],function(app){
	app.controller("indexCtr2",function($scope, $http, Log){
		Log.show('加载第二页');
		$scope.title="加载第二页";
	}); 
})
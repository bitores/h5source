define(['angular'],function(angular){
	return function($scope, $http, Log, Car){
		Log.show('加载首页');
		Car.test({}).then(function(res){
				console.log('Api post  .. Car post');
			});
	}
})
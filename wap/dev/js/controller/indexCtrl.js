define(['angular'],function(angular){
	return function($scope, $http, Log, Data){
		Log.show('加载首页');

		Data.getBrandList().then(function(res){
			console.log('Api post  .. Car post');
		},function(res){
			console.log(res);
		});
	}
})
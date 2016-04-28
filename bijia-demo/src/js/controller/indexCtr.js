define(['angular','info'],function(angular,info){
	// 要在之前绑定 info 才可以
	return function($scope,info){
		$scope.tile = "2313.1234Hello indexCtrl"
		console.log($scope.tile);
	}
})
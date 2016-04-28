define(['angular'],function(angular){
	// 要在之前绑定 info 才可以
	return function($scope,info){
		$scope.tile = "2313.1234Hello indexCtrl"
		$scope.title="...........";
		$scope.newFunc = function(){
			console.log("new Func...");
		}
		console.log($scope.tile);
		info.getInfo().then(function(){
			console.log('indexCtrl...info1');
		},function(){
			console.log('indexCtrl...info2');
		})
	}
})
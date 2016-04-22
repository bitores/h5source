(function(){
	isLogin();
	App.controller("Ctrl",function($scope, $http){
		$scope.flag_desc = localStorage.kqc_aftersale_flag_desc;
		$scope.flag_time = localStorage.kqc_aftersale_flag_time;
	});
})();

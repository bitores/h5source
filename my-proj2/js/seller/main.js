(function(){
	
	App.controller("Ctrl",function($scope, $http){
		
		$scope.defaultimg = defaultimg;
		
		$http_post($http,{
			uri : 'bijia_shopuser.get_my_shopuser',
            param : {
				'sale_id' : localStorage.kqc_cursale_id
            }
		}).success(function(res){
			if(0 == res.code) {
				$scope.data = res.data;
				$scope.pinglun = res.data.broke_comment;
//				$scope.len = res.data.broke_comment.length();

				if(getQueryString("done")){
					$scope.done = true;
				}else{
					$scope.done = false;
				}
			} else {
				Log.show(res.msg);
			}
		});
		
		
//		$scope.lazybind = function(){
//			$("img.lazy").lazyload();
//		}
		

	});
})();

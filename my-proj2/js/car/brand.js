(function(){
	App.controller("Ctrl",function($scope, $http){
		$http_post($http, {
			uri: "bijia_product.getProductByType",
			param: {
				type:0
			}
		})
		.success(function(res) {
			try{
				if(0 == res.code){
					$scope.recommend = res.data.recommend;
					$scope.default = res.data.default;
					if($scope.recommend.length > 0){
						$(".hot").show();
					}
					
					if($scope.default.length > 0){
						$(".default").show();
					}
					
				}else{
					Log.show(res.msg);
				}
				
			}catch(e){
				Log.show("ERROR");
			}
			
			$scope.lazybind = function(){
				$("img.lazy").lazyload();
			}
			
			$scope.onclick = function(brandid,brandname){
				localStorage.kqc_carbrand_id = brandid;
				localStorage.kqc_carbrand_name = brandname;
				location.href=$car_type+'?bd='+brandid;
			}
			
		});
	});
})();

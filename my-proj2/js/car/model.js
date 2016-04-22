(function(){
	App.controller("Ctrl",function($scope, $http){
		var td = getQueryString('td');
		if(!!td){
			$scope.cartypeid = td;
			localStorage.kqc_cartype_id = td;
		} else {
			$scope.cartypeid = localStorage.kqc_cartype_id;
		}
		var bd = getQueryString('bd');
		if(!!bd){
			localStorage.kqc_carbrand_id = bd;
		}
		
		$http_post($http, {
			uri: "bijia_product.getProductByType",
			param: {
				id:$scope.cartypeid,
				type:2
			}
		}).success(function(res) {
			if(0 == res.code){
				$scope.default = res.data.default;
				$scope.cartypename = res.data.top_info.name;
				$scope.cartypeimg = res.data.top_info.img;
				$scope.cartypeprice = res.data.top_info.price;

				localStorage.kqc_cartype_name = $scope.cartypename;
				localStorage.kqc_cartype_img = $scope.cartypeimg;
				localStorage.kqc_cartype_price = $scope.cartypeprice;
			}else{
				Log.show(res.msg);
			}
			
			$scope.lazybind = function(){
				$("img.lazy").lazyload();
			}
			
			$scope.onclick = function(carmodelid,carmodelconfig,carmodelname,carmodelprice){
				localStorage.kqc_carmodel_id = carmodelid;
				localStorage.kqc_carmodel_config = carmodelconfig;
				localStorage.kqc_carmodel_name = carmodelname;
				localStorage.kqc_carmodel_price = carmodelprice;
				
				location.href = $car_otherinfo;
			}
		});
	});
})();

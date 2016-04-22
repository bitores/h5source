(function(){
	App.controller("Ctrl",function($scope, $http){
		try{
			var bd = getQueryString('bd');
			if(!!bd){
				$scope.carbrandid = bd;
				localStorage.kqc_carbrand_id = bd;
			} else {
				$scope.carbrandid = localStorage.kqc_carbrand_id;
			}
		}catch(e){
			Log.show(e.message);
		}
		function isNullObj(obj){
		    for(var i in obj){
		        if(obj.hasOwnProperty(i)){
		            return false;
		        }
		    }
		    return true;
		}
		$http_post($http, {
			uri: "bijia_product.getProductByType",
			param: {
				id:$scope.carbrandid,
				brand:localStorage.kqc_carbrand_name,
				type:1
			}
		}).success(function(res) {
			if(0 == res.code){
				$scope.recommend = res.data.recommend;
				$scope.default = res.data.default;
				if($scope.recommend.length > 0) {
					$('.hot').show();
				}
				
				if(!isNullObj($scope.default)) {
					$('.list').show();
				}
				
			}else{
				Log.show(res.msg);
			}
			
			if(!!localStorage.kqc_carbrand_name){
				$scope.carbrandname = localStorage.kqc_carbrand_name;
			}
			
			$scope.lazybind = function(){
				$(".lazy").lazyload();
			}

			$scope.onclick = function(cartypeid,cartypename,cartypeimg,cartypeprice){
				localStorage.kqc_cartype_id = cartypeid;
				localStorage.kqc_cartype_name = cartypename;
				localStorage.kqc_cartype_img = cartypeimg;
				localStorage.kqc_cartype_price = !!cartypeprice ? cartypeprice : "";
				location.href = $car_model + '?td='+cartypeid+"&bd="+$scope.carbrandid;
			}
		});
	});
})();

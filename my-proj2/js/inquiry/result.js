(function(){
	isLogin();
	App.controller("Ctrl",function($scope, $http){
		var str = getQueryString('str');
		if(!!str){
			
			$http_post($http, {
				uri: "bijia_product.quoteList",
				param: {
					"str": str
				}
			}).success(function(res) {
	
				if(0 == res.code){
						// 记录颜色 、车型、车款
						var names = res.data.info.name.split(',');
						localStorage.kqc_cartype_name = names[0];
						localStorage.kqc_carmodel_name = names[1];
						localStorage.kqc_carcolor_name =  res.data.info.colorName;
						localStorage.kqc_carcolor_code = res.data.info.colorCode;
						localStorage.kqc_carbuying_way = res.data.info.payType;
						localStorage.kqc_cartype_img = res.data.info.img;
						
						localStorage.kqc_curinquiry_id = localStorage.kqc_inquiryId;
						localStorage.kqc_curpaytype = res.data.info.payType=="全款"?'1':'0';
						
						localStorage.kqc_curcar_name  = res.data.info.name;
	//					localStorage.kqc_curcar_config  = localStorage.kqc_carmodel_config;
				
				
						$scope.cartypename = localStorage.kqc_cartype_name;
						$scope.cartypeimg = localStorage.kqc_cartype_img;
						$scope.carmodelid = localStorage.kqc_carmodel_id;
	//					$scope.carmodelconfig = localStorage.kqc_carmodel_config;
						$scope.carmodelname = localStorage.kqc_carmodel_name;
						$scope.carmodelminprice = localStorage.kqc_carmodel_minprice;
						$scope.carcolorname = localStorage.kqc_carcolor_name;
						$scope.carcolorcode = localStorage.kqc_carcolor_code;
						$scope.carbuyingway = localStorage.kqc_carbuying_way;
						
						$scope.inquirylist = res.data.list;
				}else{
					Log.show("异常code:"+res.code);
				}
			})
			
		} else {
			
			try{
				$scope.cartypename = localStorage.kqc_cartype_name;
				$scope.cartypeimg = localStorage.kqc_cartype_img;
				$scope.carmodelid = localStorage.kqc_carmodel_id;
	//			$scope.carmodelconfig = localStorage.kqc_carmodel_config;
				$scope.carmodelname = localStorage.kqc_carmodel_name;
				$scope.carmodelminprice = localStorage.kqc_carmodel_minprice;
				$scope.carcolorname = localStorage.kqc_carcolor_name;
				$scope.carcolorcode = localStorage.kqc_carcolor_code;
				$scope.carbuyingway = localStorage.kqc_carbuying_way;
				
				localStorage.kqc_curcar_name  = $scope.cartypename + ' ' + $scope.carmodelname;
	//			localStorage.kqc_curcar_config  = $scope.carmodelconfig;
				
				if(localStorage.inquiry_list){
					$scope.inquirylist = JSON.parse(localStorage.inquiry_list);
					$scope.len = $scope.inquirylist.length;
				}
			}catch(e){
				Log.show(e.message);
			}
		}
		
		$scope.goto_xkkj = function(){
			location.href = $help_index;
		}
		
		$scope.lazybind = function(){
			$("img.lazy").lazyload();
		}
		
		$scope.selli = function($event,agid,id,cid,ext){
			localStorage.kqc_cursale_id = agid	//销售员id
			localStorage.kqc_curbid = id;			//报价id
			localStorage.kqc_curcar_id = cid;
			localStorage.kqc_curorder_ext = ext;
	
			location.href = $seller_offer;
		}
	});
})();

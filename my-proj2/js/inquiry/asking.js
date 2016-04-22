(function(){
	App.controller("Ctrl",function($scope, $http){
		try{
			$scope.inquiryId = localStorage.kqc_inquiryId;
			$scope.cartypename = localStorage.kqc_cartype_name;
			$scope.cartypeimg = localStorage.kqc_cartype_img;
			$scope.carmodelid = localStorage.kqc_carmodel_id;
			$scope.carmodelconfig = localStorage.kqc_carmodel_config;
			$scope.carmodelname = localStorage.kqc_carmodel_name;
			$scope.carmodelminprice = localStorage.kqc_carmodel_minprice;
			$scope.carcolorname = localStorage.kqc_carcolor_name;
			$scope.carcolorcode = localStorage.kqc_carcolor_code;
			$scope.carbuyingway = localStorage.kqc_carbuying_way;
		}catch(e){
			Log.show(e.message);
		}
		
		$scope.goto_brand = function(){
			location.href = $car_brand;
		}
		
		localStorage.kqc_curinquiry_id = localStorage.kqc_inquiryId;
		$http_post($http, {
			uri: "bijia_product.quoteList",
			param: {
				"inquiryId":localStorage.kqc_inquiryId, // 询价需求id62||
				"colorCode":localStorage.kqc_carcolor_code, // 询价color code
                "carId": localStorage.kqc_car_id      // 车辆id50||
			}
		}).success(function(res) {
			switch(res.code){
				case 0:{
					var speed = 10000;
					var cur = 0;
					var timer = setInterval(function(){
						$($(".man_img span")[cur]).css('visibility','visible');		
						cur++;
					},speed/9);
					setTimeout(function(){
						clearInterval(timer);
						if(res.data.count>0){
							localStorage.inquiry_list = JSON.stringify(res.data.list);
							location.href = $inquiry_result;
						} else {
							$('body').css('background-color','white');
							$('.content').hide();
							$scope.count = parseInt(Math.random() * 6 + 5);//5-10
							$scope.$apply();
							$(".ret").show();
						}
					},speed);
				}
				break;
				case 1:{
					Log.show(res.msg);
				}
				break;
			}
		});
	});
})();

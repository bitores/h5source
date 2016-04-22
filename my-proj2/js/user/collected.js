(function(){
	
	App.controller("Ctrl",function($scope, $http){
		$scope.list = [];
		$scope.listlen = $scope.list.length;
		if($scope.listlen === 0) {
			$scope.show = true;
			$scope.white = {
				'background-color':'white'
			}
		}
		function getList() {
			$http_post($http,{
				"uri": "bijia_product.collection", // 接口名称
				"param":{
					"page": 1,
					"limit": 10
				}
			}).success(function(res){
				$scope.list = res.data;
				$scope.listlen = $scope.list.length;
				
				if(0 == res.code && $scope.listlen>0){
					$scope.show = false;
					$(".carlist").show();
					$scope.white = {
	    				'background-color':''
	    			}
				} else {
					$scope.show = true;
					$(".ret").show();
					$scope.white = {'background-color':'white'}
				}
			});
		}
		
		getList();
		
//		$('.carlist').on('click','ul',function(e){
//			return true;
//			
//		});
		
		$scope.goto_bidList = function(expire,inquiryid, carid, colorcode,colorname,paytype, brand, modelname,imgsrc){
			if( expire <= 0){
				Log.show("比价已过期");
				return;
			}
			
			localStorage.kqc_inquiryId = ''+inquiryid;
			localStorage.kqc_car_id = carid;
			localStorage.kqc_carcolor_code = colorcode;
//			$scope.$li = $(this);
			$http_post($http, {
				uri: "bijia_product.quoteList",
				param: {
					"inquiryId":localStorage.kqc_inquiryId, // 询价需求id
					"colorCode":localStorage.kqc_carcolor_code, // 询价color code
	                "carId": localStorage.kqc_car_id      // 车辆id
				}
			}).success(function(res) {
	
				if(0 == res.code){
					if(res.data.count>0){
						// 记录颜色 、车型、车款
						localStorage.kqc_curinquiry_id = localStorage.kqc_inquiryId;
						localStorage.kqc_curpaytype = paytype=="全款"?'1':'0';
						
						localStorage.kqc_cartype_name = brand ;
//						localStorage.kqc_carmodel_config = $scope.$li.find('.sm').text();
						localStorage.kqc_carmodel_name = modelname ;
						localStorage.kqc_carcolor_name =  colorname;
						localStorage.kqc_carcolor_code = colorcode;
						localStorage.kqc_carbuying_way = paytype;
						localStorage.kqc_cartype_img = imgsrc;
						
						localStorage.inquiry_list = JSON.stringify(res.data.list);
						location.href = $inquiry_result;
					}else{
						Log.show("暂无报价");
					}
				}else{
					Log.show("异常code:"+res.code);
				}
			})
		}
		
		$scope.del = function(carid,e){
			e.stopPropagation();
			$scope.delli = $(e.target).parents('ul');
			$scope.delid = carid;
//			$('.carlist').attr('data-delid',carid);
			
			$('.mask').show();
		}
		
		$scope.goto_brand = function(){
			location.href = $car_brand;
		}
		
		$('.ok').on('click',function(){
			
			// del options
			$http_post($http,{
		      	"uri": "bijia_product.collectionDel", // 接口名称
		      	"param":{
		      		"id":$scope.delid // 车辆id
		      	}    
		    }).success(function(res){
		    	if(0 == res.code){
					Log.show("删除成功");
					
					$scope.delli.hide();
					$scope.listlen--;
					if($scope.listlen == 0){
						
						getList();
					}
				} else {
					Log.show("删除失败 ");
				}
		    });
			
			$scope.$apply();
			$('.mask').hide();
		});
		$('.cancel').on('click',function(){
			$('.mask').hide();
		});
	});
})();

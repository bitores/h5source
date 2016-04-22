(function(){
	
	App.controller("Ctrl",function($scope, $http){
		
	/*
	 * 处理支付完成状态 - search不为空时表示由支付成功返回页面
	 * 
	 * param url
	 * param name
	 * 
	 */
	if(getQueryString("state")){
		// 支付完成时调用接口，取得电话号码
		$http_post($http,{
			"uri": "bijia_order.contact", // 接口名称
	      	"param":{
	      		'order': localStorage.kqc_cursn_id, // 订单id
	            'agent': localStorage.kqc_cursale_id// 销售人员id
	      	}   
		}).success(function(res){
			if(0 == res.code) {
				// 已支付
				location.search="";
				location.href = 'tel:'+res.data.tel;
			} else {
				// 异常情况
				Log.show(res.msg+" code:" + res.code);
			}
		});
		
		
	}
		
		$http_post($http,{
	      	"uri": "bijia_order.orderList", // 接口名称
	    }).success(function(res){

	    	if('0' == res.code) {
	    		$scope.orderlist = res.data;
	    		if($scope.orderlist.length==0){
	    			$scope.white = {
	    				'background-color':'white'
	    			}
	    			$('.ret').show();
	    		} else {
	    			$(".box").show();
	    		}
	    	} else {
	    		Log.show(res.msg);
	    	}
	    });
	    
	    // 订单详情
	    $('.box').on('click','ul',function(){
	    	
	    	if($(this).attr('data-agentid')){
	    		localStorage.kqc_curbid = $(this).attr('data-bid');
	    		localStorage.kqc_cursale_tel = $(this).attr('data-tel');
		    	localStorage.kqc_curorder_id = $(this).attr('data-orderid');// 订单id
		    	localStorage.kqc_curinquiry_id = $(this).attr('data-inquiryId'); // 需求id
		        localStorage.kqc_cursale_id = $(this).attr('data-agentid');// 销售人员id
		        localStorage.kqc_curorder_ext = $(this).attr('data-ext');  // 报价列表页附加参数，详见6.
				localStorage.kqc_curcar_name  = $(this).attr('data-name');
				localStorage.kqc_curcar_config  = $(this).attr('data-config');
					
		    	location.href = $seller_offer + "?tel="+localStorage.kqc_cursale_tel;// 传入电话号码
	    	} else {
	    		Log.show('不能为空');
	    	}
	    	
	    	
	    });
	    
	    // 直接打电话
		$scope.callme = function(tel,e){
			e.stopPropagation();
			location.href = "tel:" + tel;
		}
		
		$scope.goto_brand = function(){
			location.href = $car_brand;
		}
		
		// 申请售后、售后中，评论、已评论
		$scope.handle = function(e){
			var $this = $(e.target);
			e.stopPropagation();
			var ind = $this.attr('data-btn');
			var $ul = $this.parents('ul');
			localStorage.kqc_cursale_id = $ul.attr('data-agentid');// 销售人员id
			localStorage.kqc_curorder_id = $ul.attr('data-orderid');
			localStorage.kqc_curbid = $ul.attr('data-bid');
			switch(parseInt(ind)){
				case 0:{

					location.href = $user_aftersale;
				}
				break;
				case 1:{
					
					Log.show('您的售后申请正在处理');
				}
				break;
				case 2:{
//					localStorage.kqc_curcar_id = $ul.attr('data-carid');// 车辆id
					localStorage.kqc_curshop_name = $ul.find('.shopname').text();
					localStorage.kqc_cursale_name = $ul.find('.salename').text();
					localStorage.kqc_curcar_name  = $ul.find('.brand').text();
					localStorage.kqc_curcar_config  = $ul.find('.name').text();

					location.href = $seller_evaluate;
				}
				break;
				case 3:{
					
					localStorage.kqc_curbid = $ul.attr('data-bid');
		    		localStorage.kqc_cursale_tel = $ul.find('.frt').text();
			    	localStorage.kqc_curorder_id = $ul.attr('data-orderid');// 订单id
			    	localStorage.kqc_curinquiry_id = $ul.attr('data-inquiryId'); // 需求id
	//		        localStorage.kqc_curcar_id = $ul.attr('data-carid');// 车辆id
			        localStorage.kqc_cursale_id = $ul.attr('data-agentid');// 销售人员id
			        localStorage.kqc_curorder_ext = $ul.attr('data-ext');  // 报价列表页附加参数，详见6.
					localStorage.kqc_curcar_name  = $ul.find('.bt').text();
					localStorage.kqc_curcar_config  = $ul.find('.sm').text();
					location.href = $seller_main+"?done=true";
//					Log.show('您已评价');
				}
				break;
			}
			
		}
//		$('.box').on('click','.btn',function(e){
//			e.stopPropagation();
//			var ind = $(this).attr('data-btn');
//			var $ul = $(this).parents('ul');
//			localStorage.kqc_cursale_id = $ul.attr('data-agentid');// 销售人员id
//			localStorage.kqc_curorder_id = $ul.attr('data-orderid');
//			localStorage.kqc_curbid = $ul.attr('data-bid');
//			switch(parseInt(ind)){
//				case 0:{
//
//					location.href = $user_aftersale;
//				}
//				break;
//				case 1:{
//					
//					Log.show('您的售后申请正在处理');
//				}
//				break;
//				case 2:{
//					localStorage.kqc_curcar_id = $ul.attr('data-carid');// 车辆id
//					localStorage.kqc_curshop_name = $ul.find('.shopname').text();
//					localStorage.kqc_cursale_name = $ul.find('.salename').text();
//					localStorage.kqc_curcar_name  = $ul.find('.bt').text();
//					localStorage.kqc_curcar_config  = $ul.find('.sm').text();
//
//					location.href = $seller_evaluate;
//				}
//				break;
//				case 3:{
//					Log.show('您已评价');
//				}
//				break;
//			}
//			
//		});
	});
})();

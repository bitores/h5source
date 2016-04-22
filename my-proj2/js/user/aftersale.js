(function(){
	isLogin();
	App.controller("Ctrl",function($scope, $http){
		localStorage.kqc_aftersale_flag = "报价不实";
		localStorage.kqc_aftersale_desc = "4S店报价与实际咨询相差太大";
		$('ul').on('click','li',function(){
			$(this).siblings().removeClass('seld');
			$(this).addClass('seld');
			$('.list').attr('data-id',$(this).attr('data-id'));
			
			localStorage.kqc_aftersale_flag = $(this).find('.bt').text();
			localStorage.kqc_aftersale_desc = $(this).find('.sm').text();
		});
		
		$('.btn').on('click',function(){
			
			$http_post($http,{
		        "uri": "bijia_product.serviceSave", // 接口名称
		        "param":{
		      		'id': localStorage.kqc_curorder_id, // 订单id
		            'flag': $('.list').attr('data-id')// 售后反馈id:1-不想买了；2-服务问题；3-报价不实
		        }     
		    }).success(function(res){
		    	
		    	if('0' == res.code) {
		    		
		    		localStorage.kqc_aftersale_flag_time = res.data.time;
		    		localStorage.kqc_aftersale_flag_desc = localStorage.kqc_aftersale_flag +" : "+ localStorage.kqc_aftersale_desc;
		    		location.href = $user_aftersaling;
		    	} else {
		    		Log.show(res.msg);
		    	}
		    });
			
			
			
		});
	});
})();

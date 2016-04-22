(function(){
	
	App.controller("Ctrl",function($scope, $http){
		try{
			$scope.salename = localStorage.kqc_cursale_name;
			$scope.shopname = localStorage.kqc_curshop_name;
			$scope.config = localStorage.kqc_curcar_config;
			$scope.name = localStorage.kqc_curcar_name;
		}catch(e){
			
		}
				
		$http_post($http,{
			"uri": "bijia_product.getScore", // 接口名称
  			"param":{
  				agent:localStorage.kqc_cursale_id // 商户id
  			} 
		}).success(function(res){
			if(0 == res.code){
				$scope.score = res.data.score;
				$scope.remark_sum = res.data.remark_sum;
				$scope.img = res.data.img;
				
				
			}
		});
		
		$('.gw').on('click',function(){
			location.href = $seller_main+"?done=true";
		});
		
		$('.ev span').on('click','em',function(){
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			
			var bind = $(this).parent().attr('data-bind');
			var value = $(this).attr('data-value');
			$('.ev').attr(bind, value);
			
		});
		
		$('.start_btn').on('click',function(){
			if($('textarea').val().trim().length == 0){
				Log.show("评论内容不能为空");
				return;
			}
			
			$http_post($http,{
		      	"uri": "bijia_product.commentSave", // 接口名称
		      	"param":{
		            'saleId': localStorage.kqc_cursale_id, // 经纪人id
		            'orderId': localStorage.kqc_curorder_id,// 订单id
		            'carId': localStorage.kqc_curcar_id,  // 车辆id
		            'tip0': $('.ev').attr('data-tip0'),   // 态度
		            'tip1': $('.ev').attr('data-tip1'),   // 专业
		            'tip2': $('.ev').attr('data-tip2'),   // 颜值
		            'comment': $('textarea').val(), // 评论内容
		            'title'  : $('.cartype').text(), // 车型名称
		            'saleName': $('.salename').text(), // 经纪人名称
		            'saleImg' : $('.saleimg').attr('src'), // 经纪人头像
		            'saleShop': $('.shopname').text() // 经纪人店名
		        }
		    }).success(function(res){
				if(res.code == '0'){
					Log.show('提交成功');
					location.href = $user_booked;
				}else if(-2 == res.code){
					Log.show("您提交过了");
				}else{
					Log.show("提交失败,3秒后返回上一页");
					setTimeout(function(){
						location.href = $user_mine;
					},3000);
				}
			});
		});
		
		
	});
})();

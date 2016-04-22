(function(){
	
	App.controller("Ctrl",function($scope, $http){
		$http_post($http,{
			"uri": "bijia_product.userCenter" // 接口名称
		}).success(function(res){
//			console.log(res);
			if(0 == res.code) {
				$scope.data = res.data;
				$scope.imgsrc = res.data.avatar;
			} else {
				Log.show(res.msg);
			}
		});
		
//		bindpicker('.uploadbtn',$("#ts-image-uploader"), function(res){
//			$scope.imgsrc = res.upload_url + res.thumb_url_small;
//			$('.uploadbtn .container').html('<img src="'+$scope.imgsrc+'"/>');
//			
//			$http_post($http,{
//				"uri": "bijia_inquiry.avatarSub", // 接口名称
//				"param":{
//					avatar:$scope.imgsrc,
//					tel:$('.toper .tel').attr('data-tel')
//				}
//			}).success(function(res){
//				if(0 != res.code) {
//					Log.show(res.msg);
//				}
//			});
//		});
		$('.uploadbtn').on('click',function(){
			localStorage.kqc_curuser_tel = $('.toper .tel').attr('data-tel');
			location.href = $imgclip_index;
		});
		
		
		$('.toper').on('click','.name',function(){
			localStorage.kqc_curuser_name = $(this).attr('data-name');
			localStorage.kqc_curuser_tel = $('.toper .tel').attr('data-tel');
			location.href = $user_personal;
		});
		
		$('li').on('click',function(){
			var ind = $(this).attr('data-btn');
			switch(parseInt(ind)){
				case 2:{ // 已付定金的车
					location.href = $user_booked;
				}
				break;
				case 3:{ // 问题反馈
					location.href = $user_feedback;
				}
				break;
				case 4:{ // 退出
					localStorage.clear();
					Log.show("退出成功");
					location.href = $home_index;
				}
				break;
			}
		});
		

	});
})();

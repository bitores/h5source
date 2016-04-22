(function(){
	App.controller("Ctrl",function($scope, $http){
		
		bindpicker('.uploadbtn',$("#ts-image-uploader"),function(res){
//			console.log(res);
			var url = res.upload_url + res.file_url;
			
			if($('.uploadbtn').parent().attr('data-images')){
				$('.uploadbtn').parent().attr('data-images',$('.uploadbtn').parent().attr('data-images')+ "|" +url);
			}else{
				$('.uploadbtn').parent().attr('data-images',url);
			}
			
			$('.uploadbtn').parent().append('<img src="'+res.upload_url + res.thumb_url_small+'"/>');
		});
		
		$('.btn').on('click',function(){
			
			if(!$('.info').val()){
				Log.show('不能为空');
				return;
			}

			$http_post($http,{
				"uri": "bijia_product.questionSub", // 接口名称
		        "param":{
		        	'content': $('.info').val(), // 反馈内容
		            'img': $('.uploadbtn').parent().attr('data-images'),// 上传图片地址，多个竖线“|”隔开（不能有空格）
		            'osType': '4',  // 平台类型 1：安卓 2：IOS 3：pc 4：wap
		            'msgType': '10',   // 取值10比价用户端反馈；11比价商户端反馈
		        }
		            
			}).success(function(res){
				if(0 == res.code) {
//					location.href = $user_mine;
//				} else if(-2 == res.code){
					Log.show("成功提交反馈");
					
				} else {
					Log.show('提交失败,3秒后返回上一页');
					setTimeout(function(){
						location.href = $user_mine;
					},3000);
				}
			})

		});
	});
})();

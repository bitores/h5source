(function(){
	isLogin();
	App.controller("Ctrl",function($scope, $http){
		try{
			$scope.username = localStorage.kqc_curuser_name;
			$scope.usertel = localStorage.kqc_curuser_tel;
		}catch(e){
			
		}
		
//		encontentedit('.name');		
//		
		$('.btn').on('click',function(){
			if($('.name').val().length==0 || $('.name').attr('placeholder') == $('.name').val()){
				location.href = $user_mine;
				return;
			}
			$http_post($http,{
				"uri": "bijia_product.nameSub", // 接口名称
			    "param":{
			    	'name': $('.name').val(), // 姓名
			        'tel': $scope.usertel// 手机号
			    }      
			}).success(function(res){
				if(0 == res.code) {
					location.href = $user_mine;
				} else {
					Log.show(res.msg+',3秒后返回上一页');
					setTimeout(function(){
						location.href = $user_mine;
					},3000);
				}
				
			});

		});
	});
})();

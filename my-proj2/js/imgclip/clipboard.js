(function(){
	
	App.controller("Ctrl",function($scope, $http){
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		$("#clipArea").photoClip({
			width: 200,
			height: 200,
			file: "#file",
//			view: "#view",
			ok: "#clipBtn",
			loadStart: function() {
//				console.log("照片读取中");
			},
			loadComplete: function($it,$img) {
//				console.log("照片读取完成");
			},
			clipFinish: function(dataURL) {
				uploadimg(dataURL,function(res){
					$http_post($http,{
						"uri": "bijia_inquiry.avatarSub", // 接口名称
						"param":{
							avatar:res.upload_url + res.file_url,
							tel:localStorage.kqc_curuser_tel
						}
					}).success(function(res){
						if(0 != res.code) {
							Log.show(res.msg);
						}
						location.href = $user_mine
					});
					
				});
			}
		});
	
	});
})();

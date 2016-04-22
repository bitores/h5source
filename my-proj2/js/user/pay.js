(function(){
	App.controller("Ctrl",function($scope, $http){
		function isWeiXin(){
	    	var ua = window.navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		        return true;
		    }else{
		        return false;
		    }
		}
		// 协议
		$("#xybtn").on('click',function(){
			$(".xy_mask").show();
			$http_post($http,{
				"uri"   :"user.agreement",
				"param" :{
			    	"key":"agreement-kbj"
			    }
			}).success(function (res) {
				$('#xyTxt').html(res.data);
	        });
		});
		
		$(".xy").on('click',function(e){
			e.stopPropagation();
		});
	
		$("#regin_close_btn,.xy_mask").on('click',function(e){
			e.stopPropagation();
			$(".xy_mask").hide();
		});
		
		$('.call').on('click',function(){
			location.href = 'tel:400-626-9191';
		});
		

		$('.btn').one('click',function(){

			$http_post($http,{
				"uri": "bijia_order.doOrder",
			    "param" :{
			    	"agent": localStorage.kqc_cursale_id, // 商户id
					"inquiryId": localStorage.kqc_curinquiry_id,// int  需求id
					"payType": localStorage.kqc_curpaytype,// int 付款类型0贷款1全款
					"bid": localStorage.kqc_curbid,// int 报价id
			    }
			}).success(function (res) {
				if(0 == res.code){
					localStorage.kqc_cursn = res.data.sn;
					localStorage.kqc_cursn_id = res.data.id;
					
					if(typeof NewJavaInjectedUtils != 'undefined') { 
						localStorage.kqc_app = 1;// Android: 1
//						window.NewJavaInjectedUtils.paySnFromJs(localStorage.kqc_cursn,99,localStorage.kqc_sess_id);
						location.href = $user_payensure;
					} else if(typeof ObjectForJSAndiOS !== "undefined") {
						localStorage.kqc_app = 2;// IOS: 2
						location.href = $user_payensure;
					} else {
						if(isWeiXin()) {
							location.href = $pay_pt;
						} else {
							location.href = $user_payensure;
						}
					}
				} else {
					Log.show(res.msg);
				}
	        })
		})
	});
})();
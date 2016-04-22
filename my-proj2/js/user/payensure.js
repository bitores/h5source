(function(){
	isLogin();
	function isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	}
	App.controller("Ctrl",function($scope, $http){
		if(!!localStorage.kqc_app == true) {
			$('.wx').removeClass('seld')
			$('.wx').show();
			$('.zfb').show();
			$scope.curTP = "1";
		} else {
			if(5 == PT) {
				$('.wx').show();
				// 微信支付
				var appId = "";
				var timeStamp = "";
				var nonceStr = "";
				var pg = "";
				var signType = "";
				var paySign = "";
				
				function onBridgeReady(){
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
							"appId": appId, //公众号名称，由商户传入
							"timeStamp": timeStamp,//"1453539660",//timeStamp, //时间戳，自1970年以来的秒数
							"nonceStr": nonceStr,//"gF0taTgeRTuqa1rAHdfT8S713yYpbnSF",//nonceStr, //随机串
							"package": pg,//"prepay_id=wx201601231702373c06c007eb0123886024",//pg,
							"signType": signType, //微信签名方式:
							"paySign": paySign//"D797E5AF311F70C3BFCF2D68035A49AC"//paySign //微信签名
						},
				
						function(res) {
							if (res.err_msg == "get_brand_wcpay_request:ok") {
								//支付完成跳到 已支付订单页面
								location.href = $user_booked +'?state=done';
							} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
								Log.show('支付取消，返回上一页');//继续支付
								location.href = $seller_offer;
							} else if(res.err_msg == "get_brand_wcpay_request:fail") {
								Log.show('支付失败，返回上一页');//继续支付
								location.href = $seller_offer;
							}
						}
					);
				}
				
				function wxpay() {
					
					if (typeof WeixinJSBridge == "undefined") {
						if (document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						} else if (document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					} else {
						onBridgeReady();
					}
				}
				$http_post($http, {
					"uri": "bijia_userPay.wxPay",
					"param": {
						"sn": localStorage.kqc_cursn,
						"return_url":"",
						"pt": '5',
						"pc": "1",
						"wechat_code": code
					}
				}).success(function (res) {
					if(0 == res.code){
						appId = res.data["appId"];
						timeStamp = res.data["timeStamp"];
						nonceStr = res.data["nonceStr"];
						pg = res.data["package"];
						signType = res.data["signType"];
						paySign = res.data["paySign"];
					}
				});
			} else {
				$('.zfb').show();
			}
		}
		
		$('.way').on('click','li',function(){
			$(this).addClass('seld');
			$(this).siblings().removeClass('seld');
			$scope.curTP = $(this).attr('data-b');
		});
		
		$('.btn').one('click',function(){
			/*
			 * 以下支付 分别为 app 壳 和浏览器 进行了区分
			 */
			if(!!localStorage.kqc_app == true) {
				try{
					if(localStorage.kqc_app == '1') { //Android
						window.NewJavaInjectedUtils.paySnFromJs(localStorage.kqc_cursn,$scope.curTP,localStorage.kqc_sess_id,99);
					} else { // IOS
						window.ObjectForJSAndiOS.payForOrder(localStorage.kqc_cursn,99,$scope.curTP,localStorage.kqc_sess_id,'kbj');
					}
				}catch(e){
					alert('APP需要更新');
				}
			} else {
				// 1:ali 5:weixi
				if(5 == PT){
					// 微信支付
					wxpay();
				} else {
					// 支付宝支付
					$http_post($http, {
						"uri": "bijia_userPay.aliPay",
						"param": {
							"sn": localStorage.kqc_cursn,
							"return_url":$user_booked+'?state=done',
							"pt": "1",
							"pc": "1"
						}
					}).success(function(res){
						if(0 == res.code){
							$('body').append('<form id="goPost" action="'+res.data.gateway+'" method="'+res.data.method+'"></form>');
							$('#goPost').append(res.data.form);
							$('#goPost').submit();
							
						}else if(res.code=='9'){
							Log.show("请登录");
							localStorage.kqc_backurl = location.href;
							location.href = $user_login
						}else{
							Log.show(res.msg)
						}
					});
					
				}
			}
			
			
			
			
		});
	});
})();

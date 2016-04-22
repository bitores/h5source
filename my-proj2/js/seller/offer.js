(function(){
	
	    App.filter("numgroup",function(){
		    return function(strNum) {
			    if(!!strNum==false){
				    return 0;
			    }
			    if (strNum.length <= 3) {
				    return strNum;
			    }
			    if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
				    return strNum;
			    }
			    var a = RegExp.$1,
				    b = RegExp.$2,
				    c = RegExp.$3;
			    var re = new RegExp();
			    re.compile("(\\d)(\\d{3})(,|$)");
			    while (re.test(b)) {
				    b = b.replace(re, "$1,$2$3");
			    }

			    return a + "" + b + "" + c;
		    }
	    });
	
	    App.controller("Ctrl",function($scope, $http){
		
		    try{
		    	$scope.defaultimg = defaultimg;
			    $scope.salername = localStorage.kqc_cursale_name;
			    $scope.carname = localStorage.kqc_curcar_name;
			    $scope.carconfig = localStorage.kqc_curcar_config;
						
			    var tel = getQueryString('tel');
			    $scope.done = false;
			    if(tel){
				    $scope.sale_tel = tel;
				    $scope.done = true;
			    }
		    }catch(e){
			
		    }
		
		    $http_post($http,{
			    "uri": "bijia_inquiry.getQuoteDetail", // 接口名称
	      	    "param":{
	      		    'id': localStorage.kqc_curbid, // 报价id
    //	            'cid': localStorage.kqc_curcar_id,// 车辆id
	                'agent_id': localStorage.kqc_cursale_id,// 销售人员id
	                'ext': localStorage.kqc_curorder_ext   // 报价列表页附加参数，详见6.
	      	    }   
		    }).success(function(res){
			    if(0 == res.code) {
				    $scope.data = res.data;
				    
				    if(!!$scope.data.virtual==true){
				    	$(".inval").show();
				    }else{
				    	$(".val").show();
				    }
			    } else {
//				    Log.show(res.msg);
			    }
		    });
		
		    // 平时的支付状态
		    $('.btn').on('click',function(){
			    if($scope.sale_tel) {
				    // 已支付
				    location.href = 'tel:'+$scope.sale_tel;
			    } else {
				    // 未支付
				
				    localStorage.kqc_curpaytype = $scope.data.buy_type;
				
				    location.href = $user_pay;
			    }
		    });
		
		    $('.manbox').on('click',function(){
			    if($scope.done){
				    location.href = $seller_main+"?done=true";
			    }else{
				    location.href = $seller_main;
			    }
			
		    });
		
	    });
    })();
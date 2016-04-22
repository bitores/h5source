(function(){
		
	App.controller("Ctrl",function($scope, $http){
			// 登录回调函数
			function startInquiry() {
				$http_post($http,{
					"uri": "bijia_inquiry.requestInquiry", // 接口名称
					"param": {
						bsy0: localStorage.kqc_carbrand_id,  // 品牌id
						bsy1: localStorage.kqc_cartype_id,  // 车系id
						bsy2: localStorage.kqc_carmodel_id,  // 型号id
						colorId: localStorage.kqc_carcolor_id,  // 颜色ID
						colorCode: localStorage.kqc_carcolor_code,
						colorName: localStorage.kqc_carcolor_name,// 颜色名称
						cityId: localStorage.kqc_cartakecity_id,   // 期望提车城市ID
						cityName: localStorage.kqc_cartakecity_name, // 期望提车城市名称
						preTime: localStorage.kqc_carbuying_time,  // 期望提车时间
						bsyName: localStorage.kqc_cartype_name+','+localStorage.kqc_carmodel_name+','+localStorage.kqc_carmodel_config,  // 型号名称
						price: localStorage.kqc_carmodel_minprice,    // 指导价
						payType: localStorage.kqc_carbuying_wayid  // 付款方式，默认0贷款，1全款
					}
				}).success(function(res){
					if(0 == res.code) {
						localStorage.kqc_inquiryId = res.data.inquiryId;						
						
						location.href = $inquiry_asking;
					} else {
						Log.show('询价失败'+res.msg);
					}
				});
			}
			
			try{
				$scope.cartypename = localStorage.kqc_cartype_name;
				$scope.cartypeimg = localStorage.kqc_cartype_img;
				$scope.carmodelid = localStorage.kqc_carmodel_id;
				$scope.carmodelconfig = localStorage.kqc_carmodel_config;
				$scope.carmodelname = localStorage.kqc_carmodel_name;
				$scope.carmodelprice = localStorage.kqc_carmodel_price;
				
				if(getQueryString('clearable')=="false"){
					$('#curr_color').html(localStorage.kqc_carcolor_name);
					$('#curr_color').addClass('valued');
					
					$('#curr_city').html(localStorage.kqc_cartakecity_name);
					$('#curr_time').html(localStorage.kqc_carbuying_time);
					$('#curr_way').html(parseInt(localStorage.kqc_carbuying_wayid)==0?'贷款':'全款');
					$('#curr_city').addClass('valued');
					$('#curr_time').addClass('valued');
					$('#curr_way').addClass('valued');
					startInquiry();
					
				} else {
					// 进入默认页面 初始化
					localStorage.removeItem("kqc_carcolor_id");  // 颜色ID
					localStorage.removeItem("kqc_carcolor_code"); // 颜色值
					localStorage.removeItem("kqc_carcolor_name");// 颜色名称
					// 默认城市
					localStorage.kqc_cartakecity_id = '930';
					localStorage.kqc_cartakecity_name = "杭州";
					// 默认时间
					localStorage.kqc_carbuying_time = '2周内';
					// 默认方式
					localStorage.kqc_carbuying_wayid = '1';
					localStorage.kqc_carbuying_way = "贷款";
				}
			}catch(e){
	
			}
		
		
		
		
		
		$http_post($http, {
			uri: "bijia_product.getColorAndCity",
			param: {
				id:localStorage.kqc_carmodel_id
			}
		}).success(function(res) {
			if(0 == res.code){
				$scope.cities = res.data.cities;
				$scope.colors = res.data.color;
			}else{
				Log.show(res.msg);
			}
			
			$current_section = null;
			$current_show = false;
			
			$('.other_info').on('click', 'li',function(e){
				e.stopPropagation();
				if($current_show){
					$current_section.removeClass('show');
					$current_section.addClass('hide');
					$current_section = null;
					$current_show = false;
					return;
				}
				$('.scroll_box').removeClass('show');
				switch(parseInt($(this).data('btnid'))){
					case 0:{ // 选择颜色
						$current_section = $('#section_color');
					}
					break;
					case 1:{ // 选择提车城市
//						$current_section = $('#section_city');
					}
					break;
					case 2:{ // 选择购车时间
						$current_section = $('#section_time');
					}
					break;
					case 3:{ // 选择购车方式
						$current_section = $('#section_way');
					}
					break;
				}
				if($current_section){
					$current_show = true;
					$current_section.removeClass('hide');
					$current_section.addClass('show');
				}
				
				
			});
			
			// 选择颜色
			$('#section_color').on('click','li',function(e){
				e.stopPropagation();
				var $this = $(this);
				$this.siblings().removeClass('seld');
				$this.addClass('seld');
				
				var color_id = $this.attr('data-colorid'),
					color_code = $this.attr('data-colorcode'),
					color_name = $this.attr('data-colorname');

				localStorage.kqc_carcolor_id = color_id;
				localStorage.kqc_carcolor_code = color_code;
				localStorage.kqc_carcolor_name = color_name;
				$('#section_color').removeClass('show');
				$('#section_color').addClass('hide');
				$current_show = false;
				$current_section = null;
				$('#curr_color').html(color_name);
				$('#curr_color').addClass('valued');
				
			});
			
			
			// 选择时间
			$('#section_time').on('click','span',function(e){
				e.stopPropagation();
				var $this = $(this);
				$this.siblings().removeClass('seld');
				$this.addClass('seld');
				
				localStorage.kqc_carbuying_time = $this.attr('data-buyingtime');
			});
			
			// 选择购车方式
			$('#section_way').on('click','span',function(e){
				e.stopPropagation();
				var $this = $(this);
				$this.siblings().removeClass('seld');
				$this.addClass('seld');
				
				localStorage.kqc_carbuying_wayid = $this.attr('data-id');
				localStorage.kqc_carbuying_way = $this.attr('data-buyingway');
			});
			
			
			
			function _callback() {
				if(!!localStorage.kqc_carcolor_id==false){
					Log.show("请选择外观颜色");
					return;
				}
				
				if(!!localStorage.kqc_cartakecity_id==false){
					Log.show("请选提车城市");
					return;
				}
				
				if(!!localStorage.kqc_carbuying_time==false){
					Log.show("请选择预计购车时间");
					return;
				}
				
				if(!!localStorage.kqc_carbuying_wayid==false){
					Log.show("请选择购车方式");
					return;
				}
				
				if(!!localStorage.kqc_sess_id == false){
					localStorage.kqc_backurl = $inquiry_asking;
					location.href = $user_login+'?action=login.select';
					return;
				}
				
				
				$http_post($http,{
					"uri": "bijia_product.isLogin",
				    "param" :{
				    }
				}).success(function(res){
					if(res.code == '0'){
						// 回调
						startInquiry();
					}else{
						localStorage.kqc_backurl = location.href+'?clearable=false';
						location.href = $user_login+'?action=login.select';
					}
				});
			}

			$('.start_btn').on('click',function(e){
				e.stopPropagation();
				
				_callback();
			});
			
			
			$('.content').on('click',function(){
				if($current_show){
					$current_section.removeClass('show');
					$current_section.addClass('hide');
					$current_section = null;
					$current_show = false;
				}
				
			});
		});
	});
})();

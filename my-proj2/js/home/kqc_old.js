(function(){
	App.controller("Ctrl",function($scope, $http){
		var info = [
			{
				txt:"高尔夫 2016款 1.4TSI 自动舒适型",
				icon:"golf@2x.png",
				seld:2,
				name:["黄*","许*","李**","朱**"],
				price:["13.79","14.20","13.50","14.10"],
				sales:["homeSales1@2x.png","homeSales2@2x.png","homeSales3@2x.png","homeSales4@2x.png"]				
			},	
			{
				txt:"奔驰 2015款 C 200 运动版",
				icon:"benz@2x.png",
				seld:1,
				name:["于**","吴**","莫**","王**"],
				price:["29.00","28.60","28.68","28.70"],
				sales:["homeSales5@2x.png","homeSales7@2x.png","homeSales6@2x.png","homeSales8@2x.png"]
			},
			{
				txt:"宝马 2014款 520Li 典雅型",
				icon:"bmw@2x.png",
				seld:0,
				name:["闵**","徐**","卢**","赵**"],
				price:["35.80","36.10","36.00","36.40"],
				sales:["homeSales11@2x.png","homeSales10@2x.png","homeSales9@2x.png","homeSales12@2x.png"]
			},
			{
				txt:"本田XR-V 2015款 1.5L 自动 经典版",
				icon:"honda@2x.png",
				seld:2,
				name:["何**","黄*","杨*","周**"],
				price:["13.62","13.60","13.58","13.70"],
				sales:["homeSales13@2x.png","homeSales14@2x.png","homeSales15@2x.png","homeSales16@2x.png"]
			},
			{
				txt:"迈锐宝 2016款 1.6T 自动豪华版",
				icon:"malibu@2x.png",
				seld:3,
				name:["林**","蔡*","张**","陈**"],
				price:["16.60","16.50","16.35","16.09"],
				sales:["homeSales17@2x.png","homeSales18@2x.png","homeSales20@2x.png","homeSales19@2x.png"]
			},
			{
				txt:"福克斯两厢 2015款 1.6T 自动舒适版",
				icon:"focus@2x.png",
				seld:1,
				name:["李**","董*","郑*","吴**"],
				price:["12.00","11.37","11.40","12.10"],
				sales:["homeSales21@2x.png","homeSales23@2x.png","homeSales22@2x.png","homeSales24@2x.png"]
			}
		];
		
		var ind = parseInt(Math.random()*6);
		
		$scope.info = info[ind];
		
		$('#imglist').swipeSlide({
			continuousScroll:true,
		    autoSwipe : true,
			lazyLoad : true,
		    speed : 3000,
		    transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
		    callback : function(i,len){
				$('#imglist span').attr('class','');
				$('#imglist').find('span').each(function(){
					if($(this).index()==i){
						$(this).attr('class','cur');
					}
				})   
		    }
		});
			
		$('.start_btn').on('click',function(){
		// 开始时不登录也可以进行操作
			location.href = $car_brand;
		});
	});
})();


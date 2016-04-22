(function(){
	function random(){
		return ''+parseInt(Math.random() * 200 + 100)+ "人比价中";
	}
	var hotB = [
		{
			img:"b_1.png",
			name:"奥迪",
			id:"1"
		},
		{
			img:"b_8793.png",
			name:"马自达",
			id:"8793"
		},
		{
			img:"b_857.png",
			name:"宝马",
			id:"857"
		},
		{
			img:"b_438.png",
			name:"别克",
			id:"438"
		},
		{
			img:"b_567.png",
			name:"奔驰",
			id:"567"
		},
		{
			img:"b_4481.png",
			name:"福特",
			id:"4481"
		},
		{
			img:"b_9022.png",
			name:"MINI",
			id:"9022"
		},
		{
			img:"b_281.png",
			name:"本田",
			id:"281"
		},
		{
			img:"b_2818.png",
			name:"大众",
			id:"2818"
		},
		{
			img:"b_9793.png",
			name:"日产",
			id:"9793"
		},
		{
			img:"b_4101.png",
			name:"丰田",
			id:"4101"
		}
	];
	var hotM = [
		{
			img:"A4L.jpg",
			name:"A4L",
			td:"37",
			bd:"1",
			tip:random()
		},
		{
			img:"Q3.jpg",
			name:"奥迪Q3",
			td:"84",
			bd:"1",
			tip:random()
		},
		{
			img:"AKSL3.jpg",
			name:"昂克赛拉",
			td:"8794",
			bd:"8793",
			tip:random()
		},
		{
			img:"ATZ.jpg",
			name:"阿特兹",
			td:"8869",
			bd:"8793",
			tip:random()
		},
		{
			img:"BM3.jpg",
			name:"宝马3系",
			td:"873",
			bd:"857",
			tip:random()
		},
		{
			img:"KY.jpg",
			name:"凯越",
			td:"456",
			bd:"438",
			tip:random()
		},
		{
			img:"BC200.jpg",
			name:"奔驰C级",
			td:"749",
			bd:"567",
			tip:random()
		},
		{
			img:"FRS.jpg",
			name:"福睿斯",
			td:"4544",
			bd:"4481",
			tip:random()
		},
		{
			img:"COUNTRYMAN.jpg",
			name:"countryman",
			td:"9045",
			bd:"9022",
			tip:random()
		},
		{
			img:"SY.jpg",
			name:"思域",
			td:"318",
			bd:"281",
			tip:random()
		},
		{
			img:"FD.jpg",
			name:"飞度",
			td:"395",
			bd:"281",
			tip:random()
		},
		
		{
			img:"TG.jpg",
			name:"途观",
			td:"2986",
			bd:"2818",
			tip:random()
		},
		{
			img:"LY.jpg",
			name:"朗逸",
			td:"3017",
			bd:"2818",
			tip:random()
		},
		{
			img:"ST.jpg",
			name:"速腾",
			td:"2819",
			bd:"2818",
			tip:random()
		},
		{
			img:"GOFT.jpg",
			name:"高尔夫",
			td:"2919",
			bd:"2818",
			tip:random()
		},
		{
			img:"QD.jpg",
			name:"骐达",
			td:"9883",
			bd:"9793",
			tip:random()
		},
		{
			img:"XY.jpg",
			name:"轩逸",
			td:"9794",
			bd:"9793",
			tip:random()
		},
		{
			img:"KLL.jpg",
			name:"卡罗拉",
			td:"4102",
			bd:"4101",
			tip:random()
		},
		{
			img:"HLD.jpg",
			name:"汉兰达",
			td:"4249",
			bd:"4101",
			tip:random()
		}
	];

	App.controller("Ctrl",function($scope, $http){
		$scope.hotM = hotM.sort(function(a, b){
			return Math.random()>.5 ? -1 : 1;
		});
		
		$scope.hotB = hotB.sort(function(a, b){
			return Math.random()>.5 ? -1 : 1;
		});
		
		
		$scope.goto_brand = function(){
			location.href = $car_brand
		}
		$scope.more = function(){
			location.href = $car_brand
		}
		
		$('.clickable').on('click',function(){
			var $url = $(this).attr('data-url');
			(function(){
				location.href = $url;
			})();
		})
	});
})();


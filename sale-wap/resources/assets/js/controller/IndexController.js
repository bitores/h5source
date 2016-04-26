//首页
define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd,angular,angular_route,angular_resource
    ) {
    	
    function IndexController($scope){
    	
    	//banner
    	$scope.banner = [
            {
                image:"/icon-1024748.png",
                caption:"11"
            }
        ]
        //提车日记
        $scope.news_list=[
            {
                link:"http://www.baidu.com",
                images:"/img/index/cardatetestimg.jpg",
                title:"帮女神买车是一种怎么样的体验？1帮女神买车是一种怎么样的体验？",
                desc:"当今中国最受资本市场最青睐的行业是什么1？恐怕10个人里恐怕10个人里"
            },
            {
                link:"http://www.baidu.com",
                images:"/img/index/cardatetestimg.jpg",
                title:"帮女神买车是一种怎么样的体验？2",
                desc:"当今中国最受资本市场最青睐的行业是什么2？恐怕10个人里恐怕10个人里"
            }
        ]

    	
    	//menu
    	$scope.menu = [
    		{
    			image:"/img/index/menu-img1.png",
                caption:"同城比价"
    		},
    		{
    			image:"/img/index/menu-img2.png",
                caption:"品牌选车"
    		},
    		{
    			image:"/img/index/menu-img3.png",
                caption:"购车帮助"
    		},
    		{
    			image:"/img/index/menu-img4.png",
                caption:"提车日记"
    		}
    	]
    	
    	//car_menu
    	$scope.car_menu = [
    		{
    			image:"/img/car-menu-img1.png",
                caption:"宝马"
    		},
    		{
    			image:"/img/car-menu-img1.png",
                caption:"宝马"
    		},
    		{
    			image:"/img/car-menu-img1.png",
                caption:"宝马"
    		},
    		{
    			image:"/img/car-menu-img1.png",
                caption:"宝马"
    		},
    		{
    			image:"/img/car-menu-img1.png",
                caption:"宝马"
    		},
    		{
    			image:"/img/car-menu-img1.png",
                caption:"宝马"
    		},
    		{
    			image:"/img/car-menu-img1.png",
                caption:"宝马"
    		},
    		{
    			image:"/img/car-menu-img1.png",
                caption:"宝马"
    		},
    		{
    			image:"/img/car-menu-img1.png",
                caption:"宝马"
    		}
    		
    	]
    	
    	//hot_car
    	$scope.hot_car = [
    		{
    			id: 1,
    			image_src:"/img/index/hot_car_img.jpg",
                title:"2016款 宝马320Li时尚运动款",
                sale_pirce: 30.66,
                market_price: 36.88,
                drop_price: 6.22
    		},
    		{
    			id: 2,
    			image_src:"/img/index/hot_car_img.jpg",
                title:"2016款 宝马320Li时尚运动款",
                sale_pirce: 30.66,
                market_price: 36.88,
                drop_price: 6.22
    		},
    		{
    			id: 3,
    			image_src:"/img/index/hot_car_img.jpg",
                title:"2016款 宝马320Li时尚运动款",
                sale_pirce: 30.66,
                market_price: 36.88,
                drop_price: 6.22
    		},
    		{
    			id: 4,
    			image_src:"/img/index/hot_car_img.jpg",
                title:"2016款 宝马320Li时尚运动款",
                sale_pirce: 30.66,
                market_price: 36.88,
                drop_price: 6.22
    		},
    	]
    	
    	//hot_activity
    	$scope.hot_activity = [
    		{
    			image_src:"/img/index/hot_car_img.jpg",
    			title: "福特专场",
    			drop_price: 2.2
    		},
    		{
    			image_src:"/img/index/hot_car_img.jpg",
    			title: "最酷车型",
    			drop_price: 2.0
    		},
    		{
    			image_src:"/img/index/hot_car_img.jpg",
    			title: "MINI专场",
    			drop_price: 18.8
    		}
    	]
    }
    	
	return IndexController;
});
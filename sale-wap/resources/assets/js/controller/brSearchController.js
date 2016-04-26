//品牌选车
define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd,angular,angular_route,angular_resource
    ) {
    	
    function brSearchController($scope){
    	//brSearch_list
    	$scope.brSearch_list = [
    		{
    			id: 1,
    			image_src:"/img/index/hot_car_img.jpg",
                title:"2016款 宝马320Li时尚运动款",
                sold_num: 12,
                sale_pirce: 30.66,
                market_price: 36.88,
                drop_price: 6.22
    		},
    		{
    			id: 2,
    			image_src:"/img/index/hot_car_img.jpg",
                title:"2016款 宝马320Li时尚运动款",
                sold_num: 12,
                sale_pirce: 30.66,
                market_price: 36.88,
                drop_price: 6.22
    		},
    		{
    			id: 3,
    			image_src:"/img/index/hot_car_img.jpg",
                title:"2016款 宝马320Li时尚运动款",
                sold_num: 12,
                sale_pirce: 30.66,
                market_price: 36.88,
                drop_price: 6.22
    		},
    		{
    			id: 4,
    			image_src:"/img/index/hot_car_img.jpg",
                title:"2016款 宝马320Li时尚运动款",
                sold_num: 12,
                sale_pirce: 30.66,
                market_price: 36.88,
                drop_price: 6.22
    		},
    	]
    }
    
	return brSearchController;
});
define(['zepto', 'angular'], function (nnd, angular) {
    
     //过滤器
    function slide() {
        return {
			restrict: 'EA',
			require: '^swiper',
			template: "<div class='swiper-slide' ng-transclude></div>",
			replace: true,
			transclude: true,
			link: function(scope, elem, attrs, swiper) {
			  	swiper.addSlide(elem, attrs, function() {
			    	scope.$apply(attrs.slide);
		            scope.$apply(attrs.ngClick);
	          	});
        	}
      	}
    };
    
    return slide;
    
});




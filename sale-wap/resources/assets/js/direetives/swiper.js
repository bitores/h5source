define(['zepto', 'angular'], function (nnd, angular) {
    
     //过滤器
    function swiper($timeout,$element, $attrs) {
        return {
			restrict: 'EA',
			template: "<div class='swiper-container'>" +
			"<div class='swiper-wrapper'></div>" +
			"<div style='display: none' ng-transclude></div>" +
			"</div>",
			replace: true,
			transclude: true,
			// We use a controller here so the slide directive
			// can require it and call `addSlide`.
			controller: function() {
				var newSlides = [];
				var mySwiper = null;
				var slideCount = 0;
				var callbacks = {};
				this.addSlide = function(html, callback) {
			    	if (mySwiper) {
				    	var newSlide = mySwiper.createSlide(html.html());
						newSlide.data('slideNumber', ++slideCount);
						mySwiper.appendSlide(newSlide);
						callbacks[slideCount] = callback;
						mySwiper.swipeTo(0, 0, false);
					} else {
			      		newSlides.push({html: html, callback: callback});
			    	}
			  	};
			
			  	$timeout(function() {
			    	console.log($attrs.swiper);
			    	mySwiper = $element.swiper({
				      	mode: 'horizontal',
					  	loop: true,
					  	autoResize: true,
					  	resizeReInit: true,
					  	calculateHeight: true,
					  	centeredSlides: true,
					  	cssWidthAndHeight: false,
				  		onSlideClick: function(swiper) {
							var clicked = swiper.clickedSlide;
							var slideNumber = clicked.data('slideNumber');
			    			var callback = callbacks[slideNumber];
		    				if (callback) callback();
				  		}
					});
					for (var i = 0; i < newSlides.length; i++) {
					          var slide = newSlides[i];
					          this.addSlide(slide.html, slide.callback);
			        }
	      		}.bind(this));
    		}
  		}
	};
    
    return swiper;
});
(function(){
	App.controller("Ctrl",function($scope, $http){
		setInterval(function(){
			$("#scroll").find("ul:first").animate({
				marginTop: "-25px"
			}, 500, function() {
				$(this).css({
					marginTop: "0px"
				}).find("li:first").appendTo(this);
			});
			
		}, 3000);
	});
})();


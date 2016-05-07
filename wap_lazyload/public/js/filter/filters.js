define(['app'],function(app){

	app.filter("filters",function(){
		return function(input){
			return 1;
		}
	}) 
})
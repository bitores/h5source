define(['angular'],function(angular){

	function Data($http,$q,API){
		// car
		// 这个接口是获取品牌列表的信息
		this.getBrandList = function(){
			return API.get('/brand.json');
			// return API.get('car/brand/?type=wap&limit=10');
		}
		// 这个接口是获取某一品牌下的车系信息列表
		this.getChildBrand = function( id ) {
			// return API.get('/type.json');
			return API.get('car/brand/?id='+ id +'&type=wap&limit=10');
		}
		// 这个接口是获取某一车系下的车款信息列表
		this.getStyleList = function( id ) {
			return API.get('car/style/?id='+ id +'&type=wap&limit=10');
		}
		// 这个接口是获取某一品牌下的车系信息列表
		this.getClassList = function( id ) {
			return API.get('car/class/?id='+ id +'&type=wap&limit=10');
		}
		// 这个接口是获取某一车下的所有城市
		this.getCityList = function( id ) {
			return API.get('car/city/?id='+ id +'&type=wap');
		}
		// 这个接口是获取某一车下的所有颜色
		this.getColorList = function( id ) {
			return API.get('car/color/?id='+ id );
		}
	}

	return Data;	
})
var App=angular.module("App",["lazyload"],function($httpProvider){$httpProvider.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8";var param=function(obj){var query="",name,value,fullSubName,subName,subValue,innerObj,i;for(name in obj){value=obj[name];if(value instanceof Array){for(i=0;i<value.length;++i){subValue=value[i];fullSubName=name+"["+i+"]";innerObj={};innerObj[fullSubName]=subValue;query+=param(innerObj)+"&"}}else{if(value instanceof Object){for(subName in value){subValue=value[subName];fullSubName=name+"["+subName+"]";innerObj={};innerObj[fullSubName]=subValue;query+=param(innerObj)+"&"}}else{if(value!==undefined&&value!==null){query+=encodeURIComponent(name)+"="+encodeURIComponent(value)+"&"}}}}return query.length?query.substr(0,query.length-1):query};$httpProvider.defaults.transformRequest=[function(data){return angular.isObject(data)&&String(data)!=="[object File]"?param(data):data}]});App.directive("repeatDone",function(){return{link:function(scope,element,attrs){if(scope.$last){scope.$eval(attrs.repeatDone)}}}});
App.filter('dotdot',function(){
	return function(inputStr){
		if(!!inputStr==false){
			return "销售顾问";
		}
		if(inputStr=="销售顾问"){
			return "销售顾问";
		}
		if (inputStr.length >= 1) {
			return inputStr[0]+"**";
		}else{
			return "销售顾问";
		}
		
	}
});

App.filter('int',function(){
	return function(inputStr){
		return parseInt(inputStr);	
	}
})

App.filter('float',function(){
	return function(inputStr){
		return inputStr.split('.')[1];
	}
})
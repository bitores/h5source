define(['angular','angular-route','angular-ui-router','angular-resource','angular-animate','angular-messages','angular-cookies','angular-sanitize'],
	function(angular){
		console.log("app ....");
    return angular.module('app', ['ngRoute','ngResource','ngAnimate','ngMessages','ngCookies','ngSanitize']);
})
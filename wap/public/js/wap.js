!function(){var Config={baseUrl:"./",paths:{angular:"/angular/angular.min","angular-animate":"/angular-animate/angular-animate.min","angular-cookies":"/angular-cookies/angular-cookies.min","angular-messages":"/angular-messages/angular-messages.min","angular-resource":"/angular-resource/angular-resource.min","angular-route":"/angular-route/angular-route.min","angular-touch":"/angular-touch/angular-touch.min",zepto:"/zepto/zepto.min",config:"/js/config",Filters:"/js/filter/filters",Api:"/js/service/Api",Log:"/js/service/Log",Car:"/js/service/Car",IndexController:"/js/controller/indexCtrl"},shim:{angular:{exports:"angular"},"angular-animate":{deps:["angular"],exports:"angular-animate"},"angular-cookies":{deps:["angular"],exports:"angular-cookies"},"angular-messages":{deps:["angular"],exports:"angular-messages"},"angular-resource":{deps:["angular"],exports:"angular-resource"},"angular-route":{deps:["angular"],exports:"angular-route"},"angular-touch":{deps:["angular"],exports:"angular-touch"},zepto:{exports:"zepto"},jweixin:{exports:"jweixin"}},deps:["config","zepto"],urlArgs:"debug="+(new Date).getTime(),waitSeconds:0};require.config(Config),require(["zepto","angular","angular-route","angular-resource","angular-animate","angular-messages","angular-cookies","Filters","Api","Log","Car","IndexController"],function(nnd,angular,angular_route,angular_resource,angular_animate,angular_messages,angular_cookies,Filters,Api,Log,Car,IndexController){console.log("加载wap.js  Config");var app=angular.module("app",["ngRoute","ngResource","ngAnimate","ngMessages","ngCookies"]);app.filter("xx",Filters),app.service("Api",Api),app.service("Log",Log),app.service("Car",Car),app.controller("IndexController",IndexController),app.run(function($rootScope,$location,$routeParams,$route){console.log("app run ..."),$rootScope.goIndex=function(){console.log("go index..."),$location.path("/")}}),app.config(function($provide,$routeProvider,$locationProvider,$httpProvider){console.log("route config ..."),$routeProvider.when("/",{controller:"IndexController",templateUrl:"/index/V",resolve:{init:function($rootScope){console.log(1),$rootScope.footer=!0}}}).when("/index",{controller:"IndexController",templateUrl:"/index/V",resolve:{init:function($rootScope){$rootScope.footer=!0}}}).when("/index.html",{controller:"IndexController",templateUrl:"/index/V",resolve:{init:function($rootScope){}}}).when("/error/404",{controller:"ErrorController",templateUrl:"/error/404/V",resolve:{init:function($rootScope){}}}).when("/error/500",{controller:"ErrorController",templateUrl:"/error/500/V",resolve:{init:function($rootScope){}}}).otherwise({redirectTo:"/error/404"}),$httpProvider.defaults.headers.common.Accept="version=1.0.1&client_type=wap",$locationProvider.html5Mode(!0)}),angular.bootstrap(document,["app"])})}();
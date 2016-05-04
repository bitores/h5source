//https://github.com/kenkozheng/HTML5_research/tree/master/AngularRequireJS
console.log("require main.js")
var baseUrl = document.getElementById('main').getAttribute('data-baseurl');
// require config
var config = {
    "baseUrl": baseUrl,//依赖相对路径
	 //配置angular的路径
    "paths":{
    	// 一些库文件
        "angular":"/pkg/angular", 
        "angular-animate":"/pkg/angular-animate",
        "angular-cookies":"/pkg/angular-cookies",
        "angular-messages":"/pkg/angular-messages",
        "angular-resource":"/pkg/angular-resource",
        "angular-route":"/pkg/angular-route",
        "angular-ui-router":"/pkg/angular-ui-router",
        "angular-sanitize":"/pkg/angular-sanitize",
        "swiper":"/lib/swiper.min",
        "zepto":"/lib/zepto.min",
        //js文件
        'bootstrap': "/src/js/bootstrap",
        'app': "/src/js/app",
        'router': "/src/js/router",
        'init':"/src/js/init",
        //.....以及其他的js文件，这里省略
        'math':"/src/js/filter/math",
        'info':"/src/js/service/info",
        'indexCtr':"/src/js/controller/indexCtr",
        'alert':"/src/js/directives/alert"
        
    },
    //这个配置是你在引入依赖的时候的包名
    "shim":{
        "angular":{
            exports:"angular"
        },
		"angular-animate": {
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-animate"
        },
		"angular-cookies":  {
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-cookies"
        },
		"angular-messages":  {
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-messages"
        },
		"angular-resource":  {
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-resource"
        },
        "angular-route":{
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-route"
        },
        "angular-ui-router":{
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-ui-router"
        },
		"angular-sanitize":  {
        	deps: ['angular'],   //依赖什么模块
            exports:"angular-sanitize"
        },
		"swiper":  {
			exports:"swiper"
        },
		"zepto":  {
			exports:"zepto"
        },
    },
    deps:['init'],//先加载
    urlArgs: "bust=" + (new Date()).getTime(),  //防止读取缓存，调试用
    waitSeconds:0
};

// require.config(config);

// require run
//应用配置
require(['bootstrap'], function () {
    console.log('main app require');
});
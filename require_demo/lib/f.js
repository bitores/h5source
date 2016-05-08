// 第一种定义方式
// define('显式定义本模块名，默认为文件名',['依赖模块'],function(rquire,ex,module){
// 	return module.config();
// })

// 第二种定义方式
// define([],function(rquire,ex,module){
// 	return module.config();
// })

// 导入参数
// -- 无依赖时有默认导入参数，有依赖时导入参数与依赖有关

// 第三种定义方式，无依赖，但有导入参数
define(function(rquire,exports,module){
	// console.log(name);
	// 其模块配置来自 require config中的配置
	return module.config();
})
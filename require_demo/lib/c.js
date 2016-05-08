/// 同样可以显式依赖require 导入require
define(['lib/VALUE','require'],function(value,require){
	console.log("load c.js",value.API,require);
})
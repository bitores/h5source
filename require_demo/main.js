console.log('load main.js');
var reqone = require.config({
	config:{
		'*':{
			name:'Huang'
		},
		'lib/f':{
			API:'http://localhost/api',
			des:{
				name: 'huang',
				age: 12
			}
		}
		
	},
	paths:{
		c:'lib/c',
		d:'lib/d'
	},
	deps:['lib/a','b','lib/VALUE',function(err){
		console.log('load require deps')
	}],
	shim:{
		'c':[''],
		'd':['lib/b'],
		'lib/e':{
			deps:['lib/b'],
			exports:'xx',
			init: function(b){
				console.log('shime lib/e:',this,this.xx,b)
			}
		}
	}

});

console.log('reqone =',reqone);
console.log('require =',require);
// 有一个模块失败都不会执行成功回调---其实我希望必须执行此回调
require(['lib/f','d','c','lib/e'],function(F){
	console.log('-----------------');
	console.log("F:",F)
},function(err){
	console.log("err:",err);
	// 在模块载入失败回调中可以使用undef函数移除模块的注册
	var failedId = err.requireModules && err.requireModules[0];
	requirejs.undef(failedId);
});
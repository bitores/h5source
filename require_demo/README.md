require知识汇总
 
1、require版本 - require功能

2、require配置
	require.config
		config:
		paths:
		deps:[]
		shim:{
			deps:[]
			exports:'',
			init:function(){

			}
		}	
		...


3、require([],callback,errcallback);

4、define(['a','require'],function(r,require){})
   define(function(require,exports,module){})

define([],function(){

	return function(){

		var template = '<div style="display:block;width:100%;height:100px;line-height:100px;position:fixed;z-index:100;left:0;right:0;top:0;bottom:0;margin:auto;text-align:center;background-color:rgba(0,0,0,0.7);color:white;" ng-click="newFunc()">弹出框,{{title}}:{{info}}</div>';

		return {
			'restrict': 'AE',
			'template': template,
			'replace': true,
			// 'transclue': true,//定义父级元素容器，并使用属性 ng-transclude 作为其它元素占位符
			'scope':{
				'title':'=',// 双向绑定
				'newFunc':'&',// 函数
				'info':'@'// 字符串
			},
			'link': function(scope, ele, attr, otherCtrl){
				console.log(scope,ele,attr,otherCtrl)
				console.log('指令被编译完成时的回调');

				ele.on('$destroy',function(){
					//清理代码
				})

				scope.$watch('title',function(){
					// 监视代码
				})
			},
			'controller': function(){
				
			}
		}
	}

	
})
cnpm install

bower install

npm start

路由：
前端路由：AngularJS
后台路由：Express router

先后台路由，再 前端路由


每次url变化，有两次请求
第一次：返回 主模板（容器）
第二次：返回 子模板（放在ng-view中）


过程：
'/index'  ----> router.get('/index')...
'/index'  ----> $routerProvide.when('/index')
'child_tag' ---> templateUrl: 'child_tag'
'child_tag' ---> router.get('child_tag')...

这样就完成两次模板请求，但仅有一次url变化，显示'/index'
而 'child_tag' 不显示，仅 帮助未完成子模板请求


/index

router.get('/index')  --> $routerProvide.when('/index')

---> templateUrl: 'child_tag'  --> router.get('child_tag')


1、css 合并 - 每个页面/模块 中 类.class #id 固定域, 对于 元素不进行单独定义样式

	m-20160506
	m-index
	m-regin
2、Angularjs 路由

定义service
app.service注册后，在Angular函数中直接注入

添加angular 注意base的引入

3///
require define  顺序。。。

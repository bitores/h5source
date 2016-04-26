var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

//不生成MAP文件
elixir.config.sourcemaps = false;


//生产文件配置
elixir(function(mix) {

    
    //应用通用配置
    mix.scripts('resources/assets/js/kqcwap.js', 'public/js');
    
    //全局配置
    mix.scripts('resources/assets/js/lib/config.js', 'public/js/lib');
    
    //通用JS库
    mix.scripts('resources/assets/js/lib/require.js', 'public/js/lib');
    mix.scripts('resources/assets/js/lib/zepto.min.js', 'public/js/lib');
    mix.scripts('resources/assets/js/lib/angular.js', 'public/js/lib');
    mix.scripts('resources/assets/js/lib/app.js', 'public/js/lib');
    
    //angular 插件
    mix.scripts('resources/assets/js/lib/angular-cookies/angular-cookies.min.js', 'public/js/lib');
    mix.scripts('resources/assets/js/lib/angular-file-upload/angular-file-upload.min.js', 'public/js/lib');
    mix.scripts('resources/assets/js/lib/angular-mocks/angular-mocks.js', 'public/js/lib');
    mix.scripts('resources/assets/js/lib/angular-resource/angular-resource.min.js', 'public/js/lib');
    mix.scripts('resources/assets/js/lib/angular-animate/angular-animate.min.js', 'public/js/lib');
    mix.scripts('resources/assets/js/lib/angular-route/angular-route.min.js', 'public/js/lib');
    mix.scripts('resources/assets/js/lib/angular-route-segment/build/angular-route-segment.js', 'public/js/lib');
    mix.scripts('resources/assets/js/lib/angular-sanitize/angular-sanitize.min.js', 'public/js/lib');
    mix.scripts('resources/assets/js/lib/angular-scenario/angular-scenario.js', 'public/js/lib');
    
    //angular 顶层控制器
    mix.scripts('resources/assets/js/controller/KqcController.js', 'public/js/controller');
    
    //angular controller 控制器 统一使用require AMD规范写法
    mix.scripts('resources/assets/js/controller/BookController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/ClassController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/DemoController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/ListController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/ShowController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/IndexController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/brSearchController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/CarController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/CommunityController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/HelpController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/UserController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/PayController.js', 'public/js/controller');
    mix.scripts('resources/assets/js/controller/SearchController.js', 'public/js/controller');


    
    //angular direetives 指令 统一使用require AMD规范写法
    mix.scripts('resources/assets/js/direetives/MyDirective.js', 'public/js/direetives');
    mix.scripts('resources/assets/js/direetives/swiper.js', 'public/js/direetives');
    mix.scripts('resources/assets/js/direetives/slide.js', 'public/js/direetives');
    
    //angular filters 过滤器 统一使用require AMD规范写法
    mix.scripts('resources/assets/js/filters/isCapitalzed.js', 'public/js/filters');
    
    //angular services 服务 统一使用require AMD规范写法
    mix.scripts('resources/assets/js/services/DEMO.js', 'public/js/services');
    mix.scripts('resources/assets/js/services/Constants.js', 'public/js/services');
    
    mix.scripts('resources/assets/js/services/Car.js', 'public/js/services');
    mix.scripts('resources/assets/js/services/Common.js', 'public/js/services');
    mix.scripts('resources/assets/js/services/Community.js', 'public/js/services');
    mix.scripts('resources/assets/js/services/Help.js', 'public/js/services');
    mix.scripts('resources/assets/js/services/Index.js', 'public/js/services');
    mix.scripts('resources/assets/js/services/Order.js', 'public/js/services'); 
    mix.scripts('resources/assets/js/services/Pay.js', 'public/js/services');
    mix.scripts('resources/assets/js/services/Product.js', 'public/js/services');
    mix.scripts('resources/assets/js/services/User.js', 'public/js/services');
    mix.scripts('resources/assets/js/services/Search.js', 'public/js/services');
    
    //专题CSS 专题/活动页面走独立的页面结构
    
    //专题js 专题/活动页面走独立的页面结构
    
    //CSS样式 新站统一使用less管理样式  (不明白机制)可参考bootstrap
    mix.less('kqcwap.less', 'public/css/');

    //images
    mix.copy('resources/assets/img', 'public/img');
});
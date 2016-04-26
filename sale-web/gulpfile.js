var elixir = require('laravel-elixir');
//require('laravel-elixir-image');

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
elixir(function (mix) {

	//images
    mix.copy('resources/assets/images/', 'public/images');

    //通用JS不生成随机版本号
    mix.scripts('resources/assets/js/lib/require.js', 'public/js/lib/');
    mix.scripts('resources/assets/js/lib/jquery.min.js', 'public/js/lib/');
    mix.scripts('resources/assets/js/lib/jquery.lazyload.min.js', 'public/js/lib');

    //通用JS生成随机版本号
    // ---首页js

    mix.scripts('resources/assets/js/lib/webconfig.js', 'public/js/lib/');
     mix.scripts('resources/assets/js/index/index.js', 'public/js/');
    mix.scripts('resources/assets/js/lib/comm.js', 'public/js/lib/');
    mix.scripts('resources/assets/js/respond.min.js', 'public/js/');
    mix.scripts('resources/assets/js/html5shiv.min.js', 'public/js/');
    mix.scripts('resources/assets/js/slides.jquery.js', 'public/js/');
    mix.scripts('resources/assets/js/jquery.easing.1.3.js', 'public/js/');
    mix.scripts('resources/assets/js/index/index.js', 'public/js/');
    mix.scripts('resources/assets/js/modal.js', 'public/js/');
    
    // mix.scripts('resources/assets/js/dialog/lhgdialog.min.js', 'public/js/').version('js/dialog/lhgdialog.min.js');s
    mix.scripts('resources/assets/js/common.js', 'public/js/');
    mix.scripts('resources/assets/js/common2.js', 'public/js/');
    mix.scripts('resources/assets/js/footer.js', 'public/js/');
    mix.scripts('resources/assets/js/tucao.js', 'public/js/');


    // ---新闻js
    mix.scripts('resources/assets/js/news.js', 'public/js/');
    // ---品牌选车js
    mix.scripts('resources/assets/js/brand.js', 'public/js/');
    // ---车辆详情页js
    mix.scripts('resources/assets/js/newview.js', 'public/js/');
    // ---订单页js
    mix.scripts('resources/assets/js/sale.order.js', 'public/js/');

    //通用CSS
    //mix.less('lib/comm.less', 'public/css/').version('css/comm.css');
    mix.styles(['resources/assets/css/comm.css','resources/assets/css/comms.css'], 'public/css/comm.css');
    mix.styles('resources/assets/css/colors.css', 'public/css/colors.css');
    // ---首页css样式
    mix.styles(['resources/assets/css/index/index_new.css','resources/assets/css/index/bootstrap.min.css'], 'public/css/index/index_new.css');
    mix.styles(['resources/assets/css/index/index_new.css','resources/assets/css/index/bootstrap.min.css'], 'public/css/index/index_new.css');
    // ---通用css样式
    mix.styles(['resources/assets/css/reset.css','resources/assets/css/index.css','resources/assets/css/common.css','resources/assets/css/user.css','resources/assets/css/newtopfooter.css','resources/assets/css/index_1.css'], 'public/css/common.css');
    //---帮助中心css样式
    mix.styles('resources/assets/css/help.css', 'public/css/help.css');
    // ---新闻样式
    mix.styles('resources/assets/css/information.css', 'public/css/information.css');
    // ---品牌选车样式
    mix.styles('resources/assets/css/category.css', 'public/css/category.css');
    // ---车辆详情样式
    mix.styles('resources/assets/css/newview.css', 'public/css/newview.css');


    

    //JS
    //mix.scripts('resources/assets/js/index/index.js', 'public/js/index/').version('js/index/index.js');

    //CSS
    mix.less('resources/assets/less/index.less', 'public/css/newless.css');

    ////font
    //mix.copy('resources/assets/fonts', 'public/fonts');
    //mix.copy('resources/assets/font-awesome/fonts', 'public/font-awesome/fonts');

	
    //mix.styles('animate.css', 'public/css/');
    //mix.styles('bootstrap.min.css', 'public/css/');

    //
    //mix.scripts('jquery-ui.custom.min.js', 'public/js/');
    //mix.scripts('jquery-ui-1.10.4.min.js', 'public/js/');
    //mix.scripts('bootstrap.js', 'public/js/');
    //mix.scripts('bootstrap.min.js', 'public/js/');
    //mix.scripts('inspinia.js', 'public/js/');
 
    ////插件
    //mix.scripts('plugins/metisMenu/jquery.metisMenu.js', 'public/js/plugins/metisMenu/');
    //mix.scripts('plugins/slimscroll/jquery.slimscroll.min.js', 'public/js/plugins/slimscroll/');
    //mix.scripts('plugins/jquery-ui/jquery-ui.min.js', 'public/js/plugins/jquery-ui/');
    //mix.scripts('plugins/gritter/jquery.gritter.min.js', 'public/js/plugins/gritter/');
    //mix.scripts('plugins/sparkline/jquery.sparkline.min.js', 'public/js/plugins/sparkline/');
    //mix.scripts('plugins/peity/jquery.peity.min.js', 'public/js/plugins/peity/');
    //mix.scripts('plugins/chartJs/Chart.min.js', 'public/js/plugins/chartJs/');
    //mix.scripts('plugins/toastr/toastr.min.js', 'public/js/plugins/toastr/');
    //mix.scripts('plugins/pace/pace.min.js ', 'public/js/plugins/pace/');

    //mix.scripts('demo/sparkline-demo.js', 'public/js/demo/');
    //mix.scripts('demo/peity-demo.js', 'public/js/demo/');

    //mix.scripts('plugins/flot/jquery.flot.js', 'public/js/plugins/flot/');
    //mix.scripts('plugins/flot/jquery.flot.tooltip.min.js', 'public/js/plugins/flot/');
    //mix.scripts('plugins/flot/jquery.flot.spline.js', 'public/js/plugins/flot/');
    //mix.scripts('plugins/flot/jquery.flot.resize.js', 'public/js/plugins/flot/');
    //mix.scripts('plugins/flot/jquery.flot.pie.js', 'public/js/plugins/flot/');

    ////jquery_css
    //mix.styles('../js/plugins/gritter/jquery.gritter.css', 'public/js/plugins/gritter/');

    ////toastr_css
    //mix.styles('plugins/toastr/toastr.min.css', 'public/css/plugins/toastr/');

    ////c3_css
    //mix.styles('plugins/c3/c3.min.css', 'public/css/plugins/c3/');

    ////c3_js
    //mix.scripts('plugins/c3/c3.min.js', 'public/js/plugins/c3/');

    ////d3_js
    //mix.scripts('plugins/d3/d3.min.js', 'public/js/plugins/d3/');
   
});
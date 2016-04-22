// default settings. fis3 release

// // 开始autoCombine可以将零散资源进行自动打包
// fis.set('settings.postpackager.simple.autoCombine', true);
// //开启autoReflow使得在关闭autoCombine的情况下，依然会优化脚本与样式资源引用位置
// fis.set('settings.postpackager.simple.autoReflow', true);
// fis.set('settings.postpackager.simple.output', 'pkg/mcren_${hash}');

// Global start
fis.match('*.{js,css}', {
  useHash: true
});

fis.match('::image', {
  useHash: true
});

fis.match('*.js', {
	//https://github.com/mishoo/UglifyJS2#compressor-options
  optimizer: fis.plugin('uglify-js',{mangle: false})
});

fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
});

fis.match('*.html', {  
  //npm install -g fis-optimizer-html-minifier  
  optimizer: fis.plugin('html-minifier',{
  	//option https://github.com/kangax/html-minifier
  	minifyCSS: true,
  	minifyJS: true
  })  
});



//外联样式占位符<!--RESOURCEMAP_PLACEHOLDER--> pkg配置表占位符 暂时不用这个
//内联样式占位符<!--SCRIPT_PLACEHOLDER--> 必须

fis.match('::packager', {
    postpackager: function(ret,b,c,d){

        var _src = ret.src;
        for (var i in _src) {

        }

    }
});

fis.match('::packager', {
    postpackager: fis.plugin('loader', {
        useInlineMap: true,//使用内联模块静态表
//    allInOne: {
//      includeAsyncs: true,
////      ignore: ['/static/sea.js']
//    }
    },'prepend')
});

//合并打包需加
fis.match('::package', {
  postpackager: fis.plugin('loader')
});

// //css打包配置
// fis.match('*.css', {
//   packTo: '/static/aio.css'
// });

// //js打包配置
// fis.match('*.js', {
//   packTo: '/static/aio.js'
// });

// Global end

// default media is `dev`
fis.media('dev')
  .match('*', {
    useHash: false,
    optimizer: null
  });

// extends GLOBAL config
fis.media('production');
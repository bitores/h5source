//由于使用了bower，有很多非必须资源。通过set project.files对象指定需要编译的文件夹和引用的资源
// 对于文件夹，要写入//**
fis.set('project.files', ['bower_components/**/*','src/**','lib/**', 'common/**', 'map.json','index.html']);
// 配置按需编译：设置编译范围为 html 文件，不过 html 文件中使用到的资源也会参与编译。
// fis.set('project.files', '*.html');
// default settings. fis3 release

//http://cache.baiducontent.com/c?m=9d78d513d9971aee4fece4690d61c067690edd3e65c3975521dbc90ed5264c40347bfee47a74575a84846b6776f3140abda8776537747df7ced5ca198ce2c17d7895736f311d9141648944f2925125b77fcd0caef14e&p=8772c315d9c342a51fbe9b7c544781&newp=9b61c54ad6c04bf512b18f2d0214cf231610db2151ddda4f358888&user=baidu&fm=sc&query=fis%2Ehook&qid=8b8a09d40007724b&p1=1
// npm install -g fis3-hook-amd
// 解析 amd 依赖
// https://github.com/fex-team/fis3-hook-amd
// amd,moudle,closure,'',false 对isMod:true模块进行amd/cmd/closure包裹或不包裹
// npm install fis3-hook-module
// npm install fis3-hook-amd
// npm install fis3-hook-cmd
// npm install fis3-hook-commonjs
// http://www.tuicool.com/articles/qa2IB3q
// https://github.com/fex-team/fis3-hook-amd/blob/master/README.md
fis.hook('amd', {
  // "mode": 'amd',// mode 默认 auto 根据文件内容自动判断是 commonJs 还是 amd。不准确，建议设置其中一种
  // 配置项
  // "baseUrl": './js',//依赖相对路径
   //配置angular的路径
  // packages: [{
  //           name: 'dojo',
  //           location: 'dojo/1.7.1',
  //           main:'main'
  // }],
  // "paths":{
    // 一些库文件
      // "angular":"/bower_components/angular/angular", 
      // "angular-animate":"/bower_components/angular-animate/angular-animate",
      // "angular-cookies":"/bower_components/angular-cookies/angular-cookies",
      // "angular-messages":"/bower_components/angular-messages/angular-messages",
      // "angular-resource":"/bower_components/angular-resource/angular-resource",
      // "angular-route":"/bower_components/angular-route/angular-route",
      // "angular-ui-router":"/bower_components/angular-ui-router/angular-ui-router",
      // "angular-sanitize":"/bower_components/angular-sanitize/angular-sanitize",
      // "swiper":"/lib/swiper.min",
      // "zepto":"/lib/zepto.min",
      //js文件
      // 'bootstrap': ["/src/js/bootstrap1","/src/js/bootstrap2"],
      // 'app': "/src/js/app",
      // 'router': "/src/js/router",
      // 'init':"/src/js/init",
      // //.....以及其他的js文件，这里省略
      // 'math':"/src/js/filter/math",
      // 'info':"/src/js/service/info",
      // 'indexCtr':"/src/js/controller/indexCtr",
      // 'alert':"/src/js/directives/alert"
      
  // },
  // forwardDeclaration: false,
  // skipBuiltinModules: true,
  //这个配置是你在引入依赖的时候的包名
  // "shim":{
  //   "angular":{
  //     exports:"angular"
  //   }
    // ,
    // "angular-animate": {
    //   deps: ['angular'],   //依赖什么模块
    //   exports:"angular-animate"
    // },
    // "angular-cookies":  {
    //   deps: ['angular'],   //依赖什么模块
    //   exports:"angular-cookies"
    // },
    // "angular-messages":  {
    //   deps: ['angular'],   //依赖什么模块
    //   exports:"angular-messages"
    // },
    // "angular-resource":  {
    //   deps: ['angular'],   //依赖什么模块
    //   exports:"angular-resource"
    // },
    // "angular-route":{
    //   deps: ['angular'],   //依赖什么模块
    //   exports:"angular-route"
    // },
    // "angular-ui-router":{
    //   deps: ['angular'],   //依赖什么模块
    //   exports:"angular-ui-router"
    // },
    // "angular-sanitize":  {
    //   deps: ['angular'],   //依赖什么模块
    //   exports:"angular-sanitize"
    // },
    // "swiper":  {
    //   exports:"swiper"
    // },
    // "zepto":  {
    //   exports:"zepto"
    // }
  // },
  // deps:['init']
});

fis.match('*.{js,css}', {
  useHash: true
});

fis.match('::image', {
  useHash: true
});

// fis.match('/src/(**).js', {
//   isMod:true,
//   moduleId: '$1',
//   optimizer: fis.plugin('uglify-js')
// });

// fis.match('/lib/(**).js', {
  // useHash: false,
  // optimizer: null
// });


fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
});

/****************异构语言编译*****************/
//npm install -g fis-parser-node-sass
fis.match('**/*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass', {
        //fis-parser-node-sass option
    })
});

// npm install -g fis-parser-less-2.x
fis.match('**/*.less', {
    rExt: '.css', // from .less to .css
    parser: fis.plugin('less-2.x', {
        // fis-parser-less-2.x option
    })
});

// fis3 release -d output
// cd ./output
// cat ./style.css #view result

fis.match('*.css', {
  useHash: true, //default is `true`
  // compress css invoke fis-optimizer-clean-css
  optimizer: fis.plugin('clean-css', {
    // option of clean-css
  })
});

// You need install it.
// npm i fis-optimizer-html-minifier [-g]

fis.match('*.html', {  
  //npm install -g fis-optimizer-html-minifier  
  optimizer: fis.plugin('html-minifier',{
    //option https://github.com/kangax/html-minifier
    minifyCSS: true,
    minifyJS: true,
    preserveLineBreaks:true
  })  
});


//页面模板不用编译缓存
// fis.match(/.*\.(html|jsp|tpl|vm|htm|asp|aspx|php)$/, {
//     useCache: false,
//     useHash:true
// })

// map.json转移目录
fis.match('map.json', {
    release: '/config/$0'
});


// //所有页面中引用到的bower js资源
fis.match("bower_components/**/(*).js", {
    packTo: "/pkg/$1.js"
})
// //所有页面中引用到的bower css资源
fis.match("bower_components/**/(*).css", {
    packTo: "/pkg/$1.css"
});

/*模块化加载器配置*/
fis.match('::package', {  
  postpackager: fis.plugin('loader', {
    resourceType: 'amd',
    allInOne: true, //js&css打包成一个文件
    sourceMap: true, //是否生成依赖map文件
    useInlineMap: true //是否将sourcemap作为内嵌脚本输出
  })
})

// Global end

// default media is `dev`
// fis.media('dev')
//   .match('*', {
//     useHash: false,
//     optimizer: null
//   })
  

/**********************生产环境下CSS、JS压缩合并*****************/
//使用方法 fis3 release prod
fis.media('prod')
    //注意压缩时.async.js文件是异步加载的，不能直接用annotate解析
    .match('**.js', {
        preprocessor: fis.plugin('annotate'),
        optimizer: fis.plugin('uglify-js')
    })
    .match('/**(.async).js', {
        preprocessor: null,
        optimizer: null
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    })
    .match("/^lib/**.js$/", {
        packTo: "/static/$&"
    })
    //所有页面中引用到的bower js资源
    .match("bower_components/**/*.js", {
        packTo: "/pkg/vendor.js"
    })
    //所有页面中引用到的bower css资源
    .match("bower_components/**/*.css", {
        packTo: "/pkg/vendor.css"
    });
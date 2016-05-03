//由于使用了bower，有很多非必须资源。通过set project.files对象指定需要编译的文件夹和引用的资源
fis.set('project.files', ['bower_components/**/*','src/**','lib', 'common', 'map.json','index.html']);
// 配置按需编译：设置编译范围为 html 文件，不过 html 文件中使用到的资源也会参与编译。
// fis.set('project.files', '*.html');
// default settings. fis3 release

// npm install -g fis3-hook-amd
// 解析 amd 依赖
// https://github.com/fex-team/fis3-hook-amd
fis.hook('amd', {
  // 配置项
});

fis.match('*.{js,css}', {
  useHash: true
});

fis.match('::image', {
  useHash: true
});

fis.match('/src/*.js', {
  isMod:true,
  optimizer: fis.plugin('uglify-js')
});


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
  //invoke fis-optimizer-html-minifier
  optimizer: fis.plugin('html-minifier')
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
//由于使用了bower，有很多非必须资源。通过set project.files对象指定需要编译的文件夹和引用的资源
fis.set('project.files', ['bower_components/**/*','src/**','lib', 'common', 'map.json','index.html']);

// default settings. fis3 release

// Global start
fis.match('*.{js,css}', {
  useHash: true
});

fis.match('::image', {
  useHash: true
});

fis.match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
});


//所有页面中引用到的bower js资源
fis.match("bower_components/**/(*).js", {
    packTo: "/pkg/$1.js"
})
//所有页面中引用到的bower css资源
fis.match("bower_components/**/(*).css", {
    packTo: "/pkg/$1.css"
});



// Global end

// default media is `dev`
fis.media('dev')
  .match('*', {
    useHash: false,
    optimizer: null
  })
  

// extends GLOBAL config
fis.media('production')
  //所有页面中引用到的bower js资源
  .match("bower_components/**/*.js", {
      packTo: "/pkg/vendor.js"
  })
  //所有页面中引用到的bower css资源
  .match("bower_components/**/*.css", {
      packTo: "/pkg/vendor.css"
  });
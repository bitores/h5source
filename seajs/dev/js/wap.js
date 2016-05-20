seajs.config(
  // 路径配置 - 把~目录~的长路径变成短路径（具体到目录）
  paths: {
    'gallery': 'https://a.alipayobjects.com/gallery',
    'bower': '/bower_components',
    'publicjs': '/js'
  },

  // 别名配置 - 也是把~文件~的长路径变成短路径（具体到模块）
  alias: {
    "$": "bower/jquery/dist/jquery.js",
    "angularjs": "bower/angular/angular.js",
    "config": "publicjs/config.js"
  },

  // 变量配置
  vars: {
    'locale': 'zh-cn' //在模块标识中用 {key} 来表示变量(require({local}.js))
  },

  // 映射配置
  map: [
    ['http://example.com/js/app/', 'http://localhost/js/app/']
  ],

  // 预加载项 - (在老浏览器中，提前加载好 ES5 和 json 模块)
  preload: [
    // Function.prototype.bind ? '' : 'es5-safe',
    // this.JSON ? '' : 'json'
  ],

  // 调试模式 - 决策log输出和是否删除动态插入的script
  debug: true,

  // Sea.js 的基础路径 - 解析顶级标识时，会相对base路径来解析
  base: 'http://example.com/path/to/base/',

  // 文件编码 - 也可以是个函数 及返回值如 utf-8
  charset: 'utf-8'
});

seajs.use("config")

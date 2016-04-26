// 版本号
var version = new Date().getTime();
// 路径
var url = {
    http:"",
    img:""
}



//require 配置
var requireconfig = {
    paths: {
        'jquery': [
            'http://apps.bdimg.com/libs/jquery/1.11.1/jquery.min',
            '../lib/jquery.min'
        ],
        'jquery-lazyload': [
            'http://apps.bdimg.com/libs/jquery-lazyload/1.9.5/jquery.lazyload.min',
            '../lib/jquery.lazyload.min'
        ],
        'html5shiv.min': [
            'http://apps.bdimg.com/libs/jquery-lazyload/1.9.5/jquery.lazyload.min',
            '../html5shiv.min'
        ],
        // 'html5shiv.min': [
        //     'http://apps.bdimg.com/libs/html5shiv/r29/html5.min.js',
        //     '../html5shiv.min'
        // ],
        'respond.min': [
            'http://apps.bdimg.com/libs/respond.js/1.3.0/respond.min',
            '../respond.min'
        ],
        'comm': '/js/lib/comm' ,
        'common2': '/js/lib/common2' 
    },
    shim: {
        'jquery': {
            //deps: ['underscore', 'jquery'],
            exports: 'jquery'
        },
        'common2': {
            //deps: ['underscore', 'jquery'],
            exports: 'common2'
        }
    },
    fileExclusionRegExp: /build/,
    urlArgs: "v=" + version
}
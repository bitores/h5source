var express = require('express');
var router = express.Router();

router.all('*',function(req, res, next) {
    res.append("X-WebKit-CSP","script-src 'self' 'unsafe-inline' 'unsafe-eval' http://*.kuaiqiangche.com  http://*.kuaiqiangche.cn  http://*.kuaiqiangche.cc  http://*.kuaiqiangche.dev  https://*.kuaiqiangche.dev  https://*.kuaiqiangche.cn  https://*.kuaiqiangche.cc  https://*.kuaiqiangche.com  http://www.growingio.com  http://apps.bdimg.com  http://dn-growing.qbox.me  http://hm.baidu.com  http://v3.jiathis.com");
    res.append("X-Content-Security-Policy","script-src 'self' 'unsafe-inline' 'unsafe-eval' http://*.kuaiqiangche.com  http://*.kuaiqiangche.cn  http://*.kuaiqiangche.cc  http://*.kuaiqiangche.dev  https://*.kuaiqiangche.dev  https://*.kuaiqiangche.cn  https://*.kuaiqiangche.cc  https://*.kuaiqiangche.com  http://www.growingio.com  http://apps.bdimg.com  http://dn-growing.qbox.me  http://hm.baidu.com  http://v3.jiathis.com");
    res.append("Content-Security-Policy","script-src 'self' 'unsafe-inline' 'unsafe-eval' http://*.kuaiqiangche.com  http://*.kuaiqiangche.cn  http://*.kuaiqiangche.cc  http://*.kuaiqiangche.dev  https://*.kuaiqiangche.dev  https://*.kuaiqiangche.cn  https://*.kuaiqiangche.cc  https://*.kuaiqiangche.com  http://www.growingio.com  http://apps.bdimg.com  http://dn-growing.qbox.me  http://hm.baidu.com  http://v3.jiathis.com");
    next();
});

router.use(function(err, req, res, next) {
    res.status(404).json({code:"405"});
    res.status(500).json({code:"500"});
});

module.exports = router;
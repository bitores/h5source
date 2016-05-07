var express = require('express');
var router = express.Router();

/* GET 主模板-容器 */
router.get('/404', function(req, res, next) {
	res.render('index');
});

router.get('/500', function(req, res, next) {
	res.render('index');
});

/* GET 子模板-ng-view */
router.get('/404/V', function(req, res, next) {
	res.render('error/404');
});

router.get('/500/V', function(req, res, next) {
	res.render('error/500');
});

module.exports = router;
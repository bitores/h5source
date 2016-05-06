var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/:carid', function(req, res, next) {
	res.render('index');
});

router.get('/index/V', function(req, res, next) {
	res.render('home/kbj');
});

module.exports = router;
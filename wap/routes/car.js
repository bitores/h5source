var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/b:id', function(req, res, next) {
	res.render('index');
});

router.get('/b:id/s:id', function(req, res, next) {
	res.render('index');
});

router.get('/b:id/s:id/t:id', function(req, res, next) {
	res.render('index');
});

router.get('/brand/V', function(req, res, next) {
	res.render('car/brand');
});

router.get('/model/V', function(req, res, next) {
	res.render('car/model');
});

module.exports = router;
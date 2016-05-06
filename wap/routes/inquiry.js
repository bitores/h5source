var express = require('express');
var router = express.Router();

router.get('/inquiry', function(req, res, next) {
	res.render('index');
});

router.get('/inquiry/:id', function(req, res, next) {
	res.render('index');
});

router.get('/profile/:id', function(req, res, next) {
	res.render('index');
});

router.get('/result/V', function(req, res, next) {
	res.render('inquiry/result');
});

router.get('/offer/V', function(req, res, next) {
	res.render('seller/offerv2');
});

router.get('/main/V', function(req, res, next) {
	res.render('seller/main');
});

module.exports = router;
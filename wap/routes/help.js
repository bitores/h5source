var express = require('express');
var router = express.Router();

router.get('/help', function(req, res, next) {
	res.render('index');
});

router.get('/bargain/V', function(req, res, next) {
	res.render('help/bargainv2');
});

module.exports = router;
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	res.render('index');
});


router.get('/name', function(req, res, next) {
	res.render('index');
});

router.get('/avatar', function(req, res, next) {
	res.render('index');
});


module.exports = router;

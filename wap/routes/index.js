var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/index', function(req, res, next) {
	res.render('index');
});

router.get('/index.html', function(req, res, next) {
	res.render('index');
});


router.get('/index/V', function(req, res, next) {
	res.render('home/kbj');
});

module.exports = router;
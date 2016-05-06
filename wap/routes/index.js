var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'appname' ,"errors": false,"books": ["A", "B", "C"], name: "Bob", "book": {"name": "Hello", "price": 12.99}, namets: "Hello <em>World</em>","type": "text"});
});

router.get('/index', function(req, res, next) {
	res.render('index', { title: 'appname' ,"errors": false,"books": ["A", "B", "C"], name: "Bob", "book": {"name": "Hello", "price": 12.99}, namets: "Hello <em>World</em>","type": "text"});
});

router.get('/index.html', function(req, res, next) {
	res.render('index', { title: 'appname' ,"errors": false,"books": ["A", "B", "C"], name: "Bob", "book": {"name": "Hello", "price": 12.99}, namets: "Hello <em>World</em>","type": "text"});
});


router.get('/index/V', function(req, res, next) {
	res.render('home/home');
});

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index/index', { title: 'appname' ,"errors": false,"books": ["A", "B", "C"], name: "Bob", "book": {"name": "Hello", "price": 12.99}, namets: "Hello <em>World</em>","type": "text"});
});

router.get('/wap', function(req, res, next) {
	res.render('wap', { title: 'appname' ,"errors": false,"books": ["A", "B", "C"], name: "Bob", "book": {"name": "Hello", "price": 12.99}, namets: "Hello <em>World</em>","type": "text"});
});


//user  req.params.id == 用户ID
// router.get('/json', function(req, res, next) {
//   	res.json({ user: 'tobi' ,title: 'appname'});
// 	res.status(500).json({ error: 'message' });
// });

// router.get('/user/:id', function(req, res, next) {
//   res.json({ user: req.params.id ,title: 'appname'});
// });

// router.get('/', function(req, res, next) {
//   res.sendFile('/jade-demo/views/index.html', { title: 'appname' });
// });

module.exports = router;
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	res.render('user', { title: 'appname' });
});


//user  req.params.id == 用户ID
router.get('/:user_id', function(req, res, next) {
	res.json({ user: req.params.user_id ,title: 'appname'});
});

module.exports = router;

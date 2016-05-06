var express = require('express');
var router = express.Router();

router.get('/called', function(req, res, next) {
  res.render('index');
});

router.get('/feedback', function(req, res, next) {
  res.render('index');
});

router.get('/remark/:id', function(req, res, next) {
  res.render('index');
});

router.get('/report/:id', function(req, res, next) {
  res.render('index');
});

module.exports = router;

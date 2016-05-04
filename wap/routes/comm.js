var express = require('express');
var router = express.Router();

router.all('*', function(req, res, next){
    res.status(404).render('404');
    res.status(503).render('503');
});

// router.use(function(req, res, next) {
//   res.status(404).send('Sorry cant find that!');
// });

// router.use(function(err, req, res, next) {
//   res.status(500).send('Something broke!');
// });

module.exports = router;
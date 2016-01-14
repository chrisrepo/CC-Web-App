var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('homepage', { title: 'Express' });
});

module.exports = router;

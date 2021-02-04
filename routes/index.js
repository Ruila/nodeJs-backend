var express = require('express');
var router = express.Router();
var path = require('path');

var user = require('./users.js');

/* GET home page.-> /api */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
  console.log('in routes/index');
  // res.render('this is: localhost:port/api');
  next();
});

router.use('/user', user);

module.exports = router;

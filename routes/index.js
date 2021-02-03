var express = require('express');
var router = express.Router();

/* GET home page.-> /api */
router.get('/', function(req, res, next) {
  // res.render('is/api', { title: 'Express' });
  console.log('in routes/index');
  // res.render('this is: localhost:port/api');
});

module.exports = router;

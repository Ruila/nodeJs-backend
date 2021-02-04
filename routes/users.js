var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user.controller.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/')
  .get(userCtrl.userGet);

module.exports = router;

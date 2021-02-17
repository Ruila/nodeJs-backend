const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.controller.js');
// const { Joi, validate } = require('express-validation')
// const paramValidation = require('../config/paramValidation.js');
// const validation = {
//   params: Joi.object({ password: Joi.string().required() }),
// };
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/')
  .get(userCtrl.userGet)
  .post(userCtrl.userPost);

router.route('/login')
  .post(userCtrl.userLogin);

module.exports = router;


const Joi = require('joi');

module.exports =  {
    // POST /api/login
    login: {
      body: {
        email: Joi.string().required(), // 字串＋必填
        password: Joi.string().required(),
      }
    },
  
  };
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var index = require('../routes/index.js');

const app = express();

const port = 8000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// get home page
app.get('/', (req, res)=> {
    console.log('in config/express')
    res.send(`server started on port http://localhost:${port} haha`);
})

app.use('/api', index);

module.exports = app;
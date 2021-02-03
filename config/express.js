var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var index = require('../routes/index.js');

const app = express();

const port = 8000;


// // view engine setup
app.set('views', path.join(__dirname, '../views/'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public/')));

// get home page
app.get('/', (req, res)=> {
    console.log('in config/express');
    res.send(`server started on port http://localhost:${port} haha`);
})

app.use('/api', index);

module.exports = app;
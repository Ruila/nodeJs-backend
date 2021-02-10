var express = require('express');
var createError = require('http-errors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
const session = require('express-session');
var index = require('../routes/index.js');
const { RequestHeaderFieldsTooLarge } = require('http-errors');

const app = express();

const port = 8000;


// // view engine setup
app.set('views', path.join(__dirname, '../views/'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: '12ea21869a07c97d',
  name: 'sessionFromExpress',
  resave: true,
  saveUninitialized: true,
  
}))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.static(path.join(__dirname, '../public/')));


// get home page
app.get('/', (req, res)=> {
    res.send(`server started on port http://localhost:${port} haha`);
    
})

app.use('/api', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('errrrrror', req.sessionID)

  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
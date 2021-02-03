// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var mysql = require('mysql')

// const port = 8000;

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// //database

// // var connect = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: 'root',
// //   database: 'nodeJs_pratice',
// //   port: '8889'
// // })

// // connect.connect(function(err){
// //   if(err){
// //     console.log('connect error');
// //     return;
// //   }
// // })

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// app.listen(port, function(){
//   console.log(`example app listening on http://localhost:${port}`)
// })

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

var app = require('./config/express');

app.listen('8000', ()=> {
  console.log('got it')
})

module.exports = app;
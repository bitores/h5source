var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');


//定义API route
var api = require('./routes/api/api');

//定义页面route
var index = require('./routes/index');
var car = require('./routes/car');
var collection = require('./routes/collection');
var feedback = require('./routes/feedback');
var inquiry = require('./routes/inquiry');
var user = require('./routes/user');
// var bargain = require('./routes/help');

//定义通用状态返回页面
var comm_routes = require('./routes/comm');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 
app.set('view cache'); 

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(compression({filter: shouldCompress}))
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header 
    return false
  }
 
  // fallback to standard filter function 
  return compression.filter(req, res)
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));


//挂载通用状态返回页面
app.use('*', comm_routes);

//挂载页面route到API
app.use('/api', api);
//挂载页面route到APP
app.use('/', index);
app.use('/s', car);
app.use('/collection', collection);
app.use('/', feedback);
app.use('/', inquiry);
app.use('/u', user);
// app.use('/', bargain);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'production') {
// if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
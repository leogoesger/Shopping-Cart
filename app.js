require('babel-core/register')({
  "presets":["es2015", "react", "stage-1"]
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var httpProxy = require('http-proxy'); //PROXY
var requestHandler = require('./requestHandler') //REQUEST HANDLER FOR SERVER SIDE RENDERING
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//PROXY TO API
const apiProxy = httpProxy.createProxyServer({
  target: 'http://localhost:3001'
});
app.use('/api', function(req, res){
  apiProxy.web(req, res);
})
//END PROXY

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//Universal App
app.set('view engine', 'ejs');
app.use(requestHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

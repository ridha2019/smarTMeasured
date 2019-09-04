var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require('firebase');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
/*var moment = require('moment');
moment().format();*/
var index = require('./routes/index');
//var users = require('./routes/users');//--------------------------------------A REVOIR

var app = express();

var config = {
	apiKey: "AIzaSyBOvcyYDJ5rgQAY_5Pwdr6IY0PkArwlQqo",
	authDomain: "antennameasured.firebaseapp.com",
	databaseURL: "https://antennameasured.firebaseio.com",
	projectId: "antennameasured",
	storageBucket: "",
	messagingSenderId: "448978381040",
	appId: "1:448978381040:web:d20abf100a4aad4a"	
};

firebase.initializeApp(config);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/img', express.static(path.join(__dirname, 'public/imgs')));
app.use('/js', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'sarfaraz', saveUninitialized: false, resave: false }));//secret : process.env.SESSION_SECRET
console.log('-in app- before app.use');
app.use('/', index);
console.log('-in app- after app.use');
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('-in app- app.use');
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

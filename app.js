var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);



require('dotenv').config();
//require routes
var index = require('./routes/index');
var users = require('./routes/users');
var account = require('./routes/account');
var upload = require('./routes/upload');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



//connect to db
mongoose.connect("mongodb://localhost/glammycare");
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(session({
  secret: 'glammy-session',
  resave: true,
  saveUninitialized: false,
  cookie:{
    maxAge:31556952000
  },
  store : new MongoStore({
    mongooseConnection: db
  })
}))

//make userid available to templates
app.use(function(req,res,next){
  res.locals.currentUser  =  req.session.userId;
  next();
})


app.use('/', index);
app.use('/users', users);
app.use('/account',account);
app.use('/upload',upload);
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

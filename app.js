var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var prodlist = require('./routes/prodlist');
var active = require('./routes/active');
var recruitment = require('./routes/recruitment');
var uploadwines = require('./routes/uploadwines');
var postfile = require('./routes/postfile');
var getwines = require('./routes/getwines');
var editwines = require('./routes/editwines');
var deletewines = require('./routes/deletewines');
var postbanner = require('./routes/postbanner');
var getbanner = require('./routes/getbanner');
var deletebanner = require('./routes/deletebanner');
var uploadactives = require('./routes/uploadactives');
var getactives = require('./routes/getactives');
var deleteactives = require('./routes/deleteactives');
var editactives = require('./routes/editactives');
var login = require('./routes/login');
var proddetail = require('./routes/proddetail');
var savemessage = require('./routes/savemessage');
var getmessage = require('./routes/getmessage');
var delmessage = require('./routes/delmessage');
var uploadrecruitment = require('./routes/uploadrecruitment');
var getrecruitment = require('./routes/getrecruitment');
var delrecruitment = require('./routes/delrecruitment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/prodlist', prodlist);
app.use('/active', active);
app.use('/recruitment', recruitment);
app.use('/uploadwines', uploadwines);
app.use('/postfile', postfile);
app.use('/getwines', getwines);
app.use('/editwines', editwines);
app.use('/deletewines', deletewines);
app.use('/postbanner', postbanner);
app.use('/getbanner', getbanner);
app.use('/deletebanner', deletebanner);
app.use('/uploadactives', uploadactives);
app.use('/getactives', getactives);
app.use('/deleteactives', deleteactives);
app.use('/editactives', editactives);
app.use('/login', login);
app.use('/product', proddetail);
app.use('/savemessage', savemessage);
app.use('/getmessage', getmessage);
app.use('/delmessage', delmessage);
app.use('/uploadrecruitment', uploadrecruitment);
app.use('/getrecruitment', getrecruitment);
app.use('/delrecruitment', delrecruitment);

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

var express = require('express');
var logger = require('morgan');
var routes = require('./routes/');
var swig = require('swig');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

swig.setDefaults({ cache: false });
//app.use(app.router);

app.use(
  sass({
    src: __dirname + '/assets',
    dest: __dirname + '/public',
    debug: true
  })
);

var server = app.listen(3000);
var router = routes();
app.use('/', router);

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle any errors
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({error: err});
    res.render('error', {
      message: err.message,
      error: err
    });
});
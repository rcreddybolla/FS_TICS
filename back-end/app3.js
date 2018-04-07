var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport')
var LdapStrategy = require('passport-ldapauth');

var cred = 'Mummy@007';


var index = require('./routes/index');

var app = express();

passport.use(new LdapStrategy({
    server: {
      url: 'ldaps://172.27.146.12:636',
      bindDN: 'cn=shingal,ou=Users,dc=allegisgroup,dc=com',
      bindCredentials: cred,
      searchBase: 'dc=allegisgroup,dc=com',
      searchFilter: '(uid={{shingal}})'
    }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/login2', passport.authenticate('ldapauth', {session: false}), function(req, res) {
  res.send({status: 'ok'});
});

// For CORS
var originsWhitelist = [
  'http://localhost:4200',
  'http://localhost:4200/createTest'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//here is the magic
app.use(cors(corsOptions));
// For CORS

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {	
  var err = new Error('Not Found');
  err.status = 404;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("'Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

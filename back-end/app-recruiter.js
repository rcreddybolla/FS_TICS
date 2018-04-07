var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport')
var LdapStrategy = require('passport-ldapauth');
// var sys       = require('sys'),
//     ldapauth  = require('./ldapauth'); // Path to ldapauth.node

// var cred = 'Mummy@007';
// var scheme    = 'ldap',
//     ldap_host = 'ldap://172.27.146.12',
//     ldap_port = 636,
//     username  = 'shingal',
//     password  = 'Mummy@007'
//     base      = "OU=USERS,DC=ALLEGISGROUP,DC=com",
//     filter    = "(&(objectclass=user)(sAMAccountName=someone))";

// ldapauth.search(ldap_host, ldap_port, username, password, base, filter,
//   function(err, result) {
//     if (err) {
//       sys.puts(err);
//     } else {
//       sys.puts('Search: ' + JSON.stringify(result));
//     }
//   });

// ldapauth.authenticate(scheme, ldap_host, ldap_port, username, password,
//   function(err, result) {
//     if (err) {
//       sys.puts(err);
//     } else {
//       sys.puts('Auth: ' + result);
//     }
//   });

var index = require('./routes/route-recruiter');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

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

app.use(cors(corsOptions));
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

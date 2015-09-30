var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var app = express();
app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'abc123',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require('./config/mongoose');
require('./config/passport');
require('./config/routes')(app);

app.listen(8787, function () {
  console.log('lettuce eat at port 8787');
})
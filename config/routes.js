// var items = require('./../server/controllers/items');
var users = require('./../server/controllers/users');
var passport = require('passport');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.html');
  });

  app.post('/user/register', passport.authenticate('local-register', {
    successRedirect: '/dashboard',
    failureRedirect: '/landing',
    failureFlash: true
  }));

  app.post('/user/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/landing',
    failureFlash: true
  }));

  app.get('/user/logout', function (req, res) {
    users.logOut(req, res);
  });

  // app.get('/user/info', function (req, res) {
  //   res.json(req.user);
  // });

}
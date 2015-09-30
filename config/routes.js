// var items = require('./../server/controllers/items');
var users = require('./../server/controllers/users');
var passport = require('passport');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.html');
  });

  app.post('/user/register', function (req, res) {
    users.register(req, res);
  });

  app.get('/login/fail', function (req, res) {
    res.send(req.flash());
  })

  app.post('/user/login', passport.authenticate('local', {failureRedirect: '/login/fail', failureFlash: true}), function (req, res) {
    res.json(req.user);
  });

  app.get('/user/info', function (req, res) {
    res.json(req.user);
  })

  app.get('/user/logout', function (req, res) {
    users.logOut(req, res);
  });

  // app.post('/list/add', function (req, res) {
  //   items.add(req, res);
  // });

  // app.get('/user/:id', function (req, res) {
  //   users.getOne(req, res);
  // })

  // app.get('/item/done/:id', function (req, res) {
  //   items.toggleDone(req, res);
  // });
}
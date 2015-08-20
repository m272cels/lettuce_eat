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

  app.post('/user/login', passport.authenticate('local'), function (req, res) {
    // users.logIn(req, res);
    res.json(req.session);
  });

  app.get('/user/info', function (req, res) {
    res.json(req.session);
  })

  // app.get('/user/all', function (req, res) {
  //   users.getAll(req, res);
  // });

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
var yelps = require('./../server/controllers/yelps');
var socials = require('./../server/controllers/socials');
var events = require('./../server/controllers/events');
var users = require('./../server/controllers/users');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.html');
  });

  app.post('/users/register', function (req, res) {
    users.register(req, res);
  });

  app.post('/users/login', function (req, res) {
    users.logIn(req, res);
  });

  app.get('/users/logout', function (req, res) {
    users.logOut(req, res);
  });

  app.get('/users/this', function (req, res) {
    res.json(req.user);
  });

  app.get('/auth/facebook', function (req, res) {
    socials.fbLogIn(req, res);
  });

  app.get('/auth/facebook/callback', function (req, res) {
    socials.fbLogIn(req, res);
  });

  app.post('/yelp/search', function (req, res) {
    yelps.search(req, res);
  });

  app.post('/events', function (req, res) {
    events.create(req, res);
  });

  app.get('/events', function (req, res) {
    events.index(req, res);
  })
}
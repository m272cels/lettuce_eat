// var mongoose = require('mongoose');
// var User = mongoose.model('User');
var passport = require('passport');

var authenticate = function (req, res, strategy) {
  passport.authenticate(strategy, function (err, user, info) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      res.send(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err);
      }
      res.json(user);
    });
  })(req, res);
}

module.exports = {
  register: function (req, res) {
    authenticate(req, res,'local-register'); 
  },
  logIn: function (req, res) {
    authenticate(req, res, 'local-login');
  },
  logOut: function (req, res) {
    req.logout();
    res.end();
  }
  // // getAll: function (req, res) {
  //   User.find({}, function (err, results) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     else {
  //       res.json(results);
  //     }
  //   })
  // },
  // getOne: function (req, res) {
  //   User.findOne({_id: req.params.id}).deepPopulate('list._owner').exec( function (err, results) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     else {
  //       res.json(results);
  //     }
  //   })
  // }
}
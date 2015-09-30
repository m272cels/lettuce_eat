var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  register: function (req, res) {
    User.findOne({email: req.body.email}, function (err, result) {
      if (result) {
        res.json(
        {
          errors: {
            email: "An account with this email already exists!"
          }
        });
      }
      else {
        var user = new User(req.body);
        user.provider = 'local';
        user.save( function (err, result) {
          req.login(user, function (err) {
            res.json(req.user);
          });
        });
      }
    });
  },
  logOut: function (req, res) {
    req.logout();
    res.end();
  }
  // logIn: function (req, res) {
  //   User.findOne({name: req.body.name}).deepPopulate('list._owner').exec( function (err, result) {
  //     if (result) {
  //       res.json(result);
  //     }
  //     else {
  //       var user = new User({
  //         name: req.body.name,
  //         list: []
  //       });
  //       user.save( function (err, result) {
  //         res.json(result);
  //       });
  //     }
  //   });
  // },
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
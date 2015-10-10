var passport = require('passport');

module.exports = {
  fbLogIn: function (req, res) {
    passport.authenticate('facebook', function (err, user, info) {
      if (err) {
        console.log(err);
      }
      if (!user) {
        console.log("didn't authorize fb login")
        res.redirect("/");
      }
      console.log("authorized fb login")
      req.logIn(user, function (err) {
        if (err) {
          console.log(err);
        }
        res.redirect("/");
      });
    })(req, res); 
  }
};
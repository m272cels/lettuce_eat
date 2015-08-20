var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('mongoose').model('User');

passport.serializeUser( function (user, done) {
  done(null, user.id);
});

passport.deserializeUser( function (id, done) {
  User.findOne({_id: id}, '-password', function (err, user) {
    done(err, user);
  })
})

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log('no user found with this email')
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.authenticate(password)) {
        console.log('password is incorrect for this email')
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('successful login')
      return done(null, user);
    });
  }
));
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

// passport.use(new LinkedInStrategy({
//     consumerKey: LINKEDIN_API_KEY,
//     consumerSecret: LINKEDIN_SECRET_KEY,
//     callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

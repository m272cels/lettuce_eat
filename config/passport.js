var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('mongoose').model('User');

passport.serializeUser( function (user, done) {
  done(null, user.id);
});

passport.deserializeUser( function (id, done) {
  User.findOne({_id: id}).exec( function (err, user) {
    done(err, user);
  })
})

passport.use("local-login", new LocalStrategy({
    usernameField: 'email'
  },
  function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'No account with this email exists.' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
);

passport.use("local-register", new LocalStrategy({
    usernameField: 'email'
  },
  function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { 
        return done(err);
      }
      if (user) {
        return done(null, false, { message: 'A user with this email already exists.' });
      }
      var newUser = new User();
      newUser.local.email = username;
      newUser.local.password = newUser.generateHash(password);
      newUser.save( function (err) {
        return done(null, newUser);
      })
    });
  })
);

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

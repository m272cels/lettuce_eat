var LocalStrategy = require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('mongoose').model('User');
var configAuth = require('./auth');

module.exports = function (passport) {
  passport.serializeUser( function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser( function (id, done) {
    User.findOne({_id: id}).select('-local.password').exec( function (err, user) {
      done(err, user);
    })
  })

  passport.use("local-login", new LocalStrategy({
      usernameField: 'email'
    },
    function (email, password, done) {
      User.findOne({ 'local.email': email }, function (err, user) {
        if (err) { 
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'No account with this email exists.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        user.local.password = undefined;
        return done(null, user);
      });
    })
  );

  passport.use("local-register", new LocalStrategy({
      usernameField: 'email',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      User.findOne({ 'local.email': email }, function (err, user) {
        if (err) { 
          return done(err);
        }
        if (user) {
          return done(null, false, { message: 'A user with this email already exists.' });
        }
        var newUser = new User();
        newUser.local.first_name = req.body.first_name;
        newUser.local.last_name = req.body.last_name;
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);
        newUser.save( function (err) {
          newUser.local.password = undefined;
          return done(null, newUser);
        })
      });
    })
  );

  passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        else {
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = accessToken;
          var space = profile.displayName.indexOf(" ");
          newUser.facebook.first_name = profile.displayName.substring(0, space);
          newUser.facebook.last_name = profile.displayName.substring(space + 1);
          // newUser.facebook.email = profile.emails[0].value;
          newUser.save( function (err) {
            return done(null, newUser);
          });
        }
      })
    }))

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
}

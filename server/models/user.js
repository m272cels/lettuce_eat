var mongoose = require('mongoose');
var crypto = require('crypto');
// var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  provider: String,
  providerId: String,
  providerData: {}
  // events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});
// UserSchema.plugin(deepPopulate);
UserSchema.pre('save',
  function(next) {
    if (this.password) {
      var md5 = crypto.createHash('md5');
      this.password = md5.update(this.password).digest('hex');
    }

    next();
  }
);

UserSchema.methods.authenticate = function(password) {
  var md5 = crypto.createHash('md5');
  md5 = md5.update(password).digest('hex');

  return this.password === md5;
};

mongoose.model('User', UserSchema);
// var User = mongoose.model('User', UserSchema);

// var dummy = new User({
//   name: 'null',
//   list: []
// });
// dummy.save( function (err, result) {});

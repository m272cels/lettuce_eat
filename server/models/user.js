var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// var crypto = require('crypto');
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
// UserSchema.pre('save',
//   function(next) {
//     if (this.password) {
//       var md5 = crypto.createHash('md5');
//       this.password = md5.update(this.password).digest('hex');
//     }

//     next();
//   }
// );
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

UserSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

mongoose.model('User', UserSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = mongoose.Schema({
  name: String,
  datetime: Date,
  location: String,
  host: {type: Schema.Types.ObjectId, ref: 'User'},
  attendees: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

mongoose.model('Event', EventSchema);
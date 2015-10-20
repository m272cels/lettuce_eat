var Event = require('mongoose').require('Event');

module.exports = {
  create: function (req, res) {
    console.log(req.body);
    // console.log(typeof req.body.time);
    // console.log(typeof req.body.date);
    // console.log(typeof req.body.datetimeLocal);
    var time = Date(req.body.time);
    var date = Date(req.body.date);
    var datetime = Date(req.body.datetimeLocal);
    console.log(time);
    console.log(date);
    console.log(datetime);
    // console.log(req.body.time + req.body.date);

  }
}
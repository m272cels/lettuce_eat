var Event = require('mongoose').model('Event');
var yelps = require('./yelps');
var async = require('async');

module.exports = {
  create: function (req, res) {
    var newEvent = new Event();
    newEvent.name = req.body.name;
    newEvent.datetime = req.body.date.substring(0,11) + req.body.time.substring(11);
    newEvent.location = req.body.location;
    newEvent.save( function (err) {
      // if (err) { console.log(err); }
      res.json(newEvent);
      // console.log(newEvent);
    });
  },
  index: function (req, res) {
    Event.find({}, function (err, results) {
      if (err) {
        console.log(err);
      }
      else {
        // console.log(results);
        // results.map( function (event) {
        async.map(results, yelps.findBiz, function (err, results) {
          if (err) {
            console.log(err);
          }
          else {
            // console.log(results);
            console.log('async callback')
            res.json(results);            
          }
        });
      }
    })
  }
}
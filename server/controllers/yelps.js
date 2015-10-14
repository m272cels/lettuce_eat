var https = require('https');
var configAuth = require('../../config/auth');


module.exports = {
  search: function (req, res) {
    console.log(req.body);
    var options = {
      hostname: "api.yelp.com",
      path: "/v2/search/?category_filter=restaurants",
      method: 'GET'
    }
    if (req.body.find) {
      if (req.body.find.location) {
        options.path += "&location="+req.body.find.location;
      }
      if (req.body.find.term) {
        options.path += "&term="+req.body.find.term;
      }
    }
    options.path += "&oauth_consumer_key=" + configAuth.yelpAuth.consumerKey;
    options.path += "&oauth_token=" + configAuth.yelpAuth.token;
    options.path += "&oauth_signature_method=hmac-sha1";
    var request = https.get(options, function (response) {
      response.on('data', function (data) {
        process.stdout.write(data);
      });
      response.on('end', function () {
        console.log("response ended");
      });
    });
    request.on('error', function (err) {
      console.log(err.message);
    })
    res.send();
  }
}
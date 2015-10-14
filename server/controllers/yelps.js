var https = require('https');
var configAuth = require('../../config/auth');
var OAuth = require('oauth-1.0a');

module.exports = {
  search: function (req, res) {
    var req_data = {
      url: "https://api.yelp.com/v2/search/?category_filter=restaurants&location=sf",
      method: 'GET'
    }
    if (req.body.find) {
      if (req.body.find.location) {
        req_data.url = req_data.url.substring(0, req_data.url.length-2) + req.body.find.location;
      }
      if (req.body.find.term) {
        req_data.url += "&term="+req.body.find.term;
      }
    }
    var oauth = OAuth({
      consumer: {
        public: configAuth.yelpAuth.consumerKey,
        secret: configAuth.yelpAuth.consumerSecret
      },
      signature_method: 'HMAC-SHA1'
    });
    var token = {
      public: configAuth.yelpAuth.token,
      secret: configAuth.yelpAuth.tokenSecret
    }
    // console.log(oauth.toHeader(oauth.authorize(req_data, token)));
    var options = {
      hostname: 'api.yelp.com',
      path: req_data.url.substring(20),
      method: 'GET',
      headers: oauth.toHeader(oauth.authorize(req_data, token))
    }
    // options.path += "&oauth_consumer_key=" + configAuth.yelpAuth.consumerKey;
    // options.path += "&oauth_token=" + configAuth.yelpAuth.token;
    // options.path += "&oauth_signature_method=hmac-sha1";
    var yelpResponse;
    var request = https.get(options, function (response) {  
      response.on('data', function (data) {
        // process.stdout.write(data);
        // console.log('doing res.json')
        return res.json(data);    
        // yelpResponse = data;
        // process.nextTick( function () {
          // res.json(data);
        // })
      });
      response.on('end', function () {
        console.log("response ended");
      });
    });
    request.on('error', function (err) {
      console.log(err.message);
    })
    // console.log('doing res.send')
    // res.send();
  }
}
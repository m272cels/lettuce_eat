// var https = require('https');
var configAuth = require('../../config/auth');
var OAuth = require('oauth-1.0a');
var request = require('request');

module.exports = {
  search: function (req, res) {
    console.log(req.body);
    var req_data = {
      url: "https://api.yelp.com/v2/search/?category_filter=restaurants&location=sf",
      method: 'GET'
    }
    if (req.body) {
      if (req.body.location) {
        req_data.url = req_data.url.substring(0, req_data.url.length-2) + req.body.location;
      }
      if (req.body.term) {
        req_data.url += "&term="+req.body.term;
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
    // var options = {
    //   hostname: 'api.yelp.com',
    //   path: req_data.url.substring(20),
    //   method: 'GET',
    //   headers: oauth.toHeader(oauth.authorize(req_data, token))
    // }
    // var yelpResponse;
    // var request = https.get(options, function (response) {  
    //   response.on('data', function (data) {  
    //     if (!yelpResponse) {
    //       yelpResponse = data;
    //     }
    //     else {
    //       yelpResponse = Buffer.concat([yelpResponse, data]);
    //     }
    //   });
    //   response.on('end', function () {
    //     console.log("response ended");
    //     console.log(yelpResponse.toString());
    //     res.json(yelpResponse.toString());
    //   });
    // });
    // request.on('error', function (err) {
    //   console.log(err.message);
    // })
    request({
      url: req_data.url,
      method: req_data.method,
      headers: oauth.toHeader(oauth.authorize(req_data, token))
    }, function (error, response, body) {
      // console.log("here?");
      // console.log("error: ", error);
      // console.log("response: ", response);
      // console.log("body: ", body);
      res.json(JSON.parse(body));
    });
  }
}
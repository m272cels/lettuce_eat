lettuceEat.factory('lettuceFactory', function ($http) {
  // var users = [];
  // var user = {};
  var restaurants = {};
  var newEvent = {};

  var factory = {};
  factory.logIn = function (userInfo, callback) {
    $http.post('/users/login', userInfo).then( function (response) {
      callback(response.data);
    });
  }
  factory.logOut = function (callback) {
    $http.get('/users/logout').then( function () {
      callback();
    });
  }
  factory.registerUser = function (newUser, callback) {
    $http.post('/users/register', newUser).then( function (response) {
        callback(response.data);
      });
  }
  factory.getUser = function (callback) {
    $http.get('/users/this').then( function (response) {
      callback(response.data);      
    });
  }
  // factory.facebookLogin = function (callback) {
  //   console.log('ng fb login start')
  //   $http.get('/auth/facebook').then( function (response) {
  //     console.log('ng fb login end')
  //     callback(response.data);
  //   })
  // }
  factory.findRestaurant = function (searchTerms, callback) {
    // console.log(searchTerms);
    $http.post("/yelp/search", searchTerms).then( function (response) {
      // console.log(response.data);
      restaurants = response.data;
      callback(restaurants);
    });
  }
  factory.getRestaurants = function (callback) {
    callback(restaurants);
  }
  factory.chooseLocation = function (yelpInfo, callback) {
    newEvent.location = yelpInfo;
    callback();
  }
  factory.getNewEventLocation = function (callback) {
    callback(newEvent);
  }
  factory.createEvent = function (eventInfo, callback) {
    eventInfo.location = eventInfo.location.id;
    // console.log(eventInfo);
    $http.post("/events", eventInfo).then( function (response) {
      console.log(response)
      callback(response.data.id);
    }); 
  }
  factory.getEvents = function (callback) {
    $http.get("/events").then( function (response) {
      console.log(response);
      callback(response.data);
    })
  }
  // factory.getUserById = function (id, callback) {
  //   $http.get('/user/'+id).then( function (response) {
  //     callback(response.data);
  //   });
  // }
  return factory;
})
lettuceEat.factory('lettuceFactory', function ($http) {
  // var users = [];
  // var user = {};

  var factory = {};
  factory.logIn = function (userInfo, callback) {
    $http.post('/user/login', userInfo).then( function (response) {
      callback(response.data);
    });
  }
  factory.logOut = function (callback) {
    $http.get('/user/logout').then( function () {
      callback();
    });
  }
  factory.registerUser = function (newUser, callback) {
    $http.post('/user/register', newUser).then( function (response) {
      callback(response.data);
    });
  }
  factory.getUser = function (callback) {
    $http.get('/user/info').then( function (response) {
      callback(response.data);      
    })
  }

  factory.getUserById = function (id, callback) {
    $http.get('/user/'+id).then( function (response) {
      callback(response.data);
    });
  }
  return factory;
})
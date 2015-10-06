lettuceEat.factory('lettuceFactory', function ($http) {
  // var users = [];
  // var user = {};

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
        console.log("success response");
        console.log(response);
        callback(response.data);
      });
  }
  factory.getUser = function (callback) {
    $http.get('/users/this').then( function (response) {
      callback(response.data);      
    });
  }

  // factory.getUserById = function (id, callback) {
  //   $http.get('/user/'+id).then( function (response) {
  //     callback(response.data);
  //   });
  // }
  return factory;
})
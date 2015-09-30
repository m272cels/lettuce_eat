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

  // factory.getAllUsers = function (callback) {
  //   $http.get('/user/all').then( function (response) {
  //     users = response.data;
  //     callback(users);
  //   });
  // }

  // factory.addItem = function (item, callback) {
  //   $http.post('/list/add', item).then( function (response) {
  //     console.log(response.data);
  //     user = response.data;
  //     callback(user);
  //   });
  // }

  // factory.toggleDone = function (item_id, callback) {
  //   $http.get('/item/done/'+item_id);
  // }
  return factory;
})
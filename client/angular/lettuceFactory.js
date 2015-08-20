lettuceEat.factory('lettuceFactory', function ($http) {
  var users = [];
  var user = {};

  var factory = {};
  factory.logIn = function (userInfo, callback) {
    $http.post('/user/login', userInfo).then( function (response) {
      console.log(response.data);
      // user = response.data;
      // callback();

    }, function (error) {
      console.log('bad login');
      console.log(error);
    });
  }
  factory.registerUser = function (newUser, callback) {
    $http.post('/user/register', newUser).then( function (response) {
      console.log(response.data.errors);
      if (response.data.errors) {
        callback(response.data.errors);
      }
      else {
        user = response.data;
        callback();
      }
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
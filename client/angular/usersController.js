lettuceEat.controller('usersController', function ($scope, $location, lettuceFactory) {

  lettuceFactory.getUser( function (user) {
    if (!user) {
      $location.path('/');
    }
    else {
      $scope.user = user;
    }
  });

  $scope.logIn = function () {
    $scope.logErrors = {};
    lettuceFactory.logIn($scope.userInfo, function (user) {
      if (user.message) {
        $scope.logErrors.message = user.message;
      }
      else {
        $('#loginModal').modal('hide');
        $scope.user = user;
        $location.path('/dashboard');
        console.log($scope.user);
      }
    });
  }

  $scope.logOut = function () {
    lettuceFactory.logOut( function () {
      $scope.user = undefined;
      $location.path('/');
    });
  }

  $scope.register = function () {
    $scope.regErrors = {};
    lettuceFactory.registerUser($scope.newUser, function (user) {
      if (user.message) {
        $scope.regErrors.message = user.message;
      }
      else {
        console.log(user);
        $('#registerModal').modal('hide');
        $scope.user = user;
        $location.path('/dashboard');
      }
    });
  }

})
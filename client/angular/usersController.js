lettuceEat.controller('usersController', function ($scope, $location, lettuceFactory) {

  lettuceFactory.getUser( function (user) {
    if (!user) {
      $location.path('/landing');
    }
    else {
      $scope.user = user;
    }
  })

  $scope.logIn = function () {
    $scope.logErrors = {};
    lettuceFactory.logIn($scope.user, function (user) {
      if (user.error) {
        $scope.logErrors.error = user.error[0]
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
      $location.path('/landing');
    });
  }
  $scope.register = function () {
    $scope.regErrors = {};
    if ($scope.newUser.password !== $scope.newUser.confirm) {
      $scope.regErrors.confirm = "Please make sure your passwords match.";
    }
    else {
      $scope.newUser.confirm = undefined;
      lettuceFactory.registerUser($scope.newUser, function (user) {
        if (user.errors) {
          $scope.regErrors = user.errors;
        }
        else {
          console.log(user);
          $('#registerModal').modal('hide');
          $scope.user = user;
          $location.path('/dashboard');
        }
      });
    }
  }

})
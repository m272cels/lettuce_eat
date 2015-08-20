lettuceEat.controller('usersController', function ($scope, $location, lettuceFactory) {

  $scope.logIn = function () {
    $scope.logErrors = {};
    console.log($scope.user);
    lettuceFactory.logIn($scope.user, function () {
      // $location.path('/dashboard');
    });
  }
  $scope.register = function () {
    $scope.regErrors = {};
    console.log($scope.newUser);
    if ($scope.newUser.password !== $scope.newUser.confirm) {
      $scope.regErrors.confirm = "Please make sure your passwords match.";
    }
    else {
      $scope.newUser.confirm = undefined;
      lettuceFactory.registerUser($scope.newUser, function (errors) {
        if (errors) {
          $scope.regErrors = errors;
          console.log($scope.regErrors);
        }
        else {
          console.log('success! redirect now');
          // $location.path('/dashboard');
        }
      });
    }
  }

})
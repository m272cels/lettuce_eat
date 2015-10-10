lettuceEat.controller('facebookController', function ($scope, $location, lettuceFactory) {

  $scope.logIn = function () {
    $scope.logErrors = {};
    lettuceFactory.facebookLogin(function (user) {
      if (user.message) {
        $scope.logErrors.message = user.message;
      }
      else {
        $('#loginModal').modal('hide');
        $scope.user = user;
        $location.path('/dashboard');
        console.log($scope.user);
      }
    })
  }
});
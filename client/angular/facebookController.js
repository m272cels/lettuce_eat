lettuceEat.controller('facebookController', function ($scope, $location, lettuceFactory) {

  $scope.logIn = function () {
    $http.get('facebook-auth-route', function (response) {
      
    })
  }
});
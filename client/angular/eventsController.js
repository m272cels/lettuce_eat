lettuceEat.controller('eventsController', function ($scope, $location, lettuceFactory) {

  if (!navigator.geolocation) {
    $scope.locError = "Geolocation is not supported by your browser. Please input a location below."
  }

  $scope.search = function () {
    lettuceFactory.findRestaurant($scope.location, $scope.food) {

    }
  }

  $scope.useCurrentLocation = function () {
    
  }

})
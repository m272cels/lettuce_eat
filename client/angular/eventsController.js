lettuceEat.controller('eventsController', function ($scope, $location, lettuceFactory) {

  if (!navigator.geolocation) {
    $scope.locError = "Geolocation is not supported by your browser. Please input a location below."
  }

  lettuceFactory.getRestaurants( function (restaurants) {
    $scope.restaurants = restaurants;
  })

  $scope.find = {};

  $scope.search = function () {
    console.log($scope.find.location);
    console.log($scope.find.food);
    console.log(navigator.geolocation);
    lettuceFactory.findRestaurant($scope.find, function (response) {
      // console.log("ng-events");
      // console.log(response);
      $scope.restaurants = response;
      $location.path('/search');
    });
  }

  $scope.useCurrentLocation = function () {
    
  }

})
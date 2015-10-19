lettuceEat.controller('eventsController', function ($scope, $location, lettuceFactory) {
  $scope.find = {};

  // navigator.geolocation.getCurrentPosition( function (data) {
    // console.log(data);
    // $scope.find.location = data;
  // });

  if (!navigator.geolocation) {
    $scope.locError = "Geolocation is not supported by your browser. Please input a location below."
  }

  lettuceFactory.getRestaurants( function (data) {
    $scope.restaurants = data.businesses;
  });

  lettuceFactory.getNewEventLocation( function (data) {
    console.log(data);
    $scope.newEvent = data;
    if (!data.location) {
      $scope.newEvent = {
        location: {
          name: "Pieology Pizzeria",
          rating_img_url: "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_4.png",
          rating: 4,
          url: "http://www.yelp.com/biz/pieology-pizzeria-san-jose",
          location: {
            display_address: ['1095 E. Brokaw Rd', 'North San Jose', 'San Jose, CA, 95132']
          },
          id: "pieology-pizzeria-san-jose"
        }
      }
    }
  })

  $scope.findRestaurant = function () {
    // console.log('searching...');
    // console.log($scope.find);
    // console.log($scope.find.food);
    // console.log(navigator.geolocation);
    $scope.loading = true;
    lettuceFactory.findRestaurant($scope.find, function (response) {
      // console.log("found!");
      // console.log(response);
      // $scope.restaurants = response.businesses;
      $location.path('/events/create/1');
      $scope.restaurants = response.businesses;
      $scope.loading = false;
      console.log($scope.restaurants[0]);
    });
  }

  $scope.chooseLocation = function (yelpInfo) {
    console.log(yelpInfo);
    lettuceFactory.chooseLocation(yelpInfo, function () {
      $location.path('/events/create/2');
    });
  }

  $scope.createEvent = function () {
    // console.log($scope.newEvent);
    lettuceFactory.createEvent($scope.newEvent, function () {
      console.log("back to eventsController");
    })
  }

  $scope.useCurrentLocation = function () {
    
  }

})
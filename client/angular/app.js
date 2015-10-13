//socket code goes here


var lettuceEat = angular.module('lettuceEat', ['ngRoute']);

lettuceEat.config( function ($routeProvider) {
  $routeProvider
    .when('/landing', {
      templateUrl: '/partials/landing.html'
    })
    .when('/dashboard', {
      templateUrl: '/partials/dashboard.html'
    })
    .when('/event/location', {
      templateUrl: '/partials/search.html'
    })
    .otherwise({
      redirectTo: '/landing'
    });
});

lettuceEat.config( function () {
  //add some interceptor middleware here to check whether users are logged in and redirect
})
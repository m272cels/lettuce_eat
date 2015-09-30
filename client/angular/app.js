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
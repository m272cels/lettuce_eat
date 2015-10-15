//socket code goes here


var lettuceEat = angular.module('lettuceEat', ['ngRoute']);

lettuceEat.config( function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/landing.html',
      controller: 'usersController'
    })
    .when('/dashboard', {
      templateUrl: '/partials/dashboard.html',
      controller: 'usersController'
    })
    .when('/search', {
      templateUrl: '/partials/search.html',
      controller: 'eventsController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

lettuceEat.config( function () {
  //add some interceptor middleware here to check whether users are logged in and redirect
});
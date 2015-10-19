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
    .when('/events', {
      templateUrl: '/partials/search.html',
      controller: 'eventsController'
    })
    .when('/events/create/1', {
      templateUrl: '/partials/create-1.html',
      controller: 'eventsController'
    })
    .when('/events/create/2', {
      templateUrl: '/partials/create-2.html',
      controller: 'eventsController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

lettuceEat.config( function () {
  //add some interceptor middleware here to check whether users are logged in and redirect
});
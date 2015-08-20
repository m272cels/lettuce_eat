//socket code goes here


var lettuceEat = angular.module('lettuceEat', ['ngRoute']);

lettuceEat.config( function ($routeProvider) {
  $routeProvider
    // .when('/', {
    //   templateUrl: '/partials/login.html'
    // })
    // .when('/dashboard', {
    //   templateUrl: '/partials/dashboard.html'
    // })
    // .when('/user/:id', {
    //   templateUrl: '/partials/user.html'
    // })
    .otherwise({
      redirectTo: '/'
    });
});
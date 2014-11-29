/* App Module */

var dmhyBotApp = angular.module('dmhyBotApp', [
  'ngRoute',
  'dmhyBotCtrls'
]);

dmhyBotApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }).
      when('/history', {
        templateUrl: 'templates/history.html',
        controller: 'historyCtrl'
      }).
      when('/search', {
          templateUrl: 'templates/search.html',
          controller: 'searchingCtrl'
      }).
      when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

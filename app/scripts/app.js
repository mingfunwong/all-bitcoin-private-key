'use strict';

/**
 * @ngdoc overview
 * @name allKeyApp
 * @description
 * # allKeyApp
 *
 * Main module of the application.
 */
angular
  .module('allKeyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/page/:id', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/word', {
        templateUrl: 'views/word.html',
        controller: 'WordCtrl',
        controllerAs: 'word'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

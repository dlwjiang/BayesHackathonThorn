'use strict';

/**
 * @ngdoc overview
 * @name bayesThornApp
 * @description
 * # bayesThornApp
 *
 * Main module of the application.
 */
angular
  .module('bayesThornApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'angularCharts'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

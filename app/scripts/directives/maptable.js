'use strict';

/**
 * @ngdoc directive
 * @name bayesThornApp.directive:mapTable
 * @description
 * # mapTable
 */
angular.module('bayesThornApp')
  .directive('mapTable', function () {
    return {
      templateUrl: "./directiveTemplates/mapTable.html",
      restrict: 'E',
      scope: true,
      controller: function($scope) {

      	// console.log("this is mapTable controller", $scope.mapData);
      	// this.mapData = $scope.mapData;
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  });

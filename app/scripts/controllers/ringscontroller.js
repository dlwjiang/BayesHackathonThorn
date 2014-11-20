'use strict';

/**
 * @ngdoc function
 * @name bayesThornApp.controller:RingscontrollerCtrl
 * @description
 * # RingscontrollerCtrl
 * Controller of the bayesThornApp
 */
angular.module('bayesThornApp')
  .controller('RingsController', ["$scope", "dataFetcher", function ($scope, dataFetcher) {
    
    var promise = dataFetcher.getData2('./data/AggregatedGroup.json');
    promise.then(function(rawData) {

      var dataObj   = dataFetcher.formatData(rawData);
      var countsMax = dataObj.countsMax;
      var pricesMax = dataObj.pricesMax;
      var data      = dataObj.data;

      $scope.totalData = data;
      $scope.pricesMax = pricesMax;
      $scope.countsMax = countsMax;        

    })


 }]);

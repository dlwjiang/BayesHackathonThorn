'use strict';

/**
 * @ngdoc function
 * @name bayesThornApp.controller:TotalmapcontrollerCtrl
 * @description
 * # TotalmapcontrollerCtrl
 * Controller of the bayesThornApp
 */
angular.module('bayesThornApp')
  .controller('TotalMapController', ["$scope", "dataFetcher", function ($scope, dataFetcher) {

      var promise = dataFetcher.getData2('./data/AggregatedData.json');
      promise.then(function(rawData) {

        var dataObj   = dataFetcher.formatData(rawData);
        var countsMax = dataObj.countsMax;
        var pricesMax = dataObj.pricesMax;
        var data      = dataObj.data;

        $scope.mapData   = data[data.length - 1].payload;
        $scope.pricesMax = pricesMax;
        $scope.countsMax = countsMax;        

      })

 }]);

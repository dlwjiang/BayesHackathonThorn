'use strict';

/**
 * @ngdoc function
 * @name bayesThornApp.controller:MapcontrollerCtrl
 * @description
 * # MapcontrollerCtrl
 * Controller of the bayesThornApp
 */
angular.module('bayesThornApp')
  .controller('MapController', ["$scope", "dataFetcher", "$timeout", function ($scope, dataFetcher, $timeout) {
   
    var promise = dataFetcher.getData2('./data/AggregatedData.json');
    promise.then(function(rawData) {

      var dataObj   = dataFetcher.formatData(rawData);
      var countsMax = dataObj.countsMax;
      var pricesMax = dataObj.pricesMax;
      var data      = dataObj.data;

      var index = 0;
      function updateData() {

        if (index >= data.length){
          console.log("you've reached the end");
          return;
        }

        $scope.mapData   = data[index].payload;
        $scope.yearMonth = data[index].timestamp;
        $scope.pricesMax = pricesMax;
        $scope.countsMax = countsMax;        

        $timeout(function() {
          updateData();
          index += 1 ;
        },2000);

      }
      updateData();

    })

}]);

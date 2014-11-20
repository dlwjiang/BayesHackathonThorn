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

      var promise = dataFetcher.getData('./data/AggregatedData.json');
      promise.then(function(rawData) {

        var dataObj   = dataFetcher.formatData(rawData);
        var countsMax = dataObj.countsMax;
        var pricesMax = dataObj.pricesMax;
        var data      = dataObj.data;

        //initialize with the last element of the array as it has the most data
        var currentIndex = data.length - 1;
        $scope.mapData   = data[currentIndex].payload;
        $scope.yearMonth = data[currentIndex].timestamp;
        $scope.pricesMax = pricesMax;
        $scope.countsMax = countsMax; 

        $scope.$broadcast("stateClicked", {
                            "cities": _.omit(data[currentIndex].payload["CA"], ["prices", "counts"]), 
                            "state": "CA"
                            });


        $scope.nextMap = function() {

          currentIndex = ++currentIndex % data.length;
          $scope.mapData = data[currentIndex].payload;
          $scope.yearMonth = data[currentIndex].timestamp;

        }

        $scope.previousMap = function() {
          
          if (--currentIndex < 0) {
            currentIndex = data.length - 1;
          } else {
            $scope.mapData = data[currentIndex].payload;
            $scope.yearMonth = data[currentIndex].timestamp;
          }

        }

      });

 }]);

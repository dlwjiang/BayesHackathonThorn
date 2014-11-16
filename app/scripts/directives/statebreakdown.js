'use strict';

/**
 * @ngdoc directive
 * @name bayesThornApp.directive:stateBreakdown
 * @description
 * # stateBreakdown
 */
angular.module('bayesThornApp')
  .directive('stateBreakdown', function () {
    return {
    	scope: true,
    	templateUrl: "./directiveTemplates/stateBreakdownTemplate.html",
      restrict: 'E',
      controller: function($scope) {

				$scope.$on("stateClicked", function(event, data) {

					var stateTotal = _.reduce(data.cities, function(memo, value, index) {
							return memo + value.totalNumberAds;
					},0);

					//append the percentage data to original dataset
					_.each(data.cities, function(value, key, cities) {
							cities[key].percentageTotal = ((value.totalNumberAds/stateTotal) * 100).toFixed(2) + "%";
					})

					$scope.cities = data.cities;
					$scope.state = data.state;
					$scope.$apply();

				});

				$scope.state = "---";
      	$scope.cities = {
							"1": { "avgAge": "---", "totalNumberAds": "---" },
							"2": { "avgAge": "---", "totalNumberAds": "---" },
							"3": { "avgAge": "---", "totalNumberAds": "---" },
							"4": { "avgAge": "---", "totalNumberAds": "---" },
							"5": { "avgAge": "---", "totalNumberAds": "---" }
						};
      },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });

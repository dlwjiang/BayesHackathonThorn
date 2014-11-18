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

      	//initiate with fake data
				$scope.state = "---";
      	$scope.cities = {
							"1": { "avgPricePerAd": "---", "totalNumberAds": "---" },
							"2": { "avgPricePerAd": "---", "totalNumberAds": "---" },
							"3": { "avgPricePerAd": "---", "totalNumberAds": "---" },
							"4": { "avgPricePerAd": "---", "totalNumberAds": "---" },
							"5": { "avgPricePerAd": "---", "totalNumberAds": "---" }
						};

				//listen and update data on changes
				$scope.$on("stateClicked", function(event, data) {

					var stateTotal = _.reduce(data.cities, function(memo, value, index) {
							return memo + value.totalNumberAds;
					},0);

					//append the percentage data to original dataset
					_.each(data.cities, function(value, key, cities) {
							cities[key].percentage = parseFloat((value.totalNumberAds/stateTotal));
					})

					$scope.cities = data.cities;
					$scope.state = data.state;
					$scope.$apply();

				});
      },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });

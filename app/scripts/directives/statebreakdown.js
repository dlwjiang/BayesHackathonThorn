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
							"1": { "avgAge": "---", "totalNumberAds": "---" },
							"2": { "avgAge": "---", "totalNumberAds": "---" },
							"3": { "avgAge": "---", "totalNumberAds": "---" },
							"4": { "avgAge": "---", "totalNumberAds": "---" },
							"5": { "avgAge": "---", "totalNumberAds": "---" }
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

				console.log("what does the data look like: ", data.cities);
					$scope.cities = data.cities;
					$scope.state = data.state;
					$scope.$apply();

				});
      },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });

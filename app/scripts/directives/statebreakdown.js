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
    	templateUrl: "./directiveTemplates/stateBreakdownTemplate.html",
      restrict: 'E',
      controller: function($scope) {

      	function randNum(max) {
						return Math.round(max * Math.random());
				}

				$scope.$on("stateClicked", function(event, data) {
					$scope.cities = data.cities;
					$scope.state = data.state;
					$scope.$apply();
				});

				$scope.state = "lala land";
      	$scope.cities = {
							"city1": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city2": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city3": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city4": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city5": { "avgAge": randNum(20), "totalNumberAds": randNum(400) }
						};
      },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });

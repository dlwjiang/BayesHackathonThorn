'use strict';

/**
 * @ngdoc function
 * @name bayesThornApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bayesThornApp
 */
angular.module('bayesThornApp')
  .controller('MainCtrl', ["$scope", function ($scope) {



		  var statesInitials = [
				  "HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
			    "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
			    "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
			    "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
			    "WI", "MO", "AR", "OK", "KS", "LS", "VA"
			 ];

  		/*=================================
  		=            First Map            =
  		=================================*/

  		var aggregatedStateData = {};
  		var aggregatedStateData2 = {};

      statesInitials.forEach(function(d){ 

					var avgAge         = Math.round(19*Math.random());
					var totalNumberAds = Math.round(1000*Math.random()); 

					function randNum(max) {
						return Math.round(max * Math.random());
					}

          aggregatedStateData[d]={
						avgAge         : avgAge,
						totalNumberAds : totalNumberAds,
						color          :d3.interpolate("#fff", "#df1d2c")(totalNumberAds/1000),
						cities:{
							"city1": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city2": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city3": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city4": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city5": { "avgAge": randNum(20), "totalNumberAds": randNum(400) }
						}
          }; 

          aggregatedStateData2[d]={
						avgAge         : avgAge,
						totalNumberAds : totalNumberAds,
						color          :d3.interpolate("#fff", "#0000ff")(totalNumberAds/1000),
						cities:{
							"city1": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city2": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city3": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city4": { "avgAge": randNum(20), "totalNumberAds": randNum(400) },
							"city5": { "avgAge": randNum(20), "totalNumberAds": randNum(400) }
						}
          }; 

      });      

      $scope.mapData = aggregatedStateData;
      $scope.mapData2 = aggregatedStateData2;

    // $scope.config = {
    //     title: 'Products',
    //     tooltips: true,
    //     labels: false,
    //     mouseover: function() {},
    //     mouseout: function() {},
    //     click: function() {},
    //     legend: {
    //       display: true,
    //       //could be 'left, right'
    //       position: 'right'
    //     }
    //   };

    //   $scope.data = {
    //     series: ['Sales', 'Income', 'Expense', 'Laptops', 'Keyboards'],
    //     data: [{
    //       x: "Laptops",
    //       y: [100, 500, 0],
    //       tooltip: "this is tooltip"
    //     }, {
    //       x: "Desktops",
    //       y: [300, 100, 100]
    //     }, {
    //       x: "Mobiles",
    //       y: [351]
    //     }, {
    //       x: "Tablets",
    //       y: [54, 0, 879]
    //     }]
    //   };


  }]);

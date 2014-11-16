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


  		var sampleData = {};

	    ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
	    "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
	    "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
	    "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
	    "WI", "MO", "AR", "OK", "KS", "LS", "VA"]

      .forEach(function(d){ 

					var avgAge         = Math.round(19*Math.random());
					var totalNumberAds = Math.round(1000*Math.random()); 

          sampleData[d]={
						avgAge: avgAge,
						totalNumberAds: totalNumberAds,
						color :d3.interpolate("#ffffcc", "#800026")(totalNumberAds/1000)
          }; 

      });

      $scope.mapData = sampleData;

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

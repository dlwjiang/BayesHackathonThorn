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
    var dates,
  	    orginalData,
  	    numOfLoops = 0,
  	    index = 0;

  	var statesInitials = [
  	    "HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
  	    "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
  	    "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
  	    "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
  	    "WI", "MO", "AR", "OK", "KS", "LS", "VA"
  	 ];

  	var totalData = [];

  	dataFetcher.getData('./data/AggregatedGroup.json')
  	  .then(function( data ){

				dates       = data.dates;
				orginalData = data.data;
				numOfLoops  = dates.length;
			  //numOfLoops = 10;

				while (index < numOfLoops){
  	    	populateMap(orginalData, dates);
  	    	index += 1;
				}

				$scope.totalData = totalData;

  	});

  	function populateMap (total, dates) {

  	  if (index >= numOfLoops) {
  	      return;
  	  }

  	  var date = dates[index];
  	  index += 1;

  	  var aggregatedStateData = {};

  	  /*=================================
  	  =            First Map            =
  	  =================================*/

      var totalNumRange = [];
      var pricesRange = [];

      // Get the range of total number of counts & range of prices at this date
      statesInitials.forEach(function(state){
        var data = total[date][state];

        if (data) {
          totalNumRange.push(data.counts);
          pricesRange.push(data.prices);
        }
      });

  	  statesInitials.forEach(function(state){ 
        var data = total[date][state];

  	    if (!data) {
  	      aggregatedStateData[state] = {
  	        totalNumberAds: '--',
  	        color: "#fff",
  	        cities: []
  	      };

  	    } else {

  	      var cities = {};
  	      var citiesArray = Object.keys(data);

  	      citiesArray.forEach(function(city){
  	          if ( ["counts", "prices" ].indexOf(city) == -1) {

  	            cities[city] = {
                  avgPricePerAd: (data[city].prices || "--"),
  	              totalNumberAds: data[city].counts
  	            }
  	          }
  	      });

  	      aggregatedStateData[state] = {
  	        totalNumberAds: data.counts,
            avgPricePerAd: (data.prices || "--"),
  	        color: colorplate("#fff", "#000", totalNumRange, data.counts),
  	        cities: cities
  	      }

        }

  	  });

  	  totalData.push(aggregatedStateData);

  	}

    function colorplate (startColor, endColor, range, d) {                                                               
      var maxData = Math.max.apply(null, range);

      if (d && maxData) {
        return d3.interpolate(startColor, endColor)(d/maxData);
      }
        
      return "#fff";
    }

 }]);

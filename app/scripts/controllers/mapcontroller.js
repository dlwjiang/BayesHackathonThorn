'use strict';

/**
 * @ngdoc function
 * @name bayesThornApp.controller:MapcontrollerCtrl
 * @description
 * # MapcontrollerCtrl
 * Controller of the bayesThornApp
 */
angular.module('bayesThornApp')
  .controller('MapController', ["$scope", "dataFetcher", function ($scope, dataFetcher) {
    
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

  	dataFetcher.getData()
  	  .then(function( data ){

				dates       = data.dates;
				orginalData = data.data;
				//numOfLoops  = dates.length;
				numOfLoops = 5;
				console.log(dates, orginalData);

  	    populateMap(orginalData, dates);
  	});

  	
  	function populateMap (total, dates) {

  	  if (index >= numOfLoops) {
  	      return;
  	  }

  	  var date = dates[index];
  	  index += 1;

  	  var aggregatedStateData = {};
  	  var aggregatedStateData2 = {};

  	  /*=================================
  	  =            First Map            =
  	  =================================*/

  	  statesInitials.forEach(function(state){ 

  	    var data = total[date][state];
  	    var avgAge         = Math.round(19*Math.random());
  	    var totalNumberAds = Math.round(1000*Math.random()); 

  	    function randNum(max) {
  	      return Math.round(max * Math.random());
  	    }

  	    if (!data) {
  	      aggregatedStateData[state] = {
  	        avgAge: '--',
  	        totalNumberAds: '--',
  	        color: "#fff",
  	        cities: []
  	      }
  	    } else {

  	      var cities = {};
  	      var citiesArray = Object.keys(data);


  	      citiesArray.forEach(function(city){
  	          if (city !== 'counts' && city !== 'prices') {
  	            cities[city] = {
  	              avgAge: randNum(20),
  	              totalNumberAds: data[city].counts
  	            }
  	          }
  	      });

  	      // console.log("real data for : ", state);

  	      var coolthing = aggregatedStateData[state] = {
  	        avgAge: avgAge,
  	        totalNumberAds: data.counts,
  	        color: d3.interpolate("#fff", "#ff0000")(data.counts),
  	        cities: cities
  	      }

  	    }

  	    aggregatedStateData2[state]={
  	      avgAge         : avgAge,
  	      totalNumberAds : totalNumberAds,
  	      color          : d3.interpolate("#fff", "#0000ff")(totalNumberAds/1000),
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

  	  setTimeout(function(){ 
  	  	populateMap(total, dates); 
  	  	$scope.$apply(); 
  	  }, 500);

  	}


  }]);

'use strict';

/**
 * @ngdoc service
 * @name bayesThornApp.dataFetcher
 * @description
 * # dataFetcher
 * Factory in the bayesThornApp.
 */
angular.module('bayesThornApp')
  .factory('dataFetcher', function ($q, $http) {

    var exports = {};

    function getDates (data) {

      var dates = Object.keys(data);
      dates.sort(comparator);

      return dates;

    }

    function comparator (a, b) {

      var d1 = new Date(a.replace('-', '/'));
      var d2 = new Date(b.replace('-', '/'));

      if ( (d1 - d2) > 0) { return  1; }
      if ( (d1 - d2) < 0) { return -1; }

      return 0;
    }

    exports.getData = function (url) {

      var deferred = $q.defer();

      $http.get(url)
           .success(function (data) {
              var obj = {
                dates: getDates(data), 
                data: data
              };
              exports.data = obj;
              deferred.resolve(obj);
           })
           .error(function (data) {
              deferred.reject(null);
           });

          return deferred.promise;
    }

    exports.getData2 = function (url) {

      var deferred = $q.defer();

      $http.get(url)
           .success(function (data) {
              deferred.resolve(data);
           })
           .error(function (data) {
              deferred.reject(null);
           });

          return deferred.promise;
    }

    var statesInitials = [
        "HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
        "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
        "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
        "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
        "WI", "MO", "AR", "OK", "KS", "LS", "VA"
     ];

    // color information is appended based on colorKey
    // e.g. pass in "prices" to base color on prices
    exports.formatData = function(data) {

        var formattedData = [];
        var finalResult = [];

        /* create an array of objects with keys: timestamp, payload
        ===============================================================*/
        _.each(data, function(value, key) {
          var elem = {};
          elem.timestamp = key;
          elem.payload   = value;
          formattedData.push(elem);
        })

        /* order the array by timestamp.
        ===============================================================*/
        var orderedFormattedData = _.sortBy(formattedData, function(each) {
          var date = new Date(each.timestamp.replace('-', '/'));
          return date.getTime();
        })

        /* find max price and max count
        ===============================================================*/
        var countsMax = 0;
        var pricesMax = 0;
        for (var i = 0; i < orderedFormattedData.length; i++) {

          //loop through the states
          _.each(orderedFormattedData[i].payload, function(stateValues,stateKey) {
            if (stateValues.counts > countsMax) { countsMax = stateValues.counts; }
            var cities = _.omit(stateValues, ["prices", "counts"]);

            //loop through the cities
            _.each(cities, function(cityValues, cityKey) {
              if (cityValues.prices > pricesMax) { pricesMax = cityValues.prices; }
            })

          })
        };

        /* loop through each timestamped aggregated and adjust the payload
        /* to include all states.
        ===============================================================*/
        _.each(orderedFormattedData, function(each) {

          _.each(statesInitials, function(eachState) {

            // append placeholder empty data if no data for state found
            if (!(eachState in each.payload)){
              each.payload[eachState] = {
                counts : 'unknown',
                prices : 'unknown',
                // color  : "#fff",
                cities : []
              }
            } 

          })//end inner each

        })//end outer each

        return {
          countsMax: countsMax,
          pricesMax: pricesMax,
          data: orderedFormattedData
        }

    }

    function createColor (startColor, endColor, range, d) {                                                               

      var maxData = Math.max.apply(null, range);
      if (d && maxData) {
        return d3.interpolate(startColor, endColor)(d/maxData);
      }
      return "#fff";
      
    }

    return exports;

    // var dates,
    //     orginalData,
    //     numOfLoops = 0,
    //     index = 0;


    // var totalData = [];

    // dataFetcher.getData('./data/AggregatedGroup.json')
    //   .then(function( data ){

    //     dates       = data.dates;
    //     orginalData = data.data;
    //     numOfLoops  = dates.length;

    //     while (index < numOfLoops){
    //       populateMap(orginalData, dates);
    //       index += 1;
    //     }

    //     $scope.totalData = totalData;

    // });

    // function populateMap (total, dates) {

    //   if (index >= numOfLoops) {
    //       return;
    //   }

    //   var date = dates[index];
    //   index += 1;

    //   var aggregatedStateData = {};

    //   /*=================================
    //   =            First Map            =
    //   =================================*/

    //   var totalNumRange = [];
    //   var pricesRange = [];

    //   // Get the range of total number of counts & range of prices at this date
    //   statesInitials.forEach(function(state){
    //     var data = total[date][state];

    //     if (data) {
    //       totalNumRange.push(data.counts);
    //       pricesRange.push(data.prices);
    //     }
    //   });

    //   statesInitials.forEach(function(state){ 
    //     var data = total[date][state];

    //     if (!data) {
    //       aggregatedStateData[state] = {
    //         totalNumberAds: '--',
    //         color: "#fff",
    //         cities: []
    //       };

    //     } else {

    //       var cities = {};
    //       var citiesArray = Object.keys(data);

    //       citiesArray.forEach(function(city){
    //           if ( ["counts", "prices" ].indexOf(city) == -1) {

    //             cities[city] = {
    //               avgPricePerAd: (data[city].prices || "--"),
    //               totalNumberAds: data[city].counts
    //             }
    //           }
    //       });

    //       aggregatedStateData[state] = {
    //         totalNumberAds: data.counts,
    //         avgPricePerAd: (data.prices || "--"),
    //         color: colorplate("#fff", "#000", totalNumRange, data.counts),
    //         cities: cities
    //       }

    //     }

    //   });

    //   totalData.push(aggregatedStateData);

    // }

    // function colorplate (startColor, endColor, range, d) {                                                               
    //   var maxData = Math.max.apply(null, range);

    //   if (d && maxData) {
    //     return d3.interpolate(startColor, endColor)(d/maxData);
    //   }
        
    //   return "#fff";
    // }

  });

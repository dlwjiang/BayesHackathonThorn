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

    exports.getData = function (url) {

      var deferred = $q.defer();

      $http.get(url, {cache: true})
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
                cities : []
              }
            } 

          })//end inner each

        })//end outer each

        return {
          countsMax : countsMax,
          pricesMax : pricesMax,
          data      : orderedFormattedData
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

});

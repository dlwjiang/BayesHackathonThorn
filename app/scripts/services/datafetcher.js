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

    // Private functions here
    function comparator (a, b) {

      var d1 = new Date(a.replace('-', '/')),
          d2 = new Date(b.replace('-', '/'));

      if ( (d1 - d2) > 0) {return  1; }
      if ( (d1 - d2) < 0) {return -1; }

      return 0;
    }

    // Public API here
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
    
    return exports;

  });

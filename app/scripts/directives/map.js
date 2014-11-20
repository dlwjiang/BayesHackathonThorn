'use strict';

/**
 * @ngdoc directive
 * @name bayesThornApp.directive:map
 * @description
 * # map
 */
angular.module('bayesThornApp')
    .directive('map', function() {

    return {
      scope: {
        "mapData"       : "=",
        "staticData"    : "@",
        "colorBasis"    : "@",
        "maxValue"      : "@",
        "endColor"      : "@"
      },
      restrict: 'E',
      templateUrl: './directiveTemplates/mapTemplate.html',
      link: link
    };

    function link(scope, element, attrs) {

        $.getJSON('./data/states-paths.json', function(statesPaths){

            var svg = d3.select(element.find("svg")[0])
                        .style("width", "100%")
                        .style("height", element.width() * 0.6);

            var tooltip = d3.select(element.find(".tooltip")[0]);

            /*=====================================
            =            Tooltip stuff            =
            =====================================*/

            function tooltipHtml(state, d){  

              var formedPrices;
              if (_.isNumber(d.prices)){
                formedPrices = "$" + d.prices.toFixed(2);
              } else {
                formedPrices = "uknown"
              }
              return "<h4>"+state+"</h4><table>"+
                     "<tr><td>Avg Price:</td><td>"+ formedPrices +"</td></tr>"+
                     "<tr><td>Total # of Ads:</td><td>"+(d.counts)+"</td></tr>"+
                     "</table>";
            }

            function mouseOver(d){

                var data = scope.mapData[d.id];
               
                tooltip.transition().duration(200).style("opacity", .9); 
                tooltip.html(tooltipHtml(d.n, data))
                       .style("left", (d3.event.offsetX) + "px")     
                       .style("top", (d3.event.offsetY + 30) + "px");
                
            }
        
            function mouseOut(){
                tooltip.transition().duration(500).style("opacity", 0);      
            }

            /*-----  End of Tooltip stuff  ------*/

            function init() {

                svg.selectAll(".state")
                   .data(statesPaths)
                   .enter()
                   .append("path")
                     .attr("class","state")
                     .attr("d",function(d){ return d.d;})
                     .attr("transform", "translate(40,0)scale(" + (element.width()/1100) +")")
                     .style("fill", "#fff");

            }

            function draw(data){

                var max = _.chain(data).pluck(scope.colorBasis).max(function(each) {
                                     if (_.isNumber(each)){
                                       return each;
                                     }
                                     return 0;
                                 }).value();

                svg.selectAll(".state")
                   .on("mouseover", mouseOver)
                   .on("mouseout", mouseOut)
                   .on("click", function(d) {
                        scope.$parent.$broadcast("stateClicked", {"cities": _.omit(data[d.id], ["prices", "counts"]), "state": d.n});
                   })
                   .transition(1000)
                   .style("fill",function(d){ 
                      return createColor(scope.endColor, data[d.id][scope.colorBasis], max);
                    });

            }

            function createColor (endColor, data, max) {                                                               

              if (_.isNumber(data) && max) {
                return d3.interpolate("#ffffff", endColor)(data/max);
              }
              return "#fff";
              
            }

            if (scope.staticData) {
              init();
              draw(scope.mapData);
            }

            var isInit = false;

            scope.$watch('mapData', function(newData){

                if (!isInit) {
                  init();
                  isInit = true;
                }
                else {
                  draw(scope.mapData);
                }
                
            });

        });

    }//end link function

  });
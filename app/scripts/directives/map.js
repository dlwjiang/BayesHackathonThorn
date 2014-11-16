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
        "mapData": "=",
        "scaleVariable": "@",
        "tooltipHtml" : "&"
      },
      restrict: 'E',
      templateUrl: './directiveTemplates/mapTemplate.html',
      link: link
    };

    function link(scope, element, attrs) {

        $.getJSON('./data/states-paths.json', function(statesPaths){

            var svg = d3.select(element.find("svg")[0])
                .style("width", "100%")
                .style("height", "500px");

            var tooltip = d3.select(element.find(".tooltip")[0]);

            /*=====================================
            =            Tooltip stuff            =
            =====================================*/

            function tooltipHtml(state, d){  
              return "<h4>"+state+"</h4><table>"+
                     "<tr><td>Avg Price:</td><td>"+(d.prices)+"</td></tr>"+
                     "<tr><td>Total # of Ads:</td><td>"+(d.totalNumberAds)+"</td></tr>"+
                     "</table>";
            }

            function mouseOver(d){
                //d is state info, d.n is state name
                var data = scope.mapData[d.id];
                if (data.cities.length !== 0) {

                tooltip.transition().duration(200).style("opacity", .9); 
                tooltip.html(tooltipHtml(d.n, data))
                    .style("left", (d3.event.offsetX) + "px")     
                    .style("top", (d3.event.offsetY - 60) + "px");
                }
            }
        
            function mouseOut(){
                tooltip.transition().duration(500).style("opacity", 0);      
            }

            /*-----  End of Tooltip stuff  ------*/

            function init() {

                console.log("initiazitng");
                svg.selectAll(".state")
                   .data(statesPaths)
                   .enter()
                   .append("path")
                     .attr("class","state")
                     .attr("d",function(d){ return d.d;})
                     .attr("transform", "scale(" + (scope.scaleVariable || 0.5) +")")
                     .style("fill", "#fff");
            }

            function draw(data){
               
                svg.selectAll(".state")
                   .on("mouseover", mouseOver)
                   .on("mouseout", mouseOut)
                   .on("click", function(d) {
                        scope.$parent.$broadcast("stateClicked", {"cities": data[d.id].cities, "state": d.n});
                   })
                   .transition()
                   .style("fill",function(d){ return data[d.id].color; });

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
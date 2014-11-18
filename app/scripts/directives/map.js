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
        "staticData"    : "@"
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

                console.log(element.width()/900);

            var tooltip = d3.select(element.find(".tooltip")[0]);

            /*=====================================
            =            Tooltip stuff            =
            =====================================*/

            function tooltipHtml(state, d){  
              console.log("the data her? :", d);
              return "<h4>"+state+"</h4><table>"+
                     "<tr><td>Avg Price:</td><td>"+(d.avgPricePerAd)+"</td></tr>"+
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
                    .style("top", (d3.event.offsetY + 30) + "px");
                }
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
               
                svg.selectAll(".state")
                   .on("mouseover", mouseOver)
                   .on("mouseout", mouseOut)
                   .on("click", function(d) {
                        scope.$parent.$broadcast("stateClicked", {"cities": data[d.id].cities, "state": d.n});
                   })
                   .transition()
                   .style("fill",function(d){ 
                      return data[d.id].color; 
                    });


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
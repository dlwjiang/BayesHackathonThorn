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
    	scope: true,
      restrict: 'E',
      templateUrl: './directiveTemplates/mapTemplate.html',
      link: link
    };

    function link(scope, element, attrs) {

    		var mapData = scope.mapData;
    		console.log("this is the map data: ", mapData);

    		$.getJSON('./data/states-paths.json', function(statesPaths){

    				var svg = d3.select(element.find("svg")[0])
    										.style("width", "120%")
    										.style("height", "350px");

    				var tooltip = d3.select(element.find(".tooltip")[0]);

    				/*=====================================
    				=            Tooltip stuff            =
    				=====================================*/
    				
    			  function tooltipHtml(state, d){  
    			      return "<h4>"+state+"</h4><table>"+
		    			         "<tr><td>Avg Age:</td><td>"+(d.avgAge)+"</td></tr>"+
		    			         "<tr><td>Total # of Ads:</td><td>"+(d.totalNumberAds)+"</td></tr>"+
		    			         "</table>";
    			  }

    			  function mouseOver(d){
    			  		//d is state info, d.n is state name
                tooltip.transition().duration(200).style("opacity", .9); 
                tooltip.html(tooltipHtml(d.n, mapData[d.id]))
                       .style("left", (d3.event.pageX) + "px")     
                       .style("top", (d3.event.pageY - 60) + "px");
            }
            
            function mouseOut(){
                tooltip.transition().duration(500).style("opacity", 0);      
            }

            /*-----  End of Tooltip stuff  ------*/
            
    		    function draw(data){
    		       
    		        svg.selectAll(".state")
    		           .data(statesPaths)
    		           .enter()
    		           .append("path")
	    		           .attr("class","state")
	    		           .attr("d",function(d){ return d.d;})
	    		           .attr("transform", "scale(0.5)")
	    		           .style("fill",function(d){ return data[d.id].color; })
	    		           .on("mouseover", mouseOver)
	    		           .on("mouseout", mouseOut)
	    		           .on("click", function(d) {
	    		           		scope.$parent.$broadcast("stateClicked", {"cities": data[d.id].cities, "state": d.n});
	    		           });

    		        tooltip.append(tooltipHtml())

    		    }

    		    draw(mapData);

    		});

     
    }

  });
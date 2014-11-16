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
      scope: { 'data': '=' },
      restrict: 'E',
      templateUrl: './directiveTemplates/mapTemplate.html',
      link: link
    };

    function link(scope, element) {

    		console.dir("directive instantiated");

    		$.getJSON('./stateData/states-paths.json', function(statesPaths){

    				var svg = d3.select(element.find("svg")[0])
    										.style("width", "120%")
    										.style("height", "350px");

    				var tooltip = d3.select(element.find(".tooltip")[0]);

    			  function tooltipHtml(state, d){    /* function to create html content string in tooltip div. */
    			      return "<h4>"+state+"</h4><table>"+
    			          "<tr><td>Avg Age:</td><td>"+(d.avgAge)+"</td></tr>"+
    			          "<tr><td>Total # of Ads:</td><td>"+(d.totalNumberAds)+"</td></tr>"+
    			          "</table>";
    			  }

    			  function mouseOver(d){
    			  		//d is state info, d.n is state name
                tooltip.transition().duration(200).style("opacity", .9); 
                tooltip.html(tooltipHtml(d.n, scope.data[d.id]))
                       .style("left", (d3.event.pageX) + "px")     
                       .style("top", (d3.event.pageY - 60) + "px");
            }
            
            function mouseOut(){
                tooltip.transition().duration(500).style("opacity", 0);      
            }
    		        
    		    function draw(data){

    		    		console.log("etnering drawing function", data) ;
    		       
    		        svg.selectAll(".state")
    		           .data(statesPaths)
    		           .enter()
    		           .append("path")
    		           .attr("class","state")
    		           .attr("d",function(d){ return d.d;})
    		           .attr("transform", "scale(0.5)")
    		           .style("fill",function(d){ return data[d.id].color; })
    		           .on("mouseover", mouseOver)
    		           .on("mouseout", mouseOut);

    		        tooltip.append(tooltipHtml())
    		    }

    		    draw(scope.data);

    		});

     
    }

  });
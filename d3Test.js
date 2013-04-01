// requires d3.js
// requires browser

data = [40, 20, 10];

var svg = d3.select('body').append("svg")
    .attr('width', 640)
    .attr('height', 480);

var circles = svg.selectAll('circle')
    .data(data)
    .enter()
    .append("circle");

var x = 0;
var y = 0;

var circleAttributes = circles
    .attr("cx", function(d) { x += d + 10; return x; })
    .attr('cy', function(d) { y += d + 10; return y; })
    .attr('r', function(d) { return d; })
    .style('fill', function(d) {
        return d === 40 ? "green" : d === 20 ? "purple" : d === 10 ? "red" : "black";
    });
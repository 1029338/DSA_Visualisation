//      A simplefied version of http://bl.ocks.org/mbostock/4060366 (wihtout mouse interactions), ported to p5.js


function setup() {


  var width = 960,
    height = 500;
  
  
  // randomly generate vertices

  var vertices = d3.range(100).map(function(d) {
    return [Math.random() * width, Math.random() * height];
  });

  // using d3.js voronoi layout to calculate voronoi polygons
  
  var voronoi = d3.geom.voronoi()
    .clipExtent([
      [0, 0],
      [width, height]
    ]);
  
  /*
     -----------------------
     p5.js code starts here.
     -----------------------
  */
  
  createCanvas(width, height);
  

  var vcolors = [
                 color(197,27,125), color(222,119,174), color(241,182,218), 
                 color(253,224,239), color(247,247,247), color(230,245,208),
                 color(184,225,134), color(127,188,65), color(77,146,33)
                ];
  
  // create polygons using d3.js voronoi diagram
  var polygons = voronoi(vertices);
  
  stroke(255);

  // draw polygons
  for(var j=0; j<polygons.length; j++) {
    var apolygon = polygons[j];
    
    // pick a random color
    var polyColor = vcolors[j % vcolors.length];
    fill(polyColor);
    
    beginShape();
    for(var k=0; k<apolygon.length; k++) {
      
      var v = apolygon[k];
      vertex(v[0], v[1]);
      
    }
    endShape(CLOSE);
  }
  
  // draw circles.
  
  var circles = vertices.slice(1);
  
  stroke(0);
  for(var i=0; i< circles.length; i++) {
    var center = circles[i];
    push();
    translate(center[0], center[1]);
    fill(0);
    ellipse(0, 0, 1.5, 1.5);
    pop();
  }  
  
  //  label
  fill(0);
  noStroke();
  text('p5.js canvas', 15, 15);
  
  
  /*
      -----------------------
      d3.js code starts here.
      -----------------------
  */
  
  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  var path = svg.append("g").selectAll("path");

  svg.selectAll("circle")
    .data(vertices.slice(1))
    .enter().append("circle")
    .attr("transform", function(d) {
      return "translate(" + d + ")";
    })
    .attr("r", 1.5);

    path = path
      .data(voronoi(vertices), polygon);

    path.exit().remove();

    path.enter().append("path")
      .attr("class", function(d, i) {
        return "q" + (i % 9) + "-9";
      })
      .attr("d", polygon);

    //path.order();

  function polygon(d) {
    return "M" + d.join("L") + "Z";
  }
  
  //  label
  
  svg.append('text')
    .attr('x', 15)
    .attr('y', 15)
    .attr('width', 50)
    .attr('height', 30)
    .style('fill','#000')
    .text('d3.js svg');
  
  /* 
    -----------
    End d3.code
    -----------
  */
  

}
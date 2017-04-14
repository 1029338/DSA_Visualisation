var nodes = [];
//var centroids = [];
var buttonNext,buttonStart,buttonGo ;
var clusters = [];
var h1;
var seeds;
var input1;

function setup() {
    
    h1 = createElement("h1","Visualization of K Mean algorithm");
    h1.style('text-align:center');
    var p1 = createP("Please click anywhere on canvas to select your initial cluster points.");
    var p2 = createP("Please enter the number of seeds in below provided box. This seeds are generated randomly.");
    createP("");
    input1 = createInput();
    buttonGo = createButton("Plot Random Seeds");
    createP("");
    
    //createCanvas(600,400);
    createCanvas(1200, 660);
    createP("");
    buttonStart = createButton("Start");
    createP("");
    buttonNext = createButton("Next");
    
    // Create seeds for clustering randomly.
    for(var i=0; i<seeds; i++){
        nodes[i] = new node(floor(random(0,width-10)),floor(random(0,height-10)),255);
    }
    
    buttonNext.mousePressed(buttonClicked);
    buttonStart.mousePressed(buttonStartKMean);
    buttonGo.mousePressed(buttonPlotRandomSeeds);

}

function draw() {
    //Setting initial background
    background(50);
    //frameRate(10);
    
    
    for(var i=0; i<nodes.length; i++){
        nodes[i].displayNode();
    }
    
    for(var i=0; i<clusters.length; i++){
        clusters[i].displayCluster();
    }
    noLoop();
    
}

function mousePressed(){
    if(0 <= mouseX && mouseX <= width && 0 <= mouseY && mouseY <= height){
        var clusterColor = color(random()*256,random()*256,random()*256);
        clusters.push(new cluster(mouseX,mouseY,clusterColor));
        loop();
    }
}

function buttonClicked() {
    calculateNewCentroids();
    kMean();
    loop();
}

function buttonStartKMean() {
    kMean();
    loop();
}

function buttonPlotRandomSeeds() {
    seeds = input1.value();
    nodes = [];
    for(var i=0; i<seeds; i++){
        nodes[i] = new node(floor(random(0,width-10)),floor(random(0,height-10)),255);
    }
    clusters = [];
    loop();
}
var nodes = [];
//var centroids = [];
var buttonNext,buttonStart,buttonGo,buttonFile,p,infoSpan,center;
var clusters = [];
var h1;
var seeds;
var input1;
var clusterSize = [];
	
function setup() {
    
    h1 = createElement("h1","Visualization of K Mean algorithm");
    h1.style('text-align:center');
    var p1 = createP("Please click anywhere on canvas to select your initial cluster points.<br>Please enter the number of seeds in below provided box. This seeds are generated randomly.");
    createP("");
    input1 = createInput();
	input1.class('inputStyle');
    buttonGo = createButton("Plot Random Seeds");
	buttonFile= createButton("Upload data");
	buttonFile.id("fileDiv");
	buttonFile.mousePressed(triggerFile);
    buttonStart = createButton("Start");
    buttonNext = createButton("Next");
    createP("");
    var div=createDiv();
	div.id('upfilediv');
	var fileSelect = createFileInput(fileUploaded, 'multiple');
	fileSelect.id('upfile');
	fileSelect.parent('upfilediv');
	var maindiv=createDiv("");
	maindiv.id('maindiv');
	var canspan=createDiv("");
	canspan.id('canspan');
	infoSpan=createDiv("");
	infoSpan.id('infoSpan');
	canspan.parent('maindiv');
	infoSpan.parent('maindiv');
    var can=createCanvas(800, 422.4);
	can.class('canvasStyle');
	can.parent('canspan');
    createP("");

    // Create seeds for clustering randomly.
    for(var i=0; i<seeds; i++){
        nodes[i] = new node(floor(random(0,width-10)),floor(random(0,height-10)),255);
    }
    
    buttonNext.mousePressed(buttonClicked);
    buttonStart.mousePressed(buttonStartKMean);
    buttonGo.mousePressed(buttonPlotRandomSeeds);

}

function fileUploaded(file) {

  var table = loadTable(file.name);
  rowCount = table.getRowCount();
  for (var row = 0; row < rowCount; row++) {
    
    var x = table.getRow(row).get(1);
    var y = table.getRow(row).get(2);
    
  console.write("("+ x + " , "+y+")");
	}
}

 function triggerFile(file) {
  document.getElementById("upfile").click();
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
    if(0 <= mouseX && mouseX <= width && 0 <= mouseY && mouseY <= height && nodes.length > 0){
        var clusterColor = color(random()*256,random()*256,random()*256);
        clusters.push(new cluster(mouseX,mouseY,clusterColor));
        loop();
    }
}

function buttonClicked() {
    calculateNewCentroids();
    kMean();
	calculateClusterSize();
    loop();
}

function buttonStartKMean() {
    kMean();
	calculateClusterSize();
    loop();
}

function buttonPlotRandomSeeds() {
    seeds = input1.value();
    nodes = [];
    for(var i=0; i<seeds; i++){
        nodes[i] = new node(floor(random(10,width-10)),floor(random(10,height-10)),255);
    }
    clusters = [];
    loop();
}

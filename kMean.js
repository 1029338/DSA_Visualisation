function kMean() {
    for(var i=0; i<nodes.length; i++){
        var distance=10000;
        var tempDistance=-1;
        for(var j=0; j<clusters.length; j++){   
            tempDistance = dist(nodes[i].xCoordinate,nodes[i].yCoordinate,clusters[j].x,clusters[j].y);
            if(tempDistance < distance){
                distance = tempDistance;
                nodes[i].cluster = j;
                nodes[i].color = clusters[j].color;
            }
        }
    }
}

function calculateNewCentroids(){
    for(var i=0; i<clusters.length; i++){
        var tempMeanX = 0, tempMeanY = 0,numberOfPointsInCluster = 0;
        for(var j=0; j<nodes.length; j++){
            if(nodes[j].cluster == i){
                tempMeanX = tempMeanX + parseInt(nodes[j].xCoordinate);
                tempMeanY = tempMeanY + parseInt(nodes[j].yCoordinate);
                numberOfPointsInCluster++;
            }
        }
        clusters[i].meanX = tempMeanX/numberOfPointsInCluster;
        clusters[i].meanY = tempMeanY/numberOfPointsInCluster;
        clusters[i].setNewCentroid(clusters[i].meanX, clusters[i].meanY);
    }
}

function rgb2hex(rgbStr){
	var rgb=rgbStr.split(/[(),]+/)
 return ("#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2)) ;
}

function showDetails(){
	
	var temp=document.getElementById('infoSpan');
	if(temp.hasChildNodes())
		temp.removeChild(center);
	center= document.createElement('center');
	var table = document.createElement('table'), tr,trHead, th1, td1,th2,td2, row, cell;
	center.appendChild(table);
	temp.appendChild(center);
	trHead = document.createElement('tr');
	table.appendChild(trHead);
	th1 = document.createElement('th');
	th2 = document.createElement('th');
	th1.style='padding:10px;';
	th2.style='padding:10px;';
    trHead.appendChild(th1);
	trHead.appendChild(th2);
    trHead.className='dynamicSpanHead';
	th1.innerHTML="SIZE";
	th2.innerHTML="CENTROID";
	//document.getElementById("infoSpan").innerHTML="<table><tr><th class='dynamicSpanHead'>Size</th><th class='dynamicSpanHead' colspan='2'>Centroid</th></tr>";
	var hex;
	for(var j=0;j<clusters.length;j++){
		hex=rgb2hex(clusters[j].color.toString());
		tr = document.createElement('tr');
		table.appendChild(tr);
		td1 = document.createElement('td');
		td2 = document.createElement('td');
		td1.style='color:'+hex;
		td2.style='color:'+hex;
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.className='dynamicSpan';
		td1.innerHTML=clusterSize[j];
		td2.innerHTML="( "+ floor(clusters[j].x)+","+ floor(clusters[j].y)+")";
		//document.getElementById("infoSpan").innerHTML+="<tr style='color:"+hex+";'><td class='dynamicSpan' >"+clusterSize[j]+"</td><td class='dynamicSpan'> ( "+clusters[j].x+","+clusters[j].y+")</td></tr>";
    }
	
}


function calculateClusterSize(){
    clusterSize = [];
    for(var j=0;j<clusters.length;j++){
        clusterSize[j] = 0; 
    }
    for(var i=0;i<nodes.length;i++){
        for(var j=0;j<clusters.length;j++){
            if(nodes[i].cluster == j){
                clusterSize[j]++;
            }
        }
    }
	showDetails();
}

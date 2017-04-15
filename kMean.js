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
                tempMeanX = tempMeanX + nodes[j].xCoordinate;
                tempMeanY = tempMeanY + nodes[j].yCoordinate;
                numberOfPointsInCluster++;
            }
        }
        clusters[i].meanX = tempMeanX/numberOfPointsInCluster;
        clusters[i].meanY = tempMeanY/numberOfPointsInCluster;
        clusters[i].setNewCentroid(clusters[i].meanX, clusters[i].meanY);
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
    console.log(clusterSize);
}

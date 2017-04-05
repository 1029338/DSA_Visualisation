function cluster(x, y, color) {
    
    this.x=x;
    this.y=y;
    this.color = color;
    this.meanX = -1;
    this.meanY = -1;
    
    this.displayCluster = function() {
        stroke(150)
        strokeWeight(5);
        fill(this.color);
        ellipse(this.x,this.y,20,20);
    }
    
    this.setNewCentroid = function(meanX, meanY) {
        this.x = meanX;
        this.y = meanY;
    }

}
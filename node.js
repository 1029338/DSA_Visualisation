function node (x, y, color)
{
    //var xCoordinate;
    //var yCoordinate;
    //var color;
    
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.color = color;
    this.cluster=-1;
    
    this.displayNode = function() {
        noStroke();
        fill(this.color);
        ellipse(this.xCoordinate,this.yCoordinate,10,10);
    }

    this.equals = function(other) {
        if(this.xCoordinate == other.xCoordinate && this.yCoordinate == other.yCoordinate)
            return true;
        else
            return false;
        
    }
}
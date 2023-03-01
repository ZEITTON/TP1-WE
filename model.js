
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
function Drawing(){
   this.shapeArray = new Map();
}

function Shape(startX, startY, thickness, color){
    this.startX = startX;
    this.startY = startY;
    this.thickness = thickness;
    this.color=color;
}

function Rectangle(startX, startY, thickness, color, height, width){
    Shape.call(this, startX, startY, thickness, color);
    this.height=height;
    this.width=width;
}

function Line(startX, startY, thickness, color, endX, endY){
    Shape.call(this, startX, startY, thickness, color);
    this.endX=endX;
    this.endY=endY;
}
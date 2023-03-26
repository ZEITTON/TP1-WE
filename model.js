
// Implémentation des classes du model
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

function LineCap(startX, startY, thickness, color, endX, endY){
    Shape.call(this, startX, startY, thickness, color);
    this.endX=endX;
    this.endY=endY;
}

function LineDash(startX, startY, thickness, color, endX, endY){
    Shape.call(this, startX, startY, thickness, color);
    this.endX=endX;
    this.endY=endY;
}

function Circle(startX, startY, thickness, color, endX){
    Shape.call(this, startX, startY, thickness, color);
    this.endX=endX;
}

function Painting(thickness, color) {
    Shape.call(this, 0, 0, thickness, color);
    this.points = []; //creation d'un tableau de points pour dessiner sans formes
}

//fonction de painting qui sert a ajouter les points a chaque update (dans controller)
Painting.prototype.addPoint = function(x, y) {
    this.points.push({x: x, y: y});
};
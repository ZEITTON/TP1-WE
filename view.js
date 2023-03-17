
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Rectangle.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.setLineDash([]);
    ctx.lineWidth = this.thickness;
    ctx.strokeRect(this.startX, this.startY, this.width, this.height);

};

Line.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.lineCap="butt";
    ctx.setLineDash([]);
    ctx.stroke();
};

LineDash.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.setLineDash([5, 16]);
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.lineCap = "round";
    ctx.stroke();
};

LineCap.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.lineCap = "round";
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
};


Circle.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.setLineDash([]);
    ctx.beginPath();
    let radius = this.endX - this.startX;
    if(radius > 0){
        ctx.arc(this.startX, this.startY, radius, 0, 2* Math.PI, false);
    }else {
        ctx.arc(this.startX, this.startY, -radius, 0, 1* Math.PI, false);
    }
    ctx.stroke();
};

var previousMouseX = this.startX;
var previousMouseY = this.startY;

Pinceau.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(previousMouseX, previousMouseY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();

    previousMouseX=this.endX;
    previousMouseY=this.endY;
};

Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = 'F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.shapeArray.forEach(element => element.paint(ctx));
};


function updateShapeList(index, shape){
    document.getElementById('shapeList').insertAdjacentHTML('beforeend', toDom(shape, index));
};

function toDom(shape, index){
    if(shape && typeof shape=='object'){
        let innerHtml = `<li id="liRemove${index}">`;
        if(shape.constructor == Rectangle){
            innerHtml += '<span style="color:' + shape.color + '">[]</span> Rectangle';
        }else if(shape.constructor == Line){
            innerHtml += '<span style="color:' + shape.color + '">/</span> Line';
        }else {
            innerHtml += '<span style="color:' + shape.color + '">o</span> Circle';
        }
        innerHtml += `<button type="button" class="btn btn-default remove" id="remove${index}">
                        <span class="glyphicon glyphicon-remove-sign"></span>
                     </button>`;
        return innerHtml + '</li>';
    }
    
}
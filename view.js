
// Implémentation des fonctions paint à ajouter dans chacune des classes du modèle.
Rectangle.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.setLineDash([]);
    ctx.lineWidth = this.thickness;
    ctx.strokeRect(this.startX, this.startY, this.width, this.height);

};

Line.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    // Début du dessin
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.lineCap="butt";
    ctx.setLineDash([]);
    ctx.stroke();
};

//fonction qui dessine une ligne pointillée
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

//fonction qui dessine une ligne arrondie sur les bords
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

//fonction paint de Circle qui dessine un cercle en fonction de la position de la souris
Circle.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.setLineDash([]);
    ctx.beginPath();
    let radius = this.endX - this.startX;
    //si la souris va vers la droite ou la gauche du pointde depart le cercle grandit
    if(radius > 0){
        ctx.arc(this.startX, this.startY, radius, 0, 2* Math.PI, false);
    }else {
        ctx.arc(this.startX, this.startY, -radius, 0, 2* Math.PI, false);
    }
    ctx.stroke();
};

//fonction paint de Painting, lors de l'utilisation du pinceau
Painting.prototype.paint = function(ctx) {
    console.log("Color:", this.color);
    console.log("Thickness:", this.thickness);
    console.log('painting:', this.points); // Ajout d'un log pour voir les points

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.lineCap = "round";
    ctx.setLineDash([]);
    // Si le tableau de points est vide, on ne dessine rien
    if (this.points.length === 0) {
        return;
    }
    ctx.beginPath();
    // Positionnement du premier point
    ctx.moveTo(this.points[0].x, this.points[0].y);
    // Dessin des points suivants
    for (var i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    // Dessin du tracé
    ctx.stroke();
    // Fin du dessin
    ctx.closePath();
};

//fonction paint de Drawing pour dessiner sur le canvas
Drawing.prototype.paint = function(ctx, canvas) {
    ctx.fillStyle = 'F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.shapeArray.forEach(element => {
        if (element instanceof Painting) {
            element.paint(ctx);
        } else {
            element.paint(ctx);
        }
    });
};

//met a jour la liste des formes créer sur le canvas
function updateShapeList(index, shape){
    document.getElementById('shapeList').insertAdjacentHTML('beforeend', toDom(shape, index));
};

//genere la liste des formes créer avec un bouton supprimer pour l'enlever de la liste et du canvas.
function toDom(shape, index) {
  if (shape instanceof Rectangle) {
    return `<li id="liRemove${index}"><span style="color:${shape.color}">[]
    </span> &nbsp;Rectangle&nbsp;&nbsp;<button type="button" class="btn btn-default remove ml-2" id="remove${index}" onclick="removeItem(${index})">
    <span class="glyphicon glyphicon-remove-sign"></span></button></li>`;
  } else if (shape instanceof Line) {
    return `<li id="liRemove${index}"><span style="color:${shape.color}">/
    </span> &nbsp;Line&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default remove ml-2" id="remove${index}" onclick="removeItem(${index})">
    <span class="glyphicon glyphicon-remove-sign"></span></button></li>`;
  } else if (shape instanceof Circle){
    return `<li id="liRemove${index}"><span style="color:${shape.color}">o
    </span> &nbsp;Circle&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default remove" id="remove${index}" onclick="removeItem(${index})">
    <span class="glyphicon glyphicon-remove-sign"></span></button></li>`;
  } else if(shape instanceof Painting){
      return `<li id="liRemove${index}"><span style="color:${shape.color}">✎
          </span> &nbsp;Pinceau&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default remove ml-2" id="remove${index}" onclick="removeItem(${index})">
          <span class="glyphicon glyphicon-remove-sign"></span></button></li>`;
  } else if(shape instanceof LineCap){
      return `<li id="liRemove${index}"><span style="color:${shape.color}">╰
          </span> &nbsp;LineCap&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default remove" id="remove${index}" onclick="removeItem(${index})">
          <span class="glyphicon glyphicon-remove-sign"></span></button></li>`;
  } else {
      return `<li id="liRemove${index}"><span style="color:${shape.color}">-
          </span> &nbsp;LineDash&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default remove ml-2" id="remove${index}" onclick="removeItem(${index})">
          <span class="glyphicon glyphicon-remove-sign"></span></button></li>`;
  }
}



// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Rectangle.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.tickness;
    ctx.strokeRect(this.startX, this.startY, this.width, this.height);
};

Line.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.tickness;
    ctx.beginPath();
    ctx.moveTo(this.startX, startY);
    ctx.lineTo(this.endX, this.endY);
};

Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = 'F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.shapArray.forEach(element => element.paint(ctx));
};
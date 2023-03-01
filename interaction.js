
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
	this.xInit=0;
	this.yInit=0;
	this.xFinal=0;
	this.yFinal=0;
	this.isPressed=false;

	// Developper les 3 fonctions gérant les événements
	this.pression = function(evt){
	    var pos=getMousePosition(canvas, evt);
	    this.xInit=pos.x;
	    this.yInit=pos.y;
	    this.isPressed=true;
        console.log(pos);

        if(this.isPressed){
            var pos=getMousePosition(canvas, evt);
            this.xFinal=pos.x;
            this.yFinal=pos.y;
            console.log(pos);
        }
	}.bind(this)

	this.deplacement = function(evt){
        var pos=getMousePosition(canvas, evt);
        this.xInit=pos.x;
        this.yInit=pos.y;
        this.isPressed=true;
        console.log(pos);
	}.bind(this)

	this.relachement = function(evt){
	    var pos=getMousePosition(canvas, evt);
        this.xFinal=pos.x;
        this.yFinal=pos.y;
        this.isPressed=false;
        console.log(evt);
	}.bind(this)
	// Associer les fonctions précédentes aux évènements du canvas.
	canvas.addEventListener('mousedown', this.pression, false);
    canvas.addEventListener('mousemove', this.deplacement, false);
    canvas.addEventListener('mouseup', this.relachement, false);

};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};




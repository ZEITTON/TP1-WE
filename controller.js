
var editingMode = { rect: 0, line: 1, circle: 2, pinceau: 3, lineDash: 4, lineCap: 5 };

let currentOption = [false, false, false];

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.pinceau;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	document.getElementById('butRect').onclick= (_) => this.currEditingMode=editingMode.rect;
	document.getElementById('butLine').onclick= (_) => this.currEditingMode=editingMode.line;
	document.getElementById('butCircle').onclick= (_) => this.currEditingMode=editingMode.circle;
	document.getElementById('butPinceau').onclick= (_) => this.currEditingMode=editingMode.pinceau;
	document.getElementById('spinnerWidth').onchange= (e) => this.currLineWidth=e.target.value;
	document.getElementById('colour').onchange= (e) => this.currColour=e.target.value;
	document.getElementById('butLineDash').onclick= (_) => this.currEditingMode=editingMode.lineDash;
	document.getElementById('butLineCap').onclick= (_) => this.currEditingMode=editingMode.lineCap;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	this.onInteractionStart=function(dnd){

	}.bind(this);

	this.onInteractionUpdate=function(dnd){
        if(this.currEditingMode == editingMode.rect){
            this.currentShape = new Rectangle(dnd.xInit, dnd.yInit, this.currLineWidth, this.currColour, dnd.yFinal - dnd.yInit, dnd.xFinal - dnd.xInit);
	    }else if(this.currEditingMode == editingMode.line){
	        this.currentShape = new Line(dnd.xInit, dnd.yInit, this.currLineWidth, this.currColour, dnd.xFinal, dnd.yFinal);
	    }else if(this.currEditingMode == editingMode.circle){
	        this.currentShape = new Circle(dnd.xInit, dnd.yInit, this.currLineWidth, this.currColour, dnd.xFinal);
	    }else if(this.currEditingMode == editingMode.pinceau){
	        this.currentShape = new Pinceau(dnd.xInit, dnd.yInit, this.currLineWidth, this.currColour, dnd.xFinal, dnd.yFinal);
	    }else if(this.currEditingMode == editingMode.lineCap){
            this.currentShape = new LineCap(dnd.xInit, dnd.yInit, this.currLineWidth, this.currColour, dnd.xFinal, dnd.yFinal);
	    }else {
	        this.currentShape = new LineDash(dnd.xInit, dnd.yInit, this.currLineWidth, this.currColour, dnd.xFinal, dnd.yFinal);
	    }
	    drawing.paint(ctx, canvas);
        this.currentShape.paint(ctx);
    }.bind(this);

    this.onInteractionEnd=function(dnd){
        var uuid = generateUUID();
        //this.currentShape = new Rectangle(dnd.xInit, dnd.yInit, this.currColour, this.currLineWidth, dnd.yFinal - dnd.yInit, dnd.xFinal - dnd.xInit);
        drawing.shapeArray.set(uuid, this.currentShape);
        drawing.paint(ctx, canvas);
        updateShapeList(uuid, this.currentShape);
        document.getElementById("remove"+uuid).onclick = (event) => remove(drawing, event.currentTarget.id.substring, ctx, canvas);
        //this.currentShape.paint(ctx);
    }.bind(this);

    function remove(drawing, index, ctx, canvas){
        console.log(index);
        drawing.shapeArray.delete(index);
        document.getElementById('liRemove' + index).remove();
        drawing.paint(ctx, canvas);
    }

    function generateUUID(){
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
};



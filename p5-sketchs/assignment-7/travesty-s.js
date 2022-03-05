travestySketch = (s) => {

    s.setup = function() {
        s.createCanvas(400, 300);
        canvasWidth = s.width;
    }

    s.draw = function() {
        s.background(252);
    }

    s.windowResized = function() {
        //s.resizeCanvas(document.querySelector('#post-note-s').clientWidth, canvasHeight);
    }
}

var travestyP5 = new p5(travestySketch, 'travesty-s');
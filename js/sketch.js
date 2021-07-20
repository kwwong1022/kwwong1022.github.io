var canvas;
let posX, posY;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    noFill();
    posX = 0;
    posY = 0;
}

function draw() {
    background(220);
    if (!mouseIsPressed) {
        posX = mouseX;
        posY = mouseY;
    }

    if (mouseIsPressed) {
        line(mouseX, mouseY, posX, posY);
        ellipse(posX, posY, 2 * dist(mouseX, mouseY, posX, posY));
    } else {
        ellipse(mouseX, mouseY, 50);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, document.querySelector("body").scrollHeight);
}

window.onresize = () => {
    c = random(255);
    //resizeCanvas(windowWidth, windowHeight);
}
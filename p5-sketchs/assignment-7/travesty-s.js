// travestySketch = (s) => {
//     let txt = "This rainbow has a unicorn flying over it."
//     let order = 3;

//     s.setup = function() {
//         s.createCanvas(400, 300);
//         canvasWidth = s.width;
//     }

//     s.draw = function() {
//         s.background(252);
//     }

//     s.windowResized = function() {
//     }
// }

// var travestyP5 = new p5(travestySketch, 'travesty-s');

let travestyContainer = document.querySelector('#travesty-text');
let travestyGenerateBtn = document.querySelector('#travesty-generate-btn');

let p1Travesty = new Travesty("this brown paper bag of peaches. we bought from the boy at the bend in the road where we turned toward signs painted Peaches. From laden boughs, from hands, from sweet fellowship in the bins, comes nectar at the roadside, succulent peaches we devour, dusty skin and all,comes the familiar dust of summer, dust we eat. O, to take what we love inside, to carry within us an orchard, to eat not only the skin, but the shade, not only the sugar, but the days, to hold the fruit in our hands, adore it, then bite into the round jubilance of peach. There are days we live as if death were nowhere in the background; from joy to joy to joy, from wing to wing, from blossom to blossom to impossible blossom, to sweet impossible blossom.", 3, {});
p1Travesty.process();

travestyGenerateBtn.addEventListener('click', () => {
    p1Travesty.generate(travestyContainer);
});

//console.log(ngrams);
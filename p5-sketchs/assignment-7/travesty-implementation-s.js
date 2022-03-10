// travestyImplementationSketch = (s) => {
//     s.setup = function() {
//         s.createCanvas(400, 300);
//         canvasWidth = s.width;
//     }
//     s.draw = function() {
//         s.background(252);
//     }
//     s.windowResized = function() {
//         //s.resizeCanvas(document.querySelector('#post-note-s').clientWidth, canvasHeight);
//     }
// }
// var travestyImplementationP5 = new p5(travestyImplementationSketch, 'travesty-implementation-s');

let travestyImplementationContainer = document.querySelector('#travesty-implementation-text');
let travestyImplementationGenerateBtn = document.querySelector('#travesty-implementation-generate-btn');
let travestyTextarea = document.querySelector('#travesty-textarea');
let travestyFormParagraph = document.querySelector('#paragraph');

let data;

let init = async () => {
    await fetch("http://localhost:8080/sm3809/asm7-api", {
    }).then(res => {
        return res.json();
    }).then(_data => {
        data = _data;
        console.log(data.content);
    })

    let p2Travesty = await new Travesty(data.content, 3, {});
    p2Travesty.process();

    travestyImplementationGenerateBtn.addEventListener('click', () => {
        p2Travesty.txt = p2Travesty.txt == ""? data:p2Travesty.txt;
        p2Travesty.generate(travestyImplementationContainer);
    });

    travestyTextarea.addEventListener('change', () => {
        travestyFormParagraph.value = travestyTextarea.value;
    });
}

init();

// let travestyContainer = document.querySelector('#travesty-text');
// let travestyGenerateBtn = document.querySelector('#travesty-generate-btn');

// let txt = "this brown paper bag of peaches. we bought from the boy at the bend in the road where we turned toward signs painted Peaches. From laden boughs, from hands, from sweet fellowship in the bins, comes nectar at the roadside, succulent peaches we devour, dusty skin and all,comes the familiar dust of summer, dust we eat. O, to take what we love inside, to carry within us an orchard, to eat not only the skin, but the shade, not only the sugar, but the days, to hold the fruit in our hands, adore it, then bite into the round jubilance of peach. There are days we live as if death were nowhere in the background; from joy to joy to joy, from wing to wing, from blossom to blossom to impossible blossom, to sweet impossible blossom."
// let n = 3;
// let ngrams = {};

// // all n-size "words"
// for (let i=0; i<txt.length-n; i++) {
//     let gram = txt.substring(i, i+n);

//     if (!ngrams[gram]) ngrams[gram] = [];
//     ngrams[gram].push(txt.charAt(i+n));
// }

// let generateTravesty = () => {
//     let currentGram = txt.substring(0, n);
//     let result = currentGram;

//     for (let i=0; i<100; i++) {
//         let possibilities = ngrams[currentGram];

//         if (possibilities) {
//             let next = possibilities[Math.floor(Math.random()*possibilities.length)];
//             result += next;
//             currentGram = result.substring(result.length-n, result.length);
//             // console.log(possibilities);
//             // console.log(next);
//         }
//     }

//     const p = document.createElement('p');
//     p.append(result);
//     travestyContainer.appendChild(p);
// }

// travestyGenerateBtn.addEventListener('click', () => {
//     generateTravesty();
// });

// console.log(ngrams);
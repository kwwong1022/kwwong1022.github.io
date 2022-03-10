let travestyImplementationContainer = document.querySelector('#travesty-implementation-text');
let travestyImplementationGenerateBtn = document.querySelector('#travesty-implementation-generate-btn');
let travestyTextarea = document.querySelector('#travesty-textarea');
let travestyFormParagraph = document.querySelector('#paragraph');

let data;

let init = async () => {
    await fetch("https://kwwong1022-329215.df.r.appspot.com/sm3809/asm7-api/getParagraph", {
    }).then(res => {
        return res.json();
    }).then(_data => {
        data = _data;
        console.log(data.paragraph);
    })

    travestyTextarea.addEventListener('change', () => {
        let p2Travesty = new Travesty(travestyTextarea.value, 3, {});
        p2Travesty.process();
        travestyTextarea.value = p2Travesty.generate();
        travestyFormParagraph.value = travestyTextarea.value;
    });

    const p = document.createElement('p');
    p.append(data.paragraph);
    console.log(data);
    travestyImplementationContainer.appendChild(p);
}

init();

class Travesty {
    constructor(txt, n, ngrams) {
        this.txt = txt;
        this.n = n;
        this.ngrams = ngrams;
    }
    process() {
        // all n-size "words"
        for (let i=0; i<this.txt.length-this.n; i++) {
            let gram = this.txt.substring(i, i+this.n);
        
            if (!this.ngrams[gram]) this.ngrams[gram] = [];
            this.ngrams[gram].push(this.txt.charAt(i+this.n));
        }
    }
    generate(container) {
        let currentGram = this.txt.substring(0, this.n);
        let result = currentGram;

        for (let i=0; i<this.txt.length; i++) {
            let possibilities = this.ngrams[currentGram];

            if (possibilities) {
                let next = possibilities[Math.floor(Math.random()*possibilities.length)];
                result += next;
                currentGram = result.substring(result.length-this.n, result.length);
            }
        }

        if (container) {
            const p = document.createElement('p');
            const b = document.createElement('br');
            p.append(result);
            container.appendChild(p);
            container.appendChild(b);
        } else {
            return result;
        }
    }
}
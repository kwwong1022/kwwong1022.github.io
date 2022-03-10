/** reference from Coding Challenge #42.1: Markov Chains - Part 1 https://www.youtube.com/watch?v=eGFJ8vugIWA */ */

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
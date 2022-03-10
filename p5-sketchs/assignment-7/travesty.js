/** reference from Coding Challenge #42.1: Markov Chains - Part 1 https://www.youtube.com/watch?v=eGFJ8vugIWA */

class Travesty {
    constructor(text, n, ngrams) {
        this.text = text;
        this.n = n;  // n-size mentioned in the article
        this.ngrams = ngrams;  // the frequency table object
    }
    process() {
        // all n-size "words" - from start to length - n-size, make sure every word has three characters
        for (let i=0; i<this.text.length-this.n; i++) {
            let gram = this.text.substring(i, i+this.n);
        
            // create new array if the pattern is new 
            if (!this.ngrams[gram]) this.ngrams[gram] = [];
            // record the character after this n-size pattern -> i+this.n
            this.ngrams[gram].push(this.text.charAt(i+this.n));
        }
    }
    generate(container) {
        let curr = this.text.substring(0, this.n);
        let result = curr;

        // loop through the whole text
        for (let i=0; i<this.text.length; i++) {
            // get all possibilities character of that n-size pattern
            let possibilities = this.ngrams[curr];

            if (possibilities) {
                // choose one of the possibilities
                let next = possibilities[Math.floor(Math.random()*possibilities.length)];
                // concat it to the result to form sentence
                result += next;
                //move forward to next ngram
                curr = result.substring(result.length-this.n, result.length);
            }
        }

        if (container) {
            const p = document.createElement('p');
            const b = document.createElement('br');
            p.append(result);
            container.appendChild(p);
            container.appendChild(b);
        } else {
            // for the api
            return result;
        }
    }
}
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
//import monkeys from './monkeys.js';


    const htmlElements = {
        divMonkeys: () => document.getElementsByClassName('monkeys'),
    }
    
    fetch('./monkeyTemplate.hbs')
    .then(r => r.text())
    .then((templateSrc) => {
        let template = Handlebars.compile(templateSrc);

        let result = template({monkeys});
        htmlElements.divMonkeys().innerHTML = result;
    })
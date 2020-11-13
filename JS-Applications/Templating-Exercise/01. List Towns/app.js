const htmlElements = {
    inputTownsElement: () => document.querySelector('#towns'),
    buttonLoadElement: () => document.querySelector('#btnLoadTowns'),
    divWithTownsElement: () => document.querySelector('#root'),
}

htmlElements.buttonLoadElement().addEventListener('click', getInputInfo);

function getInputInfo(e){
    e.preventDefault();
    const value = htmlElements.inputTownsElement().value;
    htmlElements.inputTownsElement().value = '';

    const towns = value.split(/[, ]+/g).map(x => {return {name: x}});
    towns.forEach(x => console.log(x.name));
    appendTowns(towns);
}

function appendTowns(towns){
    getTemplate()
    .then(templateSource => {
      const template = Handlebars.compile(templateSource);
      const result = template({towns});
      htmlElements.divWithTownsElement().innerHTML = result;
    })
}

function getTemplate(){
    return fetch('./townsTemplate.hbs')
    .then(r => r.text());
}

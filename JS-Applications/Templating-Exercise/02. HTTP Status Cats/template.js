const htmlElements = {
    allCatsElement: () => document.getElementById('allCats'),
};

Promise.all([
   getTemplate('./liTemplate.hbs'),
   getTemplate('./cats.hbs')
])
.then(([LiTemplate, catsTemplate]) => {
    Handlebars.registerPartial('cat', catsTemplate); // case SENSITIVE exact name of variable in liTemplate ('cat') + location of it!!!

    let template = Handlebars.compile(LiTemplate); // compile as normal, after the partil has been registered
    let result = template({cats});
    htmlElements.allCatsElement().innerHTML = result;
});

htmlElements.allCatsElement().addEventListener('click', showHideInfo);

function showHideInfo(e){
  let targetClicked = e.target.tagName;
  if (targetClicked === 'BUTTON') {
    let parentElementOfClickedElement = e.target.parentElement;
    let divHiddenInfo = parentElementOfClickedElement.querySelector('div');
      let button = parentElementOfClickedElement.querySelector('button');

    if (divHiddenInfo.style.display == 'none') {
        divHiddenInfo.style.display = 'block';
        button.innerHTML = 'Hide status code'
    }else{
        divHiddenInfo.style.display = 'none';
        button.innerHTML = 'Show status code'
    }
  }
}

function getTemplate(location){
   return fetch(location)
    .then(r => r.text());
}


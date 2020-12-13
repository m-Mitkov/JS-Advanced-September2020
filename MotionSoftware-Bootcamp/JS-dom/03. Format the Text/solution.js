function solve() {
 
  const htmlElements = {
    'inputTextElement': () => document.querySelector('#input'),
    'outputTextElement': () => document.querySelector('#output'),
  };

  let sentences = htmlElements.inputTextElement().innerHTML.split('.');
  let outputTextElement = htmlElements.outputTextElement();

  while(sentences.length > 0){
    let paragraph = document.createElement('p');
    paragraph.innerHTML = sentences.splice(0, 3).join('.') + '.';

    outputTextElement.appendChild(paragraph);
  }
}
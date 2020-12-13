let colors = ['blue', 'green', 'red'];
let fontSize;

function growingWord() {
  const htmlElements = {
    'paragraphWordElement': () => document.querySelector('#exercise > p'),
  };
  let color = colors.shift();
  colors.push(color);

  let growingWords = htmlElements.paragraphWordElement();
 
  if(!growingWords.style.fontSize){
    fontSize = 2;
    growingWords.style.fontSize = fontSize + 'px';
  }else{
    fontSize *= 2;
    growingWords.style.fontSize = fontSize + 'px';
  }

  growingWords.style.color = color;
  growingWords.setAttribute('color', color);
  
}
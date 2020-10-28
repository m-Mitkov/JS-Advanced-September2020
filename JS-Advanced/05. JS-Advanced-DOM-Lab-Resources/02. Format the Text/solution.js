function solve() {
  let inputText = document.getElementById('input').innerText;
  let output = document.getElementById('output');
  let sentences = inputText.split(".");

  while (sentences.length > 0) {
    let currentParagraph = sentences.splice(0, 3).join('.') + '.';

    let paragraphElement = document.createElement('p');
    paragraphElement.innerHTML = currentParagraph;

    output.appendChild(paragraphElement);
  }
}

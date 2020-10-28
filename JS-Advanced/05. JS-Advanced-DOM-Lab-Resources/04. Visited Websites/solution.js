function solve() {
  let linkElements = document.querySelectorAll('.link-1 a');

  for (const element of linkElements) {
    element.addEventListener('click', countClicks);
  }

  function countClicks(e) {
    let elements = e.currentTarget.nextElementSibling;
    let visitedTimes = Number(elements.innerText.split(' ')[1]);

    visitedTimes++;

    elements.innerText = `visited ${visitedTimes} times`;
  }
}

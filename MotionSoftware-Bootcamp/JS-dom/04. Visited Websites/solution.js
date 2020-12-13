function solve() {

  let sites = document.querySelectorAll('.link-1');

  sites.forEach(x => {
    x.addEventListener('click', count);
  });

  function count(e) {
    let paragraphCountVisitTimes = e.currentTarget.querySelector('p');
    let countTimes = Number(paragraphCountVisitTimes.innerHTML.split(' ')[1]);

    countTimes++;
    paragraphCountVisitTimes.innerHTML = `visited ${countTimes} times`;
  }
}
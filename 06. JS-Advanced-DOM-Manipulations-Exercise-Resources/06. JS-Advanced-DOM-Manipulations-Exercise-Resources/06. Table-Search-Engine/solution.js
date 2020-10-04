function solve() {
   let dataTr = Array.from(document.querySelectorAll('tbody > tr'));
   let searchBtn = document.querySelector('#searchBtn');
   let searchField = document.querySelector('#searchField');

   searchBtn.addEventListener('click', () => {
     dataTr.forEach(x => {
        if (x.innerHTML.includes(searchField.value)) {
         x.className = 'select';
        }else{
           x.className = '';
        }
     })
     searchField.value = '';
   })
   
}
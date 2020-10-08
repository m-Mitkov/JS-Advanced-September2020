function deleteByEmail() {
    let tableContent = document.querySelector('table > tbody');
    let tableRowsElements = Array.from(document.querySelectorAll('tbody > tr'));
    
  let emails = [];
  tableRowsElements.forEach(x => emails.push(x.lastElementChild));

   let inputText = document.querySelector('label > input');
 
   emails.forEach(x => () => {
       if (x === inputText.value) {
           emails[x] = null;
           inputText.value = '';
       }
   });
}
function addItem() {
    let ul = document.getElementById('items');
    let textToAdd = document.getElementById('newText');
    let liElement = document.createElement('li');
    let span = document.createElement('span');

    liElement.innerHTML = textToAdd.value;
    span.innerHTML = ' Delete';
    liElement.appendChild(span);
    
    let spanElement = document.getElementById('span');
    
    span.addEventListener('click', function  (e) {
        let elementToDelete = e.target.parentElement;
        console.log(elementToDelete);
        elementToDelete.remove();    
    });
    
    ul.appendChild(liElement);
    textToAdd.value = '';

}
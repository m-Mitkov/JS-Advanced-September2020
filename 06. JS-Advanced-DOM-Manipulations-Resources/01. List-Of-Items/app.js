function addItem() {
    let ulList = document.getElementById('items');
    let textToAdd = document.getElementById('newItemText');
    let li = document.createElement('li');

    li.innerHTML = textToAdd.value;
    ulList.appendChild(li);
    textToAdd.value = '';
}


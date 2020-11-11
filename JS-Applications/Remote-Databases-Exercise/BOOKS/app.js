let baseURL = `https://books-d3d3b.firebaseio.com/`;

let htmlElements = {
    titleElement: () => document.getElementById('title'),
    authorElement: () => document.getElementById('author'),
    isbnElement: () => document.getElementById('isbn'),
    submitButtonElement: () => document.querySelector("body > form:nth-child(3) > button"),
    loadBooksButton: () => document.querySelector("#loadBooks"),
    tableBody: () => document.querySelector("body > table > tbody"),
    editForm: () => document.getElementById('edit-form'),
    editTitleElement: () => document.getElementById('edit-title'),
    editAuthorElement: () => document.getElementById('edit-author'),
    editIsbnElement: () => document.getElementById('edit-isbn'),
    submitEditedBookBtn: () => document.getElementById('submit-editedBook'),
}

function bookTemplate(data) {
    let [key, author, isbn, title] = data;
    let result = `<tr data-key="${key}">
       <td>${title}</td>
       <td>${author}</td>
       <td>${isbn}</td>
       <td>
           <button class="edit-btn">Edit</button>
           <button class="delete-btn">Delete</button>
       </td>
   </tr>`

    return result;
};

htmlElements.loadBooksButton().addEventListener('click', loadBooks);
htmlElements.submitButtonElement().addEventListener('click', addBook);

function loadBooks() {
    fetch(baseURL + '.json')
        .then(respone => respone.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                let { author, isbn, title } = data[key];
                let obj = [key, author, isbn, title];
                let currentBookHTML = bookTemplate(obj);
                htmlElements.tableBody().innerHTML += currentBookHTML;
            });

            let editBtns = document.getElementsByClassName('edit-btn'); // return array of HTML elements
            Object.values(editBtns).forEach(x => {
                x.addEventListener('click', editBook);
            });

            let deleteBtns = document.getElementsByClassName('delete-btn');
            Object.values(deleteBtns).forEach(x => {
                x.addEventListener('click', deleteBook);
            });
        });
};

function editBook(e) {
    e.preventDefault()
    let keyOfBookToEdit = e.target.parentElement.parentElement.getAttribute('data-key');

    fetch(baseURL + keyOfBookToEdit + '.json')
        .then(response => response.json())
        .then(data => {
            htmlElements.editTitleElement().value = data.title;
            htmlElements.editAuthorElement().value = data.author;
            htmlElements.editIsbnElement().value = data.isbn;
            htmlElements.editForm().style.display = 'block';

            htmlElements.submitEditedBookBtn().setAttribute('data-key', keyOfBookToEdit);
            htmlElements.submitEditedBookBtn().addEventListener('click', submitEditedBook);


        });
    function submitEditedBook(e) {
        e.preventDefault();
        let obj = {
            title: htmlElements.editTitleElement().value,
            author: htmlElements.editAuthorElement().value,
            isbn: htmlElements.editIsbnElement().value,
        };

        htmlElements.editForm().style.display = 'none';

        fetch(baseURL + keyOfBookToEdit + '.json', {
            method: 'PATCH',
            body: JSON.stringify(obj)
        })
        .then(htmlElements.tableBody().innerHTML = '')
        .then(loadBooks);
    }
}

function deleteBook(e) {
    let keyBookToBeDeleted = e.target.parentElement.parentElement.getAttribute('data-key');
  
    fetch(baseURL + keyBookToBeDeleted + '.json', {
        method: 'DELETE'
    })
    .then(htmlElements.tableBody().innerHTML = '')
    .then(loadBooks);
}

function addBook(e) {
    e.preventDefault();
    let obj = {
        title: htmlElements.titleElement().value,
        author: htmlElements.authorElement().value,
        isbn: htmlElements.isbnElement().value,
    };
    htmlElements.tableBody().innerHTML = '';

    fetch(baseURL + '.json', {
        method: 'POST',
        body: JSON.stringify(obj)
    })
        .then(loadBooks);

    htmlElements.titleElement().value = '';
    htmlElements.authorElement().value = '';
    htmlElements.isbnElement().value = '';
}

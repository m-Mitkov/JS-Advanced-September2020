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
    editButtonLoadBooks: () => document.getElementById('edit-ButtonLoadBooks'),
    editButtonInEditForm: () => document.getElementById('edit-Btn'),
}

function bookTemplate(data) {
    let [key, author, isbn, title] = data;
    let result = `<tr data-key="${key}">
       <td>${title}</td>
       <td>${author}</td>
       <td>${isbn}</td>
       <td>
           <button id="edit-btn">Edit</button>
           <button id="delete-btn">Delete</button>
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
        });
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

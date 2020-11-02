function attachEvents() {
    let url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
    let ulPhonebook = document.querySelector("#phonebook");
    let buttonLoad = document.querySelector("#btnLoad");
    let buttonCreate = document.querySelector('#btnCreate');

    buttonLoad.addEventListener('click', () => {
        fetch(url)
            .then((response) => response.json())
            .then(data => {
                Object.keys(data).forEach(key => {
                    let li = document.createElement('li');
                    li.textContent = `${data[key].person}: ${data[key].phone}`;
                    let deleteButton = document.createElement('button');
                    
                    deleteButton.textContent = "Delete";
                    deleteButton.addEventListener('click', () => deleteFunction(key));

                    li.appendChild(deleteButton);
                    ulPhonebook.appendChild(li);
                });
            });
    });

    function deleteFunction(key){
        let deleteURL = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;
        fetch(deleteURL, { method: "DELETE" });
    }

    buttonCreate.addEventListener('click', create);

    function create(){
        let person = document.getElementById("person");
        let phone = document.getElementById("phone");

        fetch(url, {
            method: "POST",
            body: JSON.stringify({person: person.value, phone: phone.value})
        });
        
    }
}

attachEvents();
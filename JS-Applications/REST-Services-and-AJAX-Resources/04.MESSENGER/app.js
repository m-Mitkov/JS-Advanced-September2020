function attachEvents() {
    let url = `https://rest-messanger.firebaseio.com/messanger.json`;
    
    let sendButton = document.getElementById('submit');
    sendButton.addEventListener('click', send);
    
    function send(){
        let inputNameElement = document.getElementById('author'); // value
        let inputMessageElement = document.getElementById('content'); // value

        if (inputNameElement.value == '' || inputMessageElement.value == '') {
            return;
        }

        let objectToSend = {author: inputNameElement.value, content: inputMessageElement.value};
        fetch(url, {
            method: "POST",
            body: JSON.stringify(objectToSend)
        });

        inputNameElement.value = '';
        inputMessageElement.value = '';
    };

    let textAreaElement = document.getElementById('messages');
    let refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', refresh);

    function refresh(){
        let result = '';

        fetch(url) // GET request by default
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(currentMessage => {
                result += `${data[currentMessage].author}: ${data[currentMessage].content}`;
                result += '\n';
            })

            textAreaElement.innerHTML = result;
        })
    }
}

attachEvents();
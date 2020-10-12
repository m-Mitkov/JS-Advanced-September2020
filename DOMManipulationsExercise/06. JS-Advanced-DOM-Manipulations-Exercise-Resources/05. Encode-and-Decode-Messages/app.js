function encodeAndDecodeMessages() {
    let inputMessage = document.querySelectorAll('textarea')[0];
    let encodeButton = document.querySelectorAll('button')[0];
    encodeButton.addEventListener('click', encodedMessage);

    let outputMessage = document.querySelectorAll('textarea')[1];
    let decodeButton = document.querySelectorAll('button')[1];
    decodeButton.addEventListener('click', decodeMessage);

    function encodedMessage() {
        let message = inputMessage.value;
        let encodeMessage = '';

        for (let index = 0; index < message.length; index++) {
            encodeMessage += String.fromCharCode(ascii(message[index]) + 1);
        }

        outputMessage.value = encodeMessage;
        inputMessage.value = '';
    }

    function decodeMessage() {
        let message = outputMessage.value;
        let decodedMessage = '';

        for (let index = 0; index < message.length; index++) {
            decodedMessage += String.fromCharCode(ascii(message[index]) - 1);
        }

        outputMessage.value = decodedMessage;
    }
}

function ascii(a) {
    return a.charCodeAt(0);
}

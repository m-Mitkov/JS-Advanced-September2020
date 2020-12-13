function solve() {
   const htmlElements = {
      'sendButtonElement': () => document.querySelector('#send'),
      'inputText': () => document.querySelector('#chat_input'),
      'myProfilePictureInChatElement': () => document.querySelector("#chat_messages > div.profile.my-profile"),
      'chatBoxBody': () => document.querySelector("#chat_box_body"),
      'chatMessageElement': () => document.querySelector('#chat_messages'),
   };

   htmlElements.sendButtonElement().addEventListener('click', sendMessage);

   function sendMessage() {
      let text = htmlElements.inputText();

      if (text) {
         console.log('in if');
         let inputText = htmlElements.inputText().value;
         
        let myMessageDiv = document.createElement('div');
        myMessageDiv.setAttribute('class', 'message my-message');
        myMessageDiv.innerHTML = inputText;

        let chatMessageElement = htmlElements.chatMessageElement();
        chatMessageElement.appendChild(htmlElements.myProfilePictureInChatElement());
        chatMessageElement.appendChild(myMessageDiv);

        htmlElements.inputText().value = '';
      }
   }
}


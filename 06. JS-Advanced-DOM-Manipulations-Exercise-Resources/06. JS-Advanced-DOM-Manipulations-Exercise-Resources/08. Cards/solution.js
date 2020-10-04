function solve() {
   let playerOneDeck = document.getElementById('player1Div');
   let playerOneCards = Array.from(playerOneDeck.children);

   playerOneCards.forEach(x =>
      x.addEventListener('click', getCurrentCardValue));

   let playerTwoDeck = document.getElementById('player2Div');
   let playerTwoCards = Array.from(playerTwoDeck.children);

   playerTwoCards.forEach(x =>
      x.addEventListener('click', getCurrentCardValue));

   function getCurrentCardValue() {

      let currentCard = event.target;
      currentCard.src = 'images/whiteCard.jpg'; 
      let number = Number(currentCard.name);

     let spanResult = Array.from(document.getElementById('result'));
     let history = [];
    //console.log(spanResult.innerHTML);
    let card1 = null;
    let card2 = null;

    if (card1 === null) {
       card1 = number;
    }else{
       card2 = number;
    }
   }

   spanResult[0].innerHTML = card1;
   spanResult[2].innerHTML = card2;
history.push(spanResult[0].innerHTML);
history.push(spanResult[1].innerHTML);
history.push(spanResult[2].innerHTML)
   console.log(history);
}
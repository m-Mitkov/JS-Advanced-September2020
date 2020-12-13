function solve() {

    const htmlElements = {
        'keyButtons': () => document.querySelectorAll('.keys button'),
        'calculator': () => document.getElementById('calculator'),
    };

    htmlElements.calculator().addEventListener('click', startCalculator);


    function startCalculator(e){
        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

       if (e.target.type == 'button') {
         let value = e.target.value;

         if (numbers.includes(value)) {
             console.log('worked');
         }
       }
    }
}


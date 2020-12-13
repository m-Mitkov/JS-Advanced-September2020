function solve() {

    const htmlElements = {
        'inputNumber': () => document.querySelector('#input'),
        'convertionValue': () => document.querySelector('#selectMenuTo'),
        'resultFieldElement': () => document.querySelector('#result'),
        'buttonConvert': () => document.querySelector('#container > button')
    }

    htmlElements.buttonConvert().addEventListener('click', () => {
        
        let convertCondition = htmlElements.convertionValue().value;
        let numberToConvert = htmlElements.inputNumber().value;
    
        if (numberToConvert) {
    
            if (convertCondition == 'hexadecimal') {
                htmlElements.resultFieldElement().value = convertDecimalToHexadecimal(numberToConvert);
            } else {
                htmlElements.resultFieldElement().value = convertDecimalToBinary(numberToConvert);
    
            }
        }
    });
}

function convertDecimalToBinary(num) {
    let result = [];

    while (num > 0) {
        let currentNum = num % 2;
        num = Math.floor(num / 2);
        result.unshift(currentNum);
    }

    //   console.log(result.toString());
    //   let converted = '';
    //   result.forEach(x => {
    //       converted += x;
    //   });
    //   return converted;

    return result.toString().replace(/,/g, '');
}

function convertDecimalToHexadecimal(num) {

    return Number(num).toString(16);
}
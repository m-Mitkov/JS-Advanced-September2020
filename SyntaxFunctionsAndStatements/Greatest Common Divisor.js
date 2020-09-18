function Calculate(firstNum, secondNum) {
    let smallerNumber = Math.min(firstNum, secondNum)

    let greatestCommonDivisor;

    for (let i = smallerNumber; i >= 0; i--) {
        if (firstNum % i == 0 && secondNum % i == 0) {

            greatestCommonDivisor = i;
            break;
        }
    }

    console.log(greatestCommonDivisor);
}

Calculate(15, 5);
Calculate(2154, 458);
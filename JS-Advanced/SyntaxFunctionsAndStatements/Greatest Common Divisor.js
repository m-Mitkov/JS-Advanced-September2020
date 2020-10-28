<<<<<<< HEAD
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
=======
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
>>>>>>> b20ba10af71661ee6fc1e0e791e79c5a860d59de
Calculate(2154, 458);
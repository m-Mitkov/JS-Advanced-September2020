<<<<<<< HEAD
function CheckIfDigitsAreSame(inputNumber) {

    let firsNumber = inputNumber % 10;
    inputNumber = Math.floor(inputNumber / 10);
    let sumDigits = firsNumber;
    let digitsAreTheSame = true;

    while (inputNumber > 0) {
        let nextNumber = inputNumber % 10;

        if (firsNumber != nextNumber) {
            digitsAreTheSame = false;
        }

        sumDigits += nextNumber;
        inputNumber = Math.floor(inputNumber / 10);
    }
    console.log(digitsAreTheSame)
    console.log(sumDigits);
}

CheckIfDigitsAreSame(2222222);
=======
function CheckIfDigitsAreSame(inputNumber) {

    let firsNumber = inputNumber % 10;
    inputNumber = Math.floor(inputNumber / 10);
    let sumDigits = firsNumber;
    let digitsAreTheSame = true;

    while (inputNumber > 0) {
        let nextNumber = inputNumber % 10;

        if (firsNumber != nextNumber) {
            digitsAreTheSame = false;
        }

        sumDigits += nextNumber;
        inputNumber = Math.floor(inputNumber / 10);
    }
    console.log(digitsAreTheSame)
    console.log(sumDigits);
}

CheckIfDigitsAreSame(2222222);
>>>>>>> b20ba10af71661ee6fc1e0e791e79c5a860d59de
CheckIfDigitsAreSame(1234)
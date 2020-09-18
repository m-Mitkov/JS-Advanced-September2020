function calculate(fruit, kilograms, pricePerKg){
   
    let result = (kilograms * pricePerKg) / 1000;
    kilograms /= 1000;

    console.log(`I need $${result.toFixed(2)} to buy ${kilograms.toFixed(2)} kilograms ${fruit}.`);
}

calculate('orange', 2500, 1.80);


<<<<<<< HEAD
function calculate(fruit, kilograms, pricePerKg){
   
    let result = (kilograms * pricePerKg) / 1000;
    kilograms /= 1000;

    console.log(`I need $${result.toFixed(2)} to buy ${kilograms.toFixed(2)} kilograms ${fruit}.`);
}

calculate('orange', 2500, 1.80);

=======
function calculate(fruit, kilograms, pricePerKg){
   
    let result = (kilograms * pricePerKg) / 1000;
    kilograms /= 1000;

    console.log(`I need $${result.toFixed(2)} to buy ${kilograms.toFixed(2)} kilograms ${fruit}.`);
}

calculate('orange', 2500, 1.80);

>>>>>>> b20ba10af71661ee6fc1e0e791e79c5a860d59de

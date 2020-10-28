<<<<<<< HEAD
function Solve(input) {

    let number = Number(input[0]);

    for (i = 1; i <= input.length; i++) {

        let toDo = input[i];

        switch (toDo) {
            case "chop":
                number /= 2;
                console.log(number.toFixed(2));
                break;
            case "dice":
                number = Math.sqrt(number);
                console.log(number.toFixed(2));
                break;
            case "spice":
                number += 1;
                console.log(number.toFixed(2));
                break;
            case "bake":
                number *= 3;
                console.log(number.toFixed(2));
                break;
            case "fillet":
                number *= 0.80;
                console.log(number.toFixed(2));
                break;
        }
    }
}

Solve(['32', 'chop', 'chop','chop','chop','chop']);
=======
function Solve(input) {

    let number = Number(input[0]);

    for (i = 1; i <= input.length; i++) {

        let toDo = input[i];

        switch (toDo) {
            case "chop":
                number /= 2;
                console.log(number.toFixed(2));
                break;
            case "dice":
                number = Math.sqrt(number);
                console.log(number.toFixed(2));
                break;
            case "spice":
                number += 1;
                console.log(number.toFixed(2));
                break;
            case "bake":
                number *= 3;
                console.log(number.toFixed(2));
                break;
            case "fillet":
                number *= 0.80;
                console.log(number.toFixed(2));
                break;
        }
    }
}

Solve(['32', 'chop', 'chop','chop','chop','chop']);
>>>>>>> b20ba10af71661ee6fc1e0e791e79c5a860d59de
Solve(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);
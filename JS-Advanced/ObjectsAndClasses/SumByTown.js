function solve(input) {
    let towns = {};

    for (let index = 0; index < input.length; index += 2) {

        let town = input[index];
        let income = Number(input[index + 1]);

        if (!towns[town]) {
            towns[town] = 0;
        }
            towns[town] += income;
    }

   return JSON.stringify(towns);
}


solve(['Sofia', '20', 'Varna', '3', 'Sofia', '5', 'Varna', '4']);
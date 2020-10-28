function solve(input) {

    let result = {};
    input = input
        .map(x => x.split(' <-> '));

    for (let index = 0; index < input.length; index++) {
        let town = input[index][0];
        let population = Number(input[index][1]);

        if (!result.hasOwnProperty(town)) {
            result[town] = 0;
        }
        result[town] += population;
    }

    Object
        .keys(result)
        .forEach(town => {
            console.log(`${town} : ${result[town]}`)
        });
}
solve(['Sofia <-> 1200000',
    'Sofia <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000']);
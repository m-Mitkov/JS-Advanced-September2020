function solve(input) {
    let data = input
        .map(row => row.split(' | ').filter(x => x != '').map(x => x.trim()));

    let result = [];

    data.forEach(line => {
        let [town, product, price] = line;
        price = Number(price);

        // let obj = {
        //     'Town': line[0],
        //     'Product': line[1],
        //     'Price': Number(line[2]),
        // }

        if (result[product] == undefined) {
            result[product] = line;
            // result[product].push(line);
        } else {
            if (price < result[product][2]) {
                result[product] = line;
            }
        }
    });
    for (let product in result) {
        console.log((`${result[product][1]} -> ${result[product][2]} (${result[product][0]})`));
    }
}
   



solve(['Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000'])
function solve(input) {
    let data = input
        .map(row => row.split(' | ').filter(x => x != '').map(x => x.trim()));

    let minPrice = Number.MAX_SAFE_INTEGER;
    let productWithLowestPrice = '';

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
        }else{
            if (result[product][2] >= price) {
                result[product] = line;
            }
            //result[product] = line;
        }
    })

    console.log(result);
}

solve(['Sample Town | Orange | 1000',
'Sample Town | Orange | 2'])

// solve(['Sample Town | Sample Product | 1000',
//     'Sample Town | Orange | 2',
//     'Sample Town | Peach | 1',
//     'Sofia | Orange | 3',
//     'Sofia | Peach | 2',
//     'New York | Sample Product | 1000.1',
//     'New York | Burger | 10'])
function Solve(input) {

    let countOfRotations = Number(input[input.length - 1]);
    input.pop();
    //let resultArr = input.map(x => x);

    for (let i = 0; i < countOfRotations; i++) {

        let lastElement = input.pop();
        input.unshift(lastElement);
    }

    console.log(input.join(' '));
}

Solve(['1', '2', '3', '4', '2']);
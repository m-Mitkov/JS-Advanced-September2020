function result(...argument) {
    let result = {};

    argument.forEach(element => {
        let elementType = typeof (element);

        if (result != elementType) {
            result[elementType] = 0;
        }
        console.log(`${elementType}: ${element}`);
        result[elementType]++;
    });

    Object.keys(result).sort((x, y) => result[y] - result[x])
    .forEach(k => console.log(`${k} = ${result[k]}`));
}

result('cat', 42, function () { console.log(('Hello world!')); });
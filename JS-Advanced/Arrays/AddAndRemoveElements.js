function Solve(input) {

    let result = [];
    let counter = 0;
    for (let i = 0; i < input.length; i++) {

        if (input[i] == 'add') {
            result[counter] = i + 1;
            counter++;
        }
        else if(result.some()){
            result.pop();
            counter--;
        }
    }

    console.log(result.length !== 0 ? result.join('\n') : 'Empty')
}

Solve(['add', 'add', 'add', 'add']);
Solve(['remove']);
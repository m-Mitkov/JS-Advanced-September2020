function Solve(input) {

    input.sort((currenr, next) => {
        if (currenr.length > next.length) {
            return 1;
        }
        else if (currenr.length === next.length) {
            currenr > next;
        }
        else {
            return -1;
        }
    }).forEach(e => console.log(e));


}

Solve('Denny', 'omen', 'test', 'Default');
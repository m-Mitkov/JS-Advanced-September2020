function Solve(input) {

    let maxNum = Number.MIN_SAFE_INTEGER;
    let filteredSequence = input.filter(FilterMaxNum);

    function FilterMaxNum(number) {
        if (number >= maxNum) {
            maxNum = number;
            return true;
        }
        return false;
    }

    console.log(filteredSequence.join('\n'));
}

Solve(['1', '3', '8', '4', '10', '12', '3', '2', '24']);
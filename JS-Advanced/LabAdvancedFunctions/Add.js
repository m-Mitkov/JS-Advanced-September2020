function solution(input) {

    function add(numberToAdd) {
        let result = this.Number(input) + Number(numberToAdd)
        return result;
    }

    return add;
}

let add5 = solution(5);
console.log(add5(2));
console.log(add5(3));
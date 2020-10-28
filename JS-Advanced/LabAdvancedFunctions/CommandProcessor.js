function solution() {
    let result = '';

    return {
        append: (s) => result += s,
        removeStart: (count) => result = result.substring(count),
        removeEnd: (count) => result = result.substring(0, result.length - count),
        print: () => console.log(result)
    }
}

let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();
function solve(data, sortCondition){
    if (sortCondition === 'asc') {
        data = data.sort((x, y) => x - y);
    }else{
        data = data.sort((x, y) => y - x);
    }

    return Array.from(data);
}

solve([14, 7, 17, 6, 8], 'desc')
function solve(data, criteria) {
    let inputData = JSON.parse(data);
    let result;

    if (criteria !== 'all') {
        let [key, value] = criteria.split('-');
        result = inputData.filter(x => x[key] == value);
    } else {
        result = inputData;
    }
   
    for (let index = 0; index < result.length; index++) {
        console.log(`${index}. ${result[index].first_name} ${result[index].last_name} - ${result[index].email}`);
    }
}
solve(
    `[{
   "id": "1",
   "first_name": "Ardine",
   "last_name": "Bassam",
   "email": "abassam@cnn.com",
   "gender": "Female" 
}, 
{
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
}, 
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male" 
}]`,
    'all');
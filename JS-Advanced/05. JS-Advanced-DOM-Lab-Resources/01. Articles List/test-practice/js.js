
function submitFunction() {
    var registeredPeople = [];
    //let name = Document.getElementsByClassName('blank');

    // let person = {
    //     'name': name[0],
    //     'surname': name[1],
    //     'family': name[2],
    // }
    let person2 = {
        name: 'aaaaa',
        'surname': 'aaaaa',
        'family': 'aaaa',
    }
    let person3 = {
        name: 'bbbbb',
        'surname': 'bbbbb',
        'family': 'bbb',
    }
    registeredPeople.push(person2);
    registeredPeople.push(person3);

    console.log(person3.surname);
    for (const person in registeredPeople) {
        console.log(`Name: ${person[0].name}`);
    }
}

submitFunction();

// function getRegisteredPeople() {

//     registeredPeople.forEach(p => {
//         console.log(`Name: ${p.name.value}`);
//     })
// }
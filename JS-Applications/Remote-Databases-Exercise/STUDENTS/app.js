const baseURL = `https://students-f6e5d.firebaseio.com/.json`;
const createElements = (...types) => types.map((type) => document.createElement(type));
const tbody = document.querySelector('tbody');
const submitButtonElement = document.querySelector("#submit-Btn");

submitButtonElement.addEventListener('click', submitStudentToDB);

function appendStudentsToDOM(students) {
    tbody.innerHTML = '';

    tbody.append(
        ...Object.values(students)
            .sort((a, b) => a.ID - b.ID)
            .map((s) => {
                const elements = createElements('tr', 'th', 'th', 'th', 'th', 'th');
                const [trElement, ID, FirstName, LastName, FacultyNumber, Grade] = elements;

                FacultyNumber.innerHTML = s.FacultyNumber;
                FirstName.innerHTML = s.FirstName;
                Grade.innerHTML = s.Grade;
                ID.innerHTML = s.ID;
                LastName.innerHTML = s.LastName;

                trElement.append(...elements.splice(1));
                return trElement;
            }));
}
function loadStudents() {
    fetch(baseURL)
        .then(response => response.json())
        .then(appendStudentsToDOM);
}
// it is an extra functionality made to be able to test it better 
function submitStudentToDB(e) {
    //e.preventDefault();
    const firstName = document.getElementById('name').value;
    const lastName = document.getElementById('last-name').value;
    const facultyNumber = document.getElementById('facultyN').value;
    const grade = document.getElementById('grade').value;

    let obj = {
        "FacultyNumber": facultyNumber,
        "FirstName": firstName,
        "LastName": lastName,
        "Grade": grade,
        "ID": Date.now() / 1000000000,
    }

    fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(obj)
    });
}
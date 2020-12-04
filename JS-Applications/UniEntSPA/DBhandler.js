const baseURL = 'https://unient-cc151.firebaseio.com/';

async function getAllEvents() {

    return await fetch(baseURL + '.json', {
        method: 'GET',
    })
        .then(data => data.json());
}

async function getSingleEvent(id) {

    return await fetch(baseURL + `${id}/` + '.json', {
        method: 'GET',
    })
        .then(data => data.json());
}

async function sendEventToDB(event) {
    console.log(event);
    return await fetch(baseURL + '.json' + `?=${event.refreshToken}`, {
        method: 'POST',
        body: JSON.stringify(event),
    });
}

async function editEvent(updatedParams, id) {
    let event;

    await getSingleEvent(id)
        .then(x => {
         
            event = { ...x, ...updatedParams };
        });

    return await fetch(baseURL + `${id}/` + '.json' + `?=${event.refreshToken}`, {
        method: 'PUT',
        body: JSON.stringify(event),
    });
}

async function deleteEvent(id){

    await fetch(baseURL + `${id}/` + '.json' + `?=${event.refreshToken}`, {
        method: 'DELETE'
    })
    .then(res => res.json());
}
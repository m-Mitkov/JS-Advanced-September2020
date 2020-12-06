const baseURL = 'https://myblog-3e079.firebaseio.com/';

async function getAllDestinations() {

    return await fetch(baseURL + '.json', {
        method: 'GET',
    })
        .then(data => data.json());
}

async function getSingleDestination(id) {

    return await fetch(baseURL + `${id}/` + '.json', {
        method: 'GET',
    })
        .then(data => data.json());
}

async function sendDestinationToDB(destination) {

    return await fetch(baseURL + '.json', { // + `?=${event.refreshToken}`
        method: 'POST',
        body: JSON.stringify(destination),
    });
}

async function editDestination(updatedParams, id) {
    let destination;

    await getSingleDestination(id)
        .then(x => {
         
            destination = { ...x, ...updatedParams };
        });

    return await fetch(baseURL + `${id}/` + '.json', { // + `?=${event.refreshToken}`, {
        method: 'PUT',
        body: JSON.stringify(destination),
    });
}

async function deleteDestination(id){

    await fetch(baseURL + `${id}/` + '.json', { // + `?=${event.refreshToken}`, {
        method: 'DELETE'
    })
    .then(res => res.json());
}

async function getMyDestinations(userID){
    let destinations = await getAllDestinations();
    let filtered = [];

        Object.entries(destinations).forEach(x => {
            if(x[1].owner == userID){

                filtered.push({
                    'id': x[0],
                    ...x[1],
                });
            }
        });
       return filtered;
}


async function deleteDestination(id){

    await fetch(baseURL + `${id}/` + '.json', { //+ `?=${event.refreshToken}`
        method: 'DELETE'
    })
    .then(res => res.json());
}
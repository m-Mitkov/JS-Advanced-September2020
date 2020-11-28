// const baseUrl = 'https://movies-catalog-ab7f7.firebaseio.com/';

async function getAllMovies() {

    return await fetch(baseUrl + '.json', {
        method: 'GET'
    })
        .then(res => res.json());
}

async function getSingleMovie(id) {

    return await fetch(baseUrl + `${id}/` + '.json', {
        method: 'GET'
    })
        .then(res => res.json());
}

async function deleteMovie(id) {

    return await fetch(baseUrl + `${id}/` + '.json', {
        method: 'DELETE'
    })
        .then(res => res.json());
}

async function editMovie(updatedParams, id){
    let movie;

    await getSingleMovie(id)
    .then(mov => {
        movie = {...mov, ...updatedParams};
    });

   return await fetch(baseUrl + `${id}/` + '.json', {
        method: 'PUT',
        body: JSON.stringify(movie),
    });
}
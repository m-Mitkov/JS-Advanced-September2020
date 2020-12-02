const baseURL = 'https://myblog-3e079.firebaseio.com/';

async function getAllBlogs() {

    return await fetch(baseURL + '.json', {
        method: 'GET',
    })
        .then(data => data.json());
}

async function getSingleBlog(id) {

    return await fetch(baseURL + `${id}/` + '.json', {
        method: 'GET',
    })
        .then(data => data.json());
}

async function sendEventToDB(blog) {

    return await fetch(baseURL + '.json', { // + `?=${event.refreshToken}`
        method: 'POST',
        body: JSON.stringify(blog),
    });
}

async function editBlog(updatedParams, id) {
    let blog;

    await getSingleBlog(id)
        .then(x => {
         
            blog = { ...x, ...updatedParams };
        });

    return await fetch(baseURL + `${id}/` + '.json', { // + `?=${event.refreshToken}`, {
        method: 'PUT',
        body: JSON.stringify(blog),
    });
}

async function deleteEvent(id){

    await fetch(baseURL + `${id}/` + '.json', { // + `?=${event.refreshToken}`, {
        method: 'DELETE'
    })
    .then(res => res.json());
}

async function getMyBlogs(userID){
    let blogs = await getAllBlogs();
    let filtered = [];

        Object.entries(blogs).forEach(x => {
            if(x[1].owner == userID){

                filtered.push({
                    'id': x[0],
                    ...x[1],
                });
            }
        });
       return filtered;
}


async function deleteBlog(id){

    await fetch(baseURL + `${id}/` + '.json', { //+ `?=${event.refreshToken}`
        method: 'DELETE'
    })
    .then(res => res.json());
}
function validatePasswordsAreEqual(param1, param2) {
    if (param1 !== param2) {
        // errorNotificationHandler('passwords must match each other');
        return false;
    }
    return true;
}

function validateEmail(email) {
    let usernameLength = email.split('@')[0];

    if (usernameLength.length > 3) {
        return true;
    } else {
        return false;
        // errorNotificationHandler('Email length must be at least 10 symblos')
    }
}

async function isBlogtMine(id) {
    let curentUserId = await getLogedUser().uid;
    
    let result;

    await getSingleBlog(id)
        .then(res => {
            console.log(res);
            result = res.owner == curentUserId ? true : false;
        });
    return result;
}
function validatePassword(param1, param2) {
    if (param1 !== param2) {
        errorNotificationHandler('password shoud match each other');
        return false;
    } else {
        return _validateLengthPassword(param1) ? true : false
    }
}
function _validateLengthPassword(password) {
    if (password.length < 6) {
        errorNotificationHandler('password should be at least 6 symbols long');
        return false;
    } else {
        return true;
    }
}

function validateEmail(email) {

    if (email.length < 10) {
        errorNotificationHandler('the email must be at leats 10 symbols long');
        return false;
    } else {
        return true;
    }
}

function validateUser() {
    let isUserLogedIn = userIsLogedIn();
    let emailLogedUser = getLoggedUser()?.email;

    return {
        'userIsLogedIn': isUserLogedIn,
        'email': emailLogedUser
    };
}

async function isMovieMine(id) {
    let curentUserId = await getLoggedUser().uid;
    let result;

    await getSingleMovie(id)
        .then(res => {
            result = res.owner == curentUserId ? true : false;
        });
    return result;
}

function errorNotificationHandler(msg) {
    const errorNotify = document.getElementById('errorBox');

    errorNotify.innerHTML = msg;
    errorNotify.style.display = 'block';

    setTimeout(function () {
        errorNotify.style.display = 'none';
    }, 3000);
}

function successNotificationHandler(msg) {
    const successNotify = document.getElementById('successBox');

    successNotify.innerHTML = msg;
    successNotify.style.display = 'block';

    setTimeout(function () {
        successNotify.style.display = 'none';
    }, 3000);
}
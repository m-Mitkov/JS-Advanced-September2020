function validatePasswordsAreEqual(param1, param2) {
    if (param1 !== param2 && param1 !== null && param2 !== null) {
        errorNotificationHandler('passwords must match each other');
        return false;
    }
    return true;
}

function validatePasswordOnLogin(param1) {
    if (param1 !== null) {
        // errorNotificationHandler('passwords must match each other');
        return true;
    }
    return false;
}

function validateEmail(email) {
    let usernameLength = email.split('@')[0];

    if (usernameLength.length > 3) {
        return true;
    } else {
        errorNotificationHandler('Invalid email adress')
        return false;
    }
}

function validateParams(params){
    let {destination, duration, departureDate, imgUrl, city} = params;

    if (typeof destination == 'string' && typeof city == 'string' && typeof departureDate == 'string' && typeof imgUrl == 'string' &&  duration > 1 && duration <= 100 ) {
        return true;
    }
    return false;
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
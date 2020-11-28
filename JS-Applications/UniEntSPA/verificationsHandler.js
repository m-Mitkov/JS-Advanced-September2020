
function validatePasswordsAreEqual(param1, param2) {
    if (param1 !== param2) {
        errorNotificationHandler('passwords must match each other');
        return false;
    }
    return true;
}

function validateEmail(email) {
    let usernameLength = email.split('@')[0];

    if (usernameLength.length > 3) {
        return true;
    } else {
        errorNotificationHandler('Email length must be at least 10 symblos')
    }
}

function errorNotificationHandler(msg) {
    const errorNotify = document.getElementById('errorBox');
    errorNotify.innerHTML = msg;
    errorNotify.style.display = 'block';

    setTimeout(function () {
        errorNotify.style.display = 'none';
    }, 5000);
}

async function successNotificationHandler(msg) {
    const successNotify = document.getElementById('successBox');

    successNotify.innerHTML = msg;
    successNotify.style.display = 'block';

    setTimeout(function await() {
        successNotify.style.display = 'none';
    }, 2500);
}

function errorHandler(msg){
    errorNotificationHandler(msg);
}

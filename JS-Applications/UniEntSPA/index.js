
const auth = firebase.auth();

let app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs')

    this.get('/homePage', async function (context) {
        let events; 
        await getAllEvents()
        .then(e => {
            events = {...e};
        });

        let hasEvents = Object.keys(events).length > 0 ? true : false;

        loadCommonPArtials(context)
            .then(function () {
                if (isUserLogedIn()) {
                    this.loadPartials({
                        'notFoundForm': '/templates/notFoundError.hbs',
                    });
                    this.partial('/templates/homePage.hbs', 
                    { 'isUserLogedIn': isUserLogedIn(), 'emailUser': getLogedUser().email, 'hasEvents': hasEvents, 'event': events});
                } else {
                    this.partial('/templates/homePage.hbs', { 'isUserLogedIn': isUserLogedIn(), 'emailUser': '' });
                }

            });
    });

    this.get('/login', function (context) {
        loadCommonPArtials(context)
            .then(function () {
                this.loadPartials({
                    'errorNotify': '/templates/notifications/errorNotify.hbs',
                    'successNotify': '/templates/notifications/successNotify.hbs',
                })
                this.partial('/templates/loginForm.hbs');
            });
    });

    this.post('/login', function (context) {
        let { email, password } = context.params;
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                let { email, uid } = res.user;
                window.localStorage.setItem('user', JSON.stringify({ 'email': email, 'uid': uid }));
                this.redirect('/homePage');
                successNotificationHandler('Successfully loged in');
            })
            .catch(err => {
                errorNotificationHandler('Incorect email or password');
            });
    })

    this.get('/register', function (context) {

        loadCommonPArtials(context)
            .then(function () {
                this.loadPartials({
                    'errorNotify': '/templates/notifications/errorNotify.hbs',
                    'successNotify': '/templates/notifications/successNotify.hbs',
                });

                this.partial('/templates/registerForm.hbs');
            });
    });

    this.post('/register', function (context) {
        let { email, password, rePassword } = context.params;

        if (validatePasswordsAreEqual(password, rePassword) && validateEmail(email)) {

            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    successNotificationHandler('Successfull registration!')
                    this.redirect('/login');
                });
        }
    });

    this.get('/logout', function () {

        auth.signOut()
            .then(() => {
                window.localStorage.removeItem('user');
                this.redirect('/homePage');
            });
    });

    this.get('/details', function (context) {

        loadCommonPArtials(context)
            .then(function () {
                this.partial('/templates/details.hbs', { 'isUserLogedIn': isUserLogedIn(), 'emailUser': getLogedUser().email });
            });
    });

    this.get('/organizeEvent', function (context) {

        loadCommonPArtials(context)
            .then(function () {
                this.partial('/templates/organizeEventForm.hbs', { 'isUserLogedIn': isUserLogedIn(), 'emailUser': getLogedUser().email });
            });
    });

    this.post('/organizeEvent', function (context) {
        let owner = getLogedUser().uid;
        let event = {
            ...context.params,
            'owner': owner,
            'partecipants': [owner],
        };

        sendEventToDB(event)
            .then(x => {
                this.redirect('/homePage');
            });
    });
});

function getLogedUser() {
    return JSON.parse(window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')) : null;
}

function loadCommonPArtials(context) {
    return context.loadPartials({
        'header': 'templates/header.hbs',
        'footer': 'templates/footer.hbs',
    });
}


function isUserLogedIn() {
    return getLogedUser() ? true : false;
}

(() => {
    app.run('/homePage');
})();
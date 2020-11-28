const auth = firebase.auth();

let app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs')

    this.get('/homePage', function (context) {

        loadCommonPArtials(context)
            .then(function () {
                this.partial('/templates/homePage.hbs', { 'isUserLogedIn': isUserLogedIn() });
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
        console.log(context.params);
        if (validatePasswordsAreEqual(password, rePassword) && validateEmail(email)) {

            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    successNotificationHandler('Successfull registration!')
                    this.redirect('/login');
                });
        }
    });

});

function loadCommonPArtials(context) {
    return context.loadPartials({
        'header': 'templates/header.hbs',
        'footer': 'templates/footer.hbs',
    });
}

function getLogedUser() {
    return JSON.parse(window.localStorage.getItem('user'));
}

function isUserLogedIn() {
    return getLogedUser() ? true : false;
}

(() => {
    app.run('/homePage');
})();
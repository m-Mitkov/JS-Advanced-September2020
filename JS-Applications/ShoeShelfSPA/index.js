const auth = firebase.auth();

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    this.get('/homePage', function (context) {
        validateUserIsLoggedIn(context);

        customLoadPartials(context)
            .then(function () {
                this.partial('/templates/homePage.hbs');
            });
    });

    this.get('/register', function (context) {

        customLoadPartials(context)
        .then(function() {
            this.partial('/templates/registerForm.hbs');
        });
    });

    this.post('/register', function(context) {
        let {email, password, repeatPassword} = context.params;

        let validateEmails = validateEmail(email);
        let validatePasswords = validatePassword(password);
        let verifyInputParamsAreEquals = verifyInputParamsAreEqual(password, repeatPassword)

        if (validateEmails && validatePasswords && verifyInputParamsAreEquals) {
            auth.createUserWithEmailAndPassword(email, password)
            .then(newUser => {
                this.redirect('/login');
            });
        };
    });

    this.get('/login', function(context) {

        customLoadPartials(context)
        .then(function() {
            this.partial('/templates/loginForm.hbs');
        });
    });

    this.post('/login', function(context) {
        let {email, password} = context.params;

        auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            let{email, uid} = user.user;
            let currentUser = {
                email,
                uid,
                'uplodedShoesForSala': [],
                'bougthShoes': []
            };

            window.localStorage.setItem('user', JSON.stringify(currentUser));
            validateUserIsLoggedIn(context);
            this.redirect('/homePage');
        });
    });

    this.get('/logout', function(context) {
        auth.signOut()
        .then(x => {
            window.localStorage.removeItem('user');
            this.redirect('/login');
        });
    });
});

(() => {
    app.run('/homePage');
})();

function getLoggedUser() {
    return window.localStorage['user'];
}

function validateUserIsLoggedIn(context) {
    return getLoggedUser() ? context.isLogedIn = true : context.isLogedIn = false;
}

function customLoadPartials(context) {
    return context.loadPartials({
        'header': 'templates/common/header.hbs',
        'footer': 'templates/common/footer.hbs',
    });
}

function verifyInputParamsAreEqual(param1, param2){
   return param1 === param2; // come back here
}

function validateEmail(email) {
    return !email ? true : false; 
}

function validatePassword(password) {
    return password.length > 6 ? true : false;
}
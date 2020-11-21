const auth = firebase.auth();

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    this.get('/homePage', function (context) {
        let email;
        if (validateUserIsLoggedIn(context)) {
            email = JSON.parse(getLoggedUser()).email; // problem hitted: how to remove 'Regiser now' btn on loged user???
        }

        customLoadPartials(context)
            .then(function () {
                this.partial('/templates/homePage.hbs', { 'email': email }); // 2-nd param is the 'email template' in header
            });
    });

    this.get('/register', function (context) {
        validateUserIsLoggedIn(context);

        customLoadPartials(context)
            .then(function () {
                this.partial('/templates/registerForm.hbs');
            });
    });

    this.post('/register', function (context) {
        let { email, password, repeatPassword } = context.params;

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

    this.get('/login', function (context) {

        customLoadPartials(context)
            .then(function () {
                this.partial('/templates/loginForm.hbs');
            });
    });

    this.post('/login', function (context) {
        let { email, password } = context.params;

        auth.signInWithEmailAndPassword(email, password)
            .then(user => {
                let { email, uid } = user.user;
                let currentUser = {
                    email,
                    uid,
                    'uplodedShoesForSale': [],
                    'bougthShoes': []
                };

                window.localStorage.setItem('user', JSON.stringify(currentUser));
                validateUserIsLoggedIn(context);
                this.redirect('/homePage');
            });
    });

    this.get('/logout', function (context) {
        auth.signOut()
            .then(x => {
                window.localStorage.removeItem('user');
                this.redirect('/login');
            });
    });

    this.get('/createOffer', function (context) {
        let email = JSON.parse(getLoggedUser()).email;
        validateUserIsLoggedIn(context);

        customLoadPartials(context)
            .then(function () {
                this.partial('/templates/createOffer.hbs', { 'email': email });
            });
    });

    this.post('/createOffer', function (context) {
        let { name, price, image, description, brand } = context.params;
        let obj = {
            name, price, image, description, brand,
            'owner': JSON.parse(getLoggedUser()).uid,
        };

        fetch('https://shoe-shelf-1135f.firebaseio.com/.json', {
            method: 'POST',
            body: JSON.stringify(obj),
        })
            .then(res => {
                this.redirect('/shoesCatalog');
            });
        //manipulateLocaleStorage(obj);// get/remove/setItem do change local storage !!!

        // const currentUser = getLoggedUser().uplodedShoesForSale.push;
    });


    this.get('/shoesCatalog', function (context) {
        validateUserIsLoggedIn(context);
        context.offers = [];

        getAllShoes()
            .then(shoes => {
                Object.entries(shoes)
                    .forEach((key) => {
                        let id = key[0];
                        context.offers.push({'id': id, ...key[1]});

                        customLoadPartials(context)
                            .then(function () {
                                this.partial('/templates/shoesCatalog.hbs', {'id': id, 'shoes': shoes});
                            });
                    });
            });
            console.log(context);
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

function verifyInputParamsAreEqual(param1, param2) {
    return param1 === param2;
}

function validateEmail(email) {
    return !email ? true : false;
}

function validatePassword(password) {
    return password.length > 6 ? true : false;
}

function getAllShoes() {
    return fetch('https://shoe-shelf-1135f.firebaseio.com/.json')  // return {key: {obj}} object entries
        .then(response => response.json());
}

// function manipulateLocaleStorage(obj) {
//     let currentUser = JSON.parse(getLoggedUser());
//     console.log(currentUser);
//     const shoes = currentUser.uplodedShoesForSale;
//     shoes.push(obj);

//     window.localStorage.removeItem('user');
//     window.localStorage.setItem('user', obj);
//     let currentUser2 = JSON.parse(getLoggedUser());
//     console.log(currentUser2);
// }
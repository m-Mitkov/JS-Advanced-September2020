//const { data } = require("jquery");

const auth = firebase.auth();
const baseURL = 'https://shoe-shelf-1135f.firebaseio.com/';

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    this.get('/homePage', function (context) {
        let email;
        if (validateUserIsLoggedIn(context)) {
            email = JSON.parse(getLoggedUser()).email; // problem hit: how to remove 'Regiser now' btn on loged user???
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
        let verifyInputParamsAreEquals = verifyInputParamsAreEqual(password, repeatPassword);

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

        fetch(`${baseURL}.json`, {
            method: 'POST',
            body: JSON.stringify(obj),
        })
            .then(res => {
                this.redirect('/shoesCatalog');
            });
    });

    this.get('/shoesCatalog', function (context) {
        let email;
        if (validateUserIsLoggedIn(context)) {
            email = JSON.parse(getLoggedUser()).email; // problem hit: how to remove 'Regiser now' btn on loged user???
        }

        context.offers = [];

        getAllShoes()
            .then(shoes => {
                Object.entries(shoes)
                    .forEach((key) => {
                        let id = key[0];
                        context.offers.push({ 'id': id, ...key[1] });
                        customLoadPartials(context)
                            .then(function () {
                                this.partial('/templates/shoesCatalog.hbs', { 'shoes': context.offers, 'email': email });
                            });
                    });
            });
    });

    this.get('/description/:id', function (context) {
        let email;
        if (validateUserIsLoggedIn(context)) {
            email = JSON.parse(getLoggedUser()).email; 
        }

        let { id } = context.params;

        getShoeByID(id)
            .then(data => {

                customLoadPartials(context)
                    .then(function () {
                                        // HOW DO I KEEP THE ID FROM SHOECATALOG, I NEED IT IN DESCRIPTION FOR BUY AND OTHER BUTTONS
                        let isUserTheOwner;
                        isUserTheOwnerOfTheShoes(id)
                            .then(result => {
                                isUserTheOwner = result;
                                console.log(data);
                                this.partial('/templates/description.hbs', {
                                    'name': data.name, 'image': data.image, 'email': email, 'id': data.id,
                                    'description': data.description, 'price': data.price, 'isUserTheOwner': isUserTheOwner
                                });
                            });
                    });
            });
    });

    this.get('/buy/:id', function(context) {
        let userCart = JSON.parse(getLoggedUser()).uplodedShoesForSale;
        console.log(context);
    })

}); // main sammy brackets

(() => {
    app.run('/homePage');
})();

function getLoggedUser() {
    return window.localStorage['user']; // you should had it JSON.parse/d so it is easy to work with
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
    return email ? true : false;
}

function validatePassword(password) {
    return password.length > 6 ? true : false;
}

function getAllShoes() {
    return fetch(`${baseURL}.json`)  // return {key: {obj}} object entries
        .then(response => response.json());
}

async function getShoeByID(id) {
    return await fetch(`${baseURL}/${id}/.json`)
        .then(response => response.json());
}

async function isUserTheOwnerOfTheShoes(id) {
    let userID = JSON.parse(getLoggedUser()).uid;
    let owner;

    await getShoeByID(id)
        .then(data => {
            owner = data.owner;
        });
    return userID === owner ? true : false;
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
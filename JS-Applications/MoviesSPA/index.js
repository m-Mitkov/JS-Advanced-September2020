const auth = firebase.auth();
const baseUrl = 'https://movies-catalog-ab7f7.firebaseio.com/';

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    this.get('/homePage', function (context) {

        loadCommonPartials(context)
            .then(function () {
                this.partial('/templates/homePage.hbs', validateUser());
            });
    });

    this.get('/register', function (context) {

        loadCommonPartials(context)
            .then(function () {
                this.partial('/templates/registerForm.hbs');
            });
    });

    this.post('/register', function (context) {
        let { email, password, repeatPassword } = context.params;
        if (validateEmail(email) && validatePassword(password, repeatPassword)) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(x => {
                    console.log('redirect');
                    this.redirect('/login');
                });
        };
    });

    this.get('/login', function (context) {

        loadCommonPartials(context)
            .then(function () {
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
            });
    });

    this.get('/logout', function () {
        auth.signOut()
            .then(res => {
                localStorage.clear();
                this.redirect('/homePage');
            });
    });

    this.get('/catalogPage', async function (context) {
        let movies = await getAllMovies()
            .then(movie => {
                return movie;
            });
        context.movieArr = [];

        Object.entries(movies).forEach(x => {
            let id = x[0];
            let obj = {
                'id': id,
                ...x[1]
            };
            context.movieArr.push(obj);
        });
        loadCommonPartials(context)    //{ 'id': id, 'movie': context.movies }
            .then(function () {
                let {email, userIsLogedIn } = validateUser()
                this.partial('/templates/catalogPage.hbs', 
                {'movie': [...context.movieArr], 'email': email, 'userIsLogedIn': userIsLogedIn}); // validateUser() missing
            });
    });

    this.get('/addMovie', function (context) {

        loadCommonPartials(context)
            .then(function () {
                this.partial('/templates/addMovieForm.hbs', validateUser());
            });
    });

    this.post('/addMovie', function (context) {

        let movie = { ...context.params }

        fetch(baseUrl + '.json', {
            method: 'POST',
            body: JSON.stringify(movie)
        })
            .then(x => {
                this.redirect('/catalogPage');
            });
    });

});


(() => {
    app.run('/homePage')
})();

function loadCommonPartials(context) {
    return context.loadPartials({
        'header': 'templates/header.hbs',
        'footer': 'templates/footer.hbs'
    });
}

function validatePassword(param1, param2) {
    if (param1 !== param2) {
        // errorNotificationHandler('password shoud match each other');
        return false;
    } else {
        return true;
    }
}

function validateEmail(email) {
    console.log(email.length);
    if (email.length < 6) {
        // errorNotificationHandler('the email must be at leats 6 symbols long');
        return false;
    } else {
        return true;
    }
}

function errorNotificationHandler(msg) {
    let notificationForm = document.querySelector('#errorBox');

    notificationForm.innerHTML = msg;
    notificationForm.style.display = 'block';

    setTimeout(function () {
        notificationForm.style.display = 'none';
    }, 3000);
}

function successNotificationHandler(msg) {
    let notificationForm = document.getElementById('successBox');

    notificationForm.innerHTML = msg;
    notificationForm.style.display = 'block';

    setTimeout(function () {
        notificationForm.style.display = 'none';
    }, 3000);
}

function userIsLogedIn() {
    return localStorage.getItem('user') ? true : false;
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function validateUser() {
    let isUserLogedIn = userIsLogedIn();
    let emailLogedUser = getLoggedUser()?.email;

    return {
        'userIsLogedIn': isUserLogedIn,
        'email': emailLogedUser
    };
}

async function getAllMovies() {

    return await fetch(baseUrl + '.json', {
        method: 'GET'
    })
        .then(res => res.json());
    // .then(data => console.log(data));
}
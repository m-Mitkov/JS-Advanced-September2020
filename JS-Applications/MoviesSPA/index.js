const auth = firebase.auth();
const baseUrl = 'https://movies-catalog-ab7f7.firebaseio.com/';
const rootElement = document.getElementById('root');

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
                this.loadPartials({
                    'errorNotify': '/templates/notificationHandler/errorNotify.hbs',
                    'successNotify': '/templates/notificationHandler/successNotify.hbs',
                });
                this.partial('/templates/registerForm.hbs');
            });
    });

    this.post('/register', function (context) {
        let { email, password, repeatPassword } = context.params;

        if (validateEmail(email) && validatePassword(password, repeatPassword)) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(x => {
                    this.redirect('/login');
                });
        };
    });

    this.get('/login', function (context) {

        loadCommonPartials(context)
            .then(function () {
                this.loadPartials({
                    'errorNotify': '/templates/notificationHandler/errorNotify.hbs',
                    'successNotify': '/templates/notificationHandler/successNotify.hbs',
                });
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
    });

    this.get('/logout', function () {
        auth.signOut()
            .then(res => {
                localStorage.clear();
                this.redirect('/homePage');
            });
    });

    this.get('/catalogPage', async function (context) {
        let anyMovies;
        let movies = await getAllMovies()
            .then(movie => {
                return movie;
            });
        context.movieArr = [];

        if (movies !== null) {
            anyMovies = true;
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
                    this.partial('/templates/catalogPage.hbs',
                        { 'movie': [...context.movieArr], ...validateUser(), 'anyMovies': anyMovies });
                });
        } else {
            anyMovies = false;
            loadCommonPartials(context)    //{ 'id': id, 'movie': context.movies }
                .then(function () {
                    this.partial('/templates/catalogPage.hbs',
                        { ...validateUser(), 'anyMovies': anyMovies });
                });
        }

    });

    this.get('/addMovie', function (context) {

        loadCommonPartials(context)
            .then(function () {
                this.partial('/templates/addMovieForm.hbs', validateUser());
            });
    });

    this.post('/addMovie', function (context) {
        let userId = getLoggedUser().uid;
        let peopleWhoLikeIt = [];
        peopleWhoLikeIt.push(userId);
        let likes = peopleWhoLikeIt.length;

        let movie = { ...context.params, 'likes': likes, 'peopleWhoLikesIt': peopleWhoLikeIt, 'owner': userId }

        fetch(baseUrl + '.json', {
            method: 'POST',
            body: JSON.stringify(movie)
        })
            .then(x => {
                this.redirect('/catalogPage');
            });
    });

    this.get('/details/:id', async function (context) {
        let id = getIDbyPathName();
        let currentUserID = getLoggedUser().uid;
        let validateIsMovieMine = await isMovieMine(id);

        let movie;

        await getSingleMovie(id)
            .then(mov => {
                movie = { ...mov }
            });

        loadCommonPartials(context)
            .then(function () {
                let { peopleWhoLikesIt } = movie;
                let alredyLiked = Boolean(peopleWhoLikesIt.includes(currentUserID));

                this.partial('/templates/details.hbs', {
                    ...movie, ...validateUser(),
                    'likes': peopleWhoLikesIt.length, 'id': id, 'alredyLiked': alredyLiked,
                    'isMovieMine': validateIsMovieMine
                });
            });
    });

    this.get('/like/:id', function () {
        let id = getIDbyPathName();
        let currentUserID = getLoggedUser().uid;

        getSingleMovie(id)
            .then(res => {
                let peopleWhoLikesIt = res.peopleWhoLikesIt;
                let alredyLiked = Boolean(peopleWhoLikesIt.includes(currentUserID));

                if (!alredyLiked) {
                    peopleWhoLikesIt.push(currentUserID);

                    fetch(baseUrl + `${id}/` + '.json', {
                        method: 'PATCH',
                        body: JSON.stringify({ 'peopleWhoLikesIt': peopleWhoLikesIt })
                    });
                    this.redirect(`details/${id}`); // how do i refresh info in the page after a like btn is clicked???
                };
            });
    });

    this.get('/delete/:id', async function () {
        let id = getIDbyPathName();

        await deleteMovie(id);
        this.redirect('/catalogPage');
    });

    this.get('/edit/:id', async function (context) {
        let id = getIDbyPathName();
        let movie;

        await getSingleMovie(id)
            .then(mov => {
                movie = { ...mov }
            });


        loadCommonPartials(context)
            .then(function () {

                this.partial('/templates/editForm.hbs', {
                    ...movie, 'id': id, ...validateUser(),
                });
            });
    });

    this.put('/edit/:id', function (context) {
        const id = getIDbyPathName();
        let updateParams = { ...context.params };

        editMovie(updateParams, id)
            .then(x => {
                this.redirect('/catalogPage');
            });
    });

    this.get('/search', async function (context) {
        const searchedMovieTitle = context.params.searchedMovie;
        let movieFound;

        await getAllMovies()
            .then(data => {
                Object.entries(data).forEach(key => {

                    if (key[1].title == searchedMovieTitle) {
                        movieFound = key[0];
                        return;
                    };
                });
            });

        this.redirect(`/details/${movieFound}`)
    })
    //TODO: edit btn + searchBar + notificationHandlers
});


function loadCommonPartials(context) {
    return context.loadPartials({
        'header': 'templates/header.hbs',
        'footer': 'templates/footer.hbs'
    });
}

function userIsLogedIn() {
    return localStorage.getItem('user') ? true : false;
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function getIDbyPathName() {
    return window.location.pathname.split('/').pop();
}

(() => {
    app.run('/homePage')
})();
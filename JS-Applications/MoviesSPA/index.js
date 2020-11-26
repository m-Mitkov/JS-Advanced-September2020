const auth = firebase.auth();
const baseUrl = 'https://movies-catalog-ab7f7.firebaseio.com/';
const errorNotify = document.getElementById('errorBox');
const successNotify = document.getElementById('successBox');

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
                this.partial('/templates/catalogPage.hbs',
                    { 'movie': [...context.movieArr], ...validateUser()}); 
            });
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

        let movie = { ...context.params, 'likes': likes, 'peopleWhoLikesIt': peopleWhoLikeIt}

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
        let movie;

        await getSingleMovie(id)
            .then(mov => {
                movie = {...mov}
            });

            loadCommonPartials(context)
            .then(function() {
              let {peopleWhoLikesIt} = movie;
                let alredyLiked =  Boolean(peopleWhoLikesIt.includes(currentUserID));
                console.log(alredyLiked);
            
                this.partial('/templates/details.hbs', {...movie, ...validateUser(), 
                            'likes': peopleWhoLikesIt.length, 'id': id, 'alredyLiked': alredyLiked});
            });
    });

    this.get('/like/:id', function(){
        let id = getIDbyPathName();
        console.log(id);
        let currentUserID = getLoggedUser().uid;

        getSingleMovie(id)
        .then(res => {
            let peopleWhoLikesIt = res.peopleWhoLikesIt;
            let alredyLiked = Boolean(peopleWhoLikesIt.includes(currentUserID));

            if (!alredyLiked) {
                console.log('in');
                peopleWhoLikesIt.push(currentUserID);

                fetch(baseUrl + `${id}/` + '.json', {
                    method: 'PATCH',
                    body: JSON.stringify({'peopleWhoLikesIt': peopleWhoLikesIt})
                });
            };
            console.log(res.peopleWhoLikesIt);
        })
    })
    //like PATCH request add prop arr peopleWHoLikeIt, likes++
});


function loadCommonPartials(context) {
    return context.loadPartials({
        'header': 'templates/header.hbs',
        'footer': 'templates/footer.hbs'
    });
}

function errorNotificationHandler(msg) {
    errorNotify.innerHTML = msg;
    console.log(errorNotify.innerHTML);
    errorNotify.style.display = 'block';

    setTimeout(function () {
        errorNotify.style.display = 'none';
    }, 3000);
}

function successNotificationHandler(msg) {
    console.log(successNotify);

    successNotify.innerHTML = msg;
    successNotify.style.display = 'block';

    setTimeout(function () {
        successNotify.style.display = 'none';
    }, 3000);
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
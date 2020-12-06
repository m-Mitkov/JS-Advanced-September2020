const auth = firebase.auth();

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    this.get('/homePage', async function (context) {
        let userId = isUserLogedIn() ? getLogedUser().uid : null;

        let destinations = await getMyDestinations(userId);
        let hasDestinations = Object.keys(destinations).length > 0 ? true : false;

        loadCommonPArtials(context)
            .then(function () {
                if (isUserLogedIn()) {

                    this.partial('../templates/homePage.hbs',
                        {
                            'isUserLogedin': isUserLogedIn, 'email': getLogedUser().email,
                            'hasDestinations': hasDestinations, 'destination': { ...destinations }
                        });
                } else {
                    this.partial('../templates/homePage.hbs',
                        { 'isUserLogedin': isUserLogedIn, 'email': '' });
                }
            });

    });

    this.get('/register', function (context) {

        loadCommonPArtials(context)
            .then(function () {
                this.loadPartials({
                    'errorNotify': '../templates/notifications/errorNotify.hbs',
                    'successNotify': '../templates/notifications/successNotify.hbs',
                });

                this.partial('/templates/registerForm.hbs');
            });
    });

    this.post('/register', function (context) {
        let { email, password, rePassword } = context.params;

        if (validatePasswordsAreEqual(password, rePassword) && validateEmail(email)) {

            auth.createUserWithEmailAndPassword(email, password)
                .then(x => {
                    let { email, uid } = x.user;

                    window.localStorage.setItem('user', JSON.stringify({ 'email': email, 'uid': uid }));
                    successNotificationHandler('Successfull registration!')
                    this.redirect('/homePage');
                })
                .catch(err => {
                    errorNotificationHandler('Invalid username or password');
                });
        }
    });

    this.get('/login', function (context) {
        loadCommonPArtials(context)
            .then(function () {
                this.loadPartials({
                    'errorNotify': '../templates/notifications/errorNotify.hbs',
                    'successNotify': '../templates/notifications/successNotify.hbs',
                });
                this.partial('/templates/loginForm.hbs');
            });
    });

    this.post('/login', function (context) {
        let { email, password } = context.params;

        if (validatePasswordOnLogin(password) && validateEmail(email)) {

            auth.signInWithEmailAndPassword(email, password)
                .then(res => {
                    let { email, uid } = res.user;

                    window.localStorage.setItem('user', JSON.stringify({ 'email': email, 'uid': uid }));
                    this.redirect('/homePage');
                    successNotificationHandler('Login successful.');
                })
                .catch(err => {
                    errorNotificationHandler(err);
                });
        }

    });

    this.get('/logout', function () {

        auth.signOut()
            .then(() => {
                window.localStorage.removeItem('user');
                this.loadPartials({
                    'errorNotify': '../templates/notifications/errorNotify.hbs',
                    'successNotify': '../templates/notifications/successNotify.hbs',
                });

                successNotificationHandler('Logout successful.');
                this.redirect('/homePage');
            });
    });

    this.get('/createDestination', function (context) {
        let isUserLogedin = isUserLogedIn();

        loadCommonPArtials(context)
            .then(function () {
                this.loadPartials({
                    'errorNotify': '../templates/notifications/errorNotify.hbs',
                    'successNotify': '../templates/notifications/successNotify.hbs',
                });

                this.partial('../templates/createDestination.hbs', { 'isUserLogedin': isUserLogedin, 'email': getLogedUser().email });
            });
    });

    this.post('/createDestination', function (context) {
        let userID = getLogedUser().uid;
        // let validatePArams = validateParams(context.params);
        // if (validatePArams) {

        // }
        let event = {
            ...context.params,
            'owner': userID,
        };

        sendDestinationToDB(event)
            .then(x => {
                successNotificationHandler('Destination successfully created.')
                this.redirect('/homePage');
            })
            .catch(err => {
                errorNotificationHandler('Something went wrong, please try again');
            });
    });

    this.get('/details/:id', async function (context) {
        let id = getIDfromURL();

        let blog = await getSingleDestination(id)
            .then(e => {
                return e;
            });

        loadCommonPArtials(context)
            .then(function () {
                this.partial('../templates/details.hbs',
                    {
                        'isUserLogedin': isUserLogedIn(), 'email': getLogedUser().email, ...blog, 'id': id,
                    });
            });
    });

    this.get('/edit/:id', async function (context) {
        let id = getIDfromURL();
        let email = getLogedUser().email;

        let blog = await getSingleDestination(id)
            .then(x => { return x; });

        loadCommonPArtials(context)
            .then(function () {
                this.loadPartials({
                    'errorNotify': '../templates/notifications/errorNotify.hbs',
                    'successNotify': '../templates/notifications/successNotify.hbs',
                });

                this.partial('/templates/editForm.hbs', { 'isUserLogedin': isUserLogedIn(), 'email': email, ...blog, 'id': id });
            });
    });

    this.put('/edit/:id', function (context) {
        let id = getIDfromURL();

        editDestination({ ...context.params }, id)
            .then(x => {
                successNotificationHandler('Destination successfully edited! ')
                this.redirect('/homePage');
            })
            .catch(err => {
                errorNotificationHandler('Something went wrong, please try again');
            });
    });

    this.get('/destinations', async function (context) {
        let userId = isUserLogedIn() ? getLogedUser().uid : null;

        let destinations = await getMyDestinations(userId);

        loadCommonPArtials(context)
            .then(function () {
                this.loadPartials({
                    'errorNotify': '../templates/notifications/errorNotify.hbs',
                    'successNotify': '../templates/notifications/successNotify.hbs',
                });

                this.partial('../templates/detailsDashboard.hbs',
                    {
                        'isUserLogedin': isUserLogedIn, 'email': getLogedUser().email,
                        'destination': { ...destinations }
                    });
            });
    });
    
    this.get('/delete/:id', async function () {
        let id = getIDfromURL();

        await deleteDestination(id)
            .then(x => {
                successNotificationHandler('Movie successfully deleted');
                this.redirect('/destinations');
            })
            .catch(err => {
                errorNotificationHandler('Successfully deleted');
            });
    });

});

function getLogedUser() {
    return JSON.parse(window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')) : null;
}

function getIDfromURL() {
    return window.location.pathname.split('/').pop();
}

function isUserLogedIn() {
    return getLogedUser() ? true : false;
}

function loadCommonPArtials(context) {
    return context.loadPartials({
        'header': '../templates/header.hbs',
        'footer': '../templates/footer.hbs'
    });
}


(() => {
    app.run('/homePage');
})();
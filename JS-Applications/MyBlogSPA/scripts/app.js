const auth = firebase.auth();

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    this.get('/homePage', async function (context) {
        let userId = isUserLogedIn() ? getLogedUser().uid : null;
        let blogs = await getMyBlogs(userId);
   
        let hasBlogs = Object.keys(blogs).length > 0 ? true : false;

        loadCommonPArtials(context)
            .then(function () {
                if (isUserLogedIn() && hasBlogs) {

                    this.loadPartials({
                        'createBlogForm': '../templates/createBlogForm.hbs',
                        'post': '../templates/post.hbs'
                    });

                    this.partial('../templates/homePage.hbs', {
                        'isUserLogedIn': isUserLogedIn(), 'email': getLogedUser().email,
                        'hasBlogs': hasBlogs, 'post': { ...blogs }, 
                    });

                } else {
                    this.partial('../templates/homePage.hbs', {
                        'isUserLogedIn': isUserLogedIn(), 'email': ''
                    });
                }
            });
    });

    this.get('/login', function (context) {
        loadCommonPArtials(context)
            .then(function () {

                this.partial('/templates/loginForm.hbs');
            });
    });

    this.post('/login', function (context) {
        let { email, password } = context.params;

        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                let { email, uid, refreshToken } = res.user;

                window.localStorage.setItem('user', JSON.stringify({ 'email': email, 'uid': uid, 'refreshToken': refreshToken }));
                this.redirect('/homePage');
                // successNotificationHandler('Successfully loged in');
            });
    });

    this.get('/register', function (context) {

        loadCommonPArtials(context)
            .then(function () {
                // this.loadPartials({
                //     'errorNotify': '/templates/notifications/errorNotify.hbs',
                //     'successNotify': '/templates/notifications/successNotify.hbs',
                // });

                this.partial('/templates/registerForm.hbs');
            });
    });

    this.post('/register', function (context) {
        let { email, password, rePassword } = context.params;

        if (validatePasswordsAreEqual(password, rePassword) && validateEmail(email)) {

            auth.createUserWithEmailAndPassword(email, password)
                .then(x => {
                    // successNotificationHandler('Successfull registration!')
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

    this.post('/createPost', function (context) {
        let userID = getLogedUser().uid;
        let refreshToken = getLogedUser().refreshToken;


        let event = {
            ...context.params,
            'owner': userID,
            'refreshToken': refreshToken
        };

        sendEventToDB(event)
            .then(x => {
                this.redirect('/homePage');
            });
    });

    this.get('/details/:id', async function (context) {
        let id = getIDfromURL();

        let blog = await getSingleBlog(id)
            .then(e => {
                return e;
            });
        // let validateOwnerBlog = await isBlogtMine(id);

        loadCommonPArtials(context)
            .then(function () {
                this.partial('../templates/details.hbs',
                    {
                        'isUserLogedIn': isUserLogedIn(), 'email': getLogedUser().email, ...blog, 'id': id,
                    });
            });
    });

    this.get('/edit/:id', async function (context) {
        let id = getIDfromURL();
        let email = getLogedUser().email;

        let blog = await getSingleBlog(id)
            .then(x => { return x; });

        loadCommonPArtials(context)
            .then(function () {
                // this.loadPartials({
                //     // 'errorNotify': '/templates/notifications/errorNotify.hbs',
                //     // 'successNotify': '/templates/notifications/successNotify.hbs',
                // })
                this.partial('/templates/editForm.hbs', { 'isUserLogedIn': isUserLogedIn(), 'emailUser': email, ...blog, 'id': id });
            });
    });

    this.put('/edit/:id', function (context) {
        let id = getIDfromURL();

        editBlog({ ...context.params }, id)
            .then(x => {
                // successNotificationHandler('Event successfully edited! ')
                this.redirect('homePage');
            })
            .catch(err => {
                // errorNotificationHandler(err);
            })
    });

    this.get('/delete/:id', async function () {
        let id = getIDfromURL();

        await deleteBlog(id)
            .then(x => {
                // successNotificationHandler('Movie successfully deleted');
                this.redirect('/homePage');
            })
            .catch(err => {
                // errorNotificationHandler(err);
            });
    });

});


function getLogedUser() {
    return JSON.parse(window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')) : null;
}

function loadCommonPArtials(context) {
    return context.loadPartials({
        'header': 'templates/header.hbs',
    });
}

function getIDfromURL() {
    return window.location.pathname.split('/').pop();
}

function isUserLogedIn() {
    return getLogedUser() ? true : false;
}

(() => {
    app.run('/homePage');
})();
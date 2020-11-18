const auth = firebase.auth();

const router = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');
    // this.use('Handlebars', 'hbs');  // let Sammy know how to use the .hbs extensions files


    // all the partials inside hbs => diff 'variables' and i can get each of them 
    // with context.loginForm (EX) it will give me the loginForm from loginPage (context is a random
    // variable the name can be whatever i want )

    this.get('/home', function (context) {
       
        let currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const { uid, email } = JSON.parse(currentUser);
            context.loggedIn = true;
            context.email = email;
        }

        loadPartials(context)
            .then(function () {
                this.partial('./templates/home/home.hbs');
            })
            .catch(e => console.log(e));
    });

    this.get('/login', function () {

        let currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const { uid, email } = JSON.parse(currentUser);
            context.loggedIn = true;
            context.email = email;
        }

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'loginForm': './templates/login/loginForm.hbs',
        })
            .then(function () {
                this.partial('./templates/login/loginPage.hbs');
            })
            .catch(e => console.log(e));


    });

    this.get('/register', function (context) {

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'registerForm': './templates/register/registerForm.hbs',
        })
            .then(function () {
                this.partial('./templates/register/registerPage.hbs');
            })
            .catch(e => console.log(e));
    })

    this.get('/about', function () {

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
        })
            .then(function () {
                this.partial('./templates/about/about.hbs');
            })
            .catch(e => console.log(e));
    });

    this.post('/register', function (context) {
        let { username, password, repeatPassword } = context.params // context is an obj with many properties one of which is 'params'

        if (password !== repeatPassword) {
            return; // add error handler 
        }

        auth.createUserWithEmailAndPassword(username, password)
            .then(user => {
                this.redirect('/login');
            })
            .catch(e => console.log(e));
    });

    this.post('/login', function (context) {
        let { username, password } = context.params;

        try {
            auth.signInWithEmailAndPassword(username, password)
                .then(currentUser => {
                    let {email, uid} = currentUser.user;
                   localStorage.setItem('currentUser', JSON.stringify({email, uid}));
                   this.redirect('/home');
                });
        } catch (e) {
            console.log(e)
        }
    })
});

(() => {
    router.run('/home');
})();

function loadPartials(context) {
    return context.loadPartials({ // context
        'header': './templates/common/header.hbs',
        'footer': './templates/common/footer.hbs'
    });
};
const auth = firebase.auth();
const baseURLforTeams = `https://team-manager-ab0f5.firebaseio.com/`;
//var database = firebase.database();

const router = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');
    // this.use('Handlebars', 'hbs');  // let Sammy know how to use the .hbs extensions files

    // all the partials inside hbs => diff 'variables' and i can get each of them
    // with context.loginForm (EX) it will give me the loginForm from loginPage (context is a random
    // variable the name can be whatever i want )

    this.get('/home', function (context) {
        verifyUser(context);
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
        })
            .then(function () {
                this.partial('./templates/home/home.hbs');
            })
           .catch(e => errorHandler(e));
    });

    this.get('/login', function (context) {
        verifyUser(context);

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'loginForm': './templates/login/loginForm.hbs',
        })
            .then(function () {
                this.partial('./templates/login/loginPage.hbs');
            })
            .catch(e => errorHandler(e));


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
            .catch(e => errorHandler(e));
    })

    this.get('/about', function (context) {
        verifyUser(context);

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
        })
            .then(function () {
                this.partial('./templates/about/about.hbs');
            })
            .catch(e => errorHandler(e));
    });

    this.post('/register', function (context) {

        context.hasNoTeam = true;
        let { username, password, repeatPassword } = context.params // context is an obj with many properties one of which is 'params'

        if (password !== repeatPassword) {
            return; // add error handler
        }

        auth.createUserWithEmailAndPassword(username, password)
            .then(user => {
                this.redirect('/login');
            })
            .catch(e => errorHandler(e));
    });

    this.post('/login', function (context) {
        let { email, password } = context.params;

        try {
            auth.signInWithEmailAndPassword(email, password)
                .then(currentUser => {
                    let { email, uid } = currentUser.user;
                    localStorage.setItem('currentUser', JSON.stringify({ email, uid }));
                    this.redirect('/home');
                });
        } catch (e) {
            console.log(e)
        };
    });

    this.get('/logout', function (context) {
        auth.signOut()
            .then(res => {
                console.log(res);
                localStorage.removeItem('currentUser');
                this.redirect('/home');
            })
            .catch(e => console.log(e));
    });

    this.get('/catalog', function (context) {
        console.log(context.hasNoTeam);
        verifyUser(context);
       let teams = [];
        getAllTeams()
       .then(x => teams.push(x));
        /// register partial teams for each team to show in catalog
       console.log(teams);

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'team': './templates/catalog/team.hbs',
        })
            .then(function () {
                this.partial('./templates/catalog/teamCatalog.hbs');
            })
            .catch(e => errorHandler(e));
    });

    this.get('/create-team', function(context) {

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'createForm': './templates/create/createForm.hbs',
        })
            .then(function () {
                this.partial('./templates/create/createPage.hbs');
            })
            .catch(e => errorHandler(e));
    });

    this.post('/create-team', function(context) {
        let {name, comment} = context.params;
        console.log(JSON.parse(localStorage.getItem('currentUser')).uid);
        const team = {
            name,
            comment,
            'creator': JSON.parse(localStorage.getItem('currentUser')).uid,
            'members': [],
        };

        fetch(baseURLforTeams + '.json', {
            method: 'POST',
            body: JSON.stringify(team),
        })
        .then(this.redirect('/catalog'));
    });

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

async function verifyUser(context) {
    let currentUser = await localStorage.getItem('currentUser');

    if (currentUser) {
        const { email, uid } = JSON.parse(currentUser);
        context.loggedIn = true;
        context.email = email;
    }
}

function getAllTeams(){
    //let teams = [];
    return fetch(baseURLforTeams + '.json', {
        method: 'GET',
    })
    .then(res => res.json())
    .catch(e => errorHandler(e));
}

function errorHandler(e){
    return console.log(e);
}
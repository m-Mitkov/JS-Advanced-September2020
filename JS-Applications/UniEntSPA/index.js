const auth = firebase.auth();

let app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs')

    this.get('/homePage', async function (context) {
        let events = await getAllEvents();
        context.events = [];
        Object.entries(events).forEach(x => {
            let id = x[0];
            let obj = {
                'id': id,
                ...x[1]
            };
            context.events.push(obj);
        });

        let hasEvents = Object.keys(events).length > 0 ? true : false;

        loadCommonPArtials(context)
            .then(function () {
                if (isUserLogedIn() && hasEvents) {
                    
                    this.partial('/templates/homePage.hbs',
                        { 'isUserLogedIn': isUserLogedIn(), 'emailUser': getLogedUser().email, 'hasEvents': hasEvents, 
                        'event': { ...context.events }});

                } else {
                    this.loadPartials({
                        'notFoundForm': '/templates/notFoundError.hbs'
                    });
                    this.partial('/templates/homePage.hbs', { 'isUserLogedIn': isUserLogedIn(), 'emailUser': '' });
                }
            });
    });

    this.get('/login', function (context) {
        loadCommonPArtials(context)
            .then(function () {
                this.loadPartials({
                    'errorNotify': '/templates/notifications/errorNotify.hbs',
                    'successNotify': '/templates/notifications/successNotify.hbs',
                })
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
    })

    this.get('/register', function (context) {

        loadCommonPArtials(context)
            .then(function () {
                this.loadPartials({
                    'errorNotify': '/templates/notifications/errorNotify.hbs',
                    'successNotify': '/templates/notifications/successNotify.hbs',
                });

                this.partial('/templates/registerForm.hbs');
            });
    });

    this.post('/register', function (context) {
        let { email, password, rePassword } = context.params;

        if (validatePasswordsAreEqual(password, rePassword) && validateEmail(email)) {

            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    successNotificationHandler('Successfull registration!')
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

    this.get('/organizeEvent', function (context) {

        loadCommonPArtials(context)
            .then(function () {
                this.partial('/templates/organizeEventForm.hbs', { 'isUserLogedIn': isUserLogedIn(), 'emailUser': getLogedUser().email });
            });
    });

    this.post('/organizeEvent', function (context) {
        let owner = getLogedUser().uid;
        let organizer = getLogedUser().email;

        let event = {
            ...context.params,
            'owner': owner,
            'partecipants': [owner],
            'organizer': organizer,
        };

        sendEventToDB(event)
            .then(x => {
                this.redirect('/homePage');
            });
    });

    this.get('/details/:id', async function (context) {
       let id = getIDfromURL();

      let event = await getSingleEvent(id)
       .then(e => {
        return e;
       });
     
        loadCommonPArtials(context)
            .then(function () {
                this.partial('/templates/details.hbs', 
                { 'isUserLogedIn': isUserLogedIn(), 'emailUser': getLogedUser().email, ...event, 'id': id, 'isEventMIne': isEventMine(id) });
            });
    });

    this.get('/edit/:id', async function(context) {
        let id = getIDfromURL();
        let email = getLogedUser().email;

        let event = await getSingleEvent(id)
        .then(x => {return x;});
        
        loadCommonPArtials(context)
        .then(function () {
            this.loadPartials({
                'errorNotify': '/templates/notifications/errorNotify.hbs',
                'successNotify': '/templates/notifications/successNotify.hbs',
            })
            this.partial('/templates/editEventForm.hbs', {'isUserLogedIn': isUserLogedIn(), 'emailUser': email, ...event, 'id': id});
        });
    });

    this.put('/edit/:id',  function(context) {
        let id = getIDfromURL();

         editEvent({...context.params}, id)
        .then(x => {
            successNotificationHandler('Event successfully edited! ')
            this.redirect('/homePage');
        })
        .catch(err => {
            errorNotificationHandler(err);
        })
    });

    this.get('/delete/:id', async function(){
        let id = getIDfromURL();

        await deleteEvent(id)
        .then(x => {
            successNotificationHandler('Movie successfully deleted');
            this.redirect('/homePage');
        })
        .catch(err => {
            errorNotificationHandler(err);
        });
    });

});

function getLogedUser() {
    return JSON.parse(window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')) : null;
}

function loadCommonPArtials(context) {
    return context.loadPartials({
        'header': 'templates/header.hbs',
        'footer': 'templates/footer.hbs',
    });
}

function getIDfromURL(){
    return window.location.pathname.split('/').pop();
}

function isUserLogedIn() {
    return getLogedUser() ? true : false;
}

(() => {
    app.run('/homePage');
})();
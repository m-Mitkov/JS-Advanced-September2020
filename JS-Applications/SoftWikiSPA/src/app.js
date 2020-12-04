const auth = firebase.auth();

const app = new Sammy('#root', function() {
    this.use('Handlebars', 'hbs');

    this.get('/homePage', function(context) {

        loadCommonPartials(context)
        .then(function() {
            this.partial('../templates/homePage.hbs');
        });
    });

    this.get('/register', function(context) {

        loadCommonPartials(context)
        .then(function() {
            this.partial('../templates/registerForm.hbs');
        });
    });

    this.post('/register', function() {
        let {email, password, rePassword} = context.params;

        if (emailValidator(email) && validatePasswordsAreEqual(password, rePassword)) {
            
            auth.createUserWithEmailAndPassword(email, password)
                .then(x => {
                    // successNotificationHandler('Successfull registration!')
                    this.redirect('/login');
                });
        }
    });

}); // main Sammy brackets

function loadCommonPartials(context) {
    
    return context.loadPartials({
        'header': '../templates/header.hbs',
        'footer': '../templates/footer.hbs'
    });
}

(() => {
    app.run('/homePage');
})();
    
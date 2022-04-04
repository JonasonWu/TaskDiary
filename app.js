require('./db');

const express = require('express');
const path = require('path');

//Get the components that follow '/main'
const main = require('./routes/main');

//Initialize express app
const app = express();

//View engine setup
//Set the path to grab templates from
app.set('views', path.join(__dirname, 'views'));
//Set the notice that the templates are hbs formats
app.set('view engine', 'hbs');

//Enable sessions
const session = require('express-session');
const sessionOptions = {
    //TODO: storing the secret somewhere else
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

//Allow post requests
app.use(express.urlencoded({ extended: false }));

//Allow automatic searching of files/folders inside the public folder
app.use(express.static(path.join(__dirname, 'public')));

//Get the pages that connects to '/main'
app.use('/main', main);

//This is default. Just to test whether stuff works
app.get('/', (req, res) => {
    //This is temporary. The correct redirect should be the login page.
    res.redirect('/main');

    //TODO: This should be the correct redirect
    //res.redirect('/login');
});

//Change it so that we either have a environment port value, or just use the default.
app.listen(process.env.PORT || 3000);

require('./db');
require('./auth');

const express = require('express');
const path = require('path');
const passport = require('passport');

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
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

//Allow post requests
app.use(express.urlencoded({ extended: false }));

//Allow automatic searching of files/folders inside the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
    res.locals.user = req.user;
    next(); 
});

//Get the routes for login/authentication stuff
const auth = require('./routes/index');
//Get the components that follow '/main'
const main = require('./routes/main');

//Include the login pages.
app.use('/', auth);
//Get the pages that connects to '/main'
app.use('/main', main);

//Change it so that we either have a environment port value, or just use the default.
app.listen(process.env.PORT || 3000);

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
    resave: true,
    saveUninitialized: true
};
//Set the secret value for sessionOptions
if (process.env.NODE_ENV === 'PRODUCTION') {
	// if we're in PRODUCTION mode, then read the configration from a file
	// use blocking file io to do this...
	const fs = require('fs');
	const path = require('path');
	const fn = path.join(__dirname, 'config.json');
	const data = fs.readFileSync(fn);

	// our configuration file will be in json, so parse it and set the
	// conenction string appropriately!
	const conf = JSON.parse(data);
	sessionOptions.secret = conf.secret;
} else {
	// if we're not in PRODUCTION mode, then use random string
	sessionOptions.secret = "secret string";
}
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

//For all pages that do not exist, throw a 404 error.
app.get('/*', (req, res) => {
    res.status(404).send("404. Page does not exist.");
});

//Change it so that we either have a environment port value, or just use the default.
app.listen(process.env.PORT || 3000);

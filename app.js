require('./db');
require('./auth');

const express = require('express');
const path = require('path');
const passport = require('passport');
//const mongoose = require('mongoose');
//const User = mongoose.model('User');

//Get the routes for login/authentication stuff
const routes = require('./routes/index');
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

app.use(passport.initialize());
app.use(passport.session());

//Allow post requests
app.use(express.urlencoded({ extended: false }));

//Allow automatic searching of files/folders inside the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
    res.locals.user = req.user;
    //Get identifying reference number of current tasks
    // const userData = await User.find({username: res.locals.user}).exec();
    // res.locals.id = userData._id;
    // //Get identifying number for current tasks
    // res.locals.curTaskNum = userData.CurrentTasks;
    // //Get identifying number for completed tasks
    // res.locals.comTaskNum = userData.CurrentTasks;
    // //Get identifying number for diary number
    // res.locals.diaryNum = userData.Diary;
    next(); 
});

//Include the login pages.
app.use('/', routes);
//Get the pages that connects to '/main'
app.use('/main', main);


//Change it so that we either have a environment port value, or just use the default.
app.listen(process.env.PORT || 3000);

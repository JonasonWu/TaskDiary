const express = require('express'), 
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
//const argon = require('argon2');

router.use((req, res, next) => {
  const url = req.url;
  if (url === "/") {
    res.locals.title = "Home";
  }
  else {
    res.locals.title = url.charAt(1).toUpperCase() + url.substring(2);
  }
  next();
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const {username, password} = req.body;
  const newUser = new User({
    username, 
    CurrentTasks: [],
    CompletedTasks: [],
    Diary: []
  });
  User.register(newUser, password, (err) => {//(err, user) => {
    if (err) {
      res.render('register', {message: 'Username already taken or invalid password.'});
    } else {
      //If account is created, switch to login menu.
      res.redirect('/login');
      // //This is directly registering and logging in at the same time.
      // passport.authenticate('local')(req, res, function() {
      //   res.redirect('/main');
      // });
    }
  });   
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if(user) {
      req.logIn(user, (err) => {
        if (err) {
          console.log("Unexpected error appeared when logging in.");
        }
        res.redirect('/main');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});

module.exports = router;

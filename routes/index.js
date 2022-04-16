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
      //If account is created, ask to log in again.
      res.redirect('/login');
      // passport.authenticate('local')(req, res, function() {
      //   res.redirect('/main');
      // });
    }
  });   
});

router.post('/login', (req, res, next) => {
  // console.log('Doing post');
  passport.authenticate('local', (err, user) => {
    // console.log('authenticated');
    if(user) {
      // console.log('user exists');
      req.logIn(user, () => {//(err) => {
        // console.log(err);
        // if (err) {
        //   res.render('login', {message: 'Unexpected error. Try again later.'});
        // }
        res.redirect('/main');
      });
    } else {
      // console.log("ERROR message");
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});

module.exports = router;

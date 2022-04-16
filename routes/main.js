const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const CurrentTasks = mongoose.model('CurrentTask');

const current = require('./main-current.js');
const complete = require('./main-completed.js');
const diary = require('./main-diary.js');
router.use('/current', current);
router.use('/completed', complete);
router.use('/diary', diary);

router.use((req, res, next) => {
    res.locals.title = "Main";
    next();
});

router.get('/', (req, res) => {
    res.render('main');
    
    //This is incorrect redirect, but for the purpose of completing milestone 2, leave it.
    //res.redirect('/main/current');
});

module.exports = router;

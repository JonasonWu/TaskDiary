//This file contains routers for: /main

const express = require('express');
const router = express.Router();

//Add the routers for the other urls.
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
});

module.exports = router;

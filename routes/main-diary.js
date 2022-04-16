

const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

router.use((req, res, next) => {
    res.locals.title = "Diary";
    next();
});

router.get('/', (req, res) => {
    res.render('diary');
});

module.exports = router;
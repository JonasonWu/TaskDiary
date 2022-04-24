//The file contains routers for: /main/completed

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CompletedTasks = mongoose.model('CompletedTask');

router.use((req, res, next) => {
    res.locals.title = "Completed Tasks";
    next();
});

router.get('/', (req, res) => {
    CompletedTasks.find({userid: res.locals.user}, function(err, data) {
        if (err) {
            //There is likely an error with the Database.
            console.error('ERROR:', err);
            res.status(500).send("Internal Server Error.");
        }
        else {
            //Else, input the parameters into useParams for rendering
            const useParams = {};
            if (data.length === 0) {
                useParams.noData = true;
            }
            else {
                useParams.data = data;
            }
            res.render('main-completed', useParams);
        }
    });
});

router.post('/', async (req, res) => {
    //This post request is for deleting all the completed tasks permanently
    if (req.body.delete === "true") {
        await CompletedTasks.deleteMany({userid: res.locals.user}).exec();
    }
    res.redirect('/main/completed');
});


module.exports = router;

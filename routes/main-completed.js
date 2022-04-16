
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const CurrentTasks = mongoose.model('CurrentTask');
const CompletedTasks = mongoose.model('CompletedTask');

///main/completed
router.get('/', (req, res) => {
    CompletedTasks.find({userid: res.locals.user}, function(err, data, count) {
        if (err) {
            //res.redirect('/login');
            console.error('ERROR:', err);
            res.status(500).send("Internal Server Error");
        }
        else {
            console.log(data);
            console.log(count);
            console.log();
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
    if (req.body.delete === "true") {
        await CompletedTasks.deleteMany({userid: res.locals.user}).exec();
    }
    res.redirect('/main/completed');
});


module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CurrentTasks = mongoose.model('CurrentTask');

//This is for "/main/current"
router.get('/', async (req, res) => {
    //May input {user: number} later on to get specific tasks relating to the user
    CurrentTasks.find({}, function(err, data, count) {
        if (err) {
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
            res.render('main-current', useParams);
        }
    });
});

//This is for '/main/current/newTask'
router.post('/newTask', async (req, res) => {
    let details = [req.body.detail1, req.body.detail2, req.body.detail3,
    req.body.detail4, req.body.detail5];
    details = details.filter((e) => e !== "");

    if (req.body.title === "") {
        req.body.title = "Task";
    }
    const newTask = new CurrentTasks({
        //TODO: fix user declaration after allowing user login stuff
        user: 0, //Initialize all to 0, since user is not created yet.
        createdAt: new Date().toLocaleString(),
        title: req.body.title,
        taskDetails: details,
        estimatedCompletionTime: 0, //May not be needed (might want to delete from schema in the future)
        group: 0, //Not set at current stage, since no group form yet.
    });
    await newTask.save();
    //Redirect back to page at the end
    res.redirect('/main/current');
});

module.exports = router;

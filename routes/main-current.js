const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const CurrentTasks = mongoose.model('CurrentTask');
const CompletedTasks = mongoose.model('CompletedTask');

//This is for "/main/current"
router.get('/', async (req, res) => {
    // console.log('Trying to do this;');
    // console.log(res.locals.user);
    //console.log(res.locals.user.username);
    // const name = res.locals.user;
    // console.log("The name", name);
    // console.log(typeof name);
    // console.log("ENDED");
    
    //Get the collection of current tasks belonging to the user.
    CurrentTasks.find({userid: res.locals.user}, function(err, data, count) {
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
            res.render('main-current', useParams);
        }
    });
});

//This is the post for '/main/current/newTask'
router.post('/newTask', async (req, res) => {
    let details = [req.body.detail1, req.body.detail2, req.body.detail3,
    req.body.detail4, req.body.detail5];
    details = details.filter((e) => e !== "");
    if (req.body.title === "") {
        req.body.title = "Task";
    }
    // console.log("Trial");
    // const user = await User.findOne(res.locals.user).exec();
    // console.log(user);
    // const len = user.CurrentTasks.length;
    // //Add the reference number to the task array
    // await User.findOneAndUpdate(
    //     res.locals.user,
    //     {$push: {CurrentTasks: len}}
    //     ).exec();
    
    await (new CurrentTasks({
        userid: res.locals.user,
        user: 0, //Set user to the id of the user object.
        createdAt: new Date().toLocaleString(),
        title: req.body.title,
        taskDetails: details,
        estimatedCompletionTime: 0, //May not be needed (might want to delete from schema in the future)
        group: 0, //Not set at current stage, since no group form yet.
    })).save();

    //Redirect back to page at the end
    res.redirect('/main/current');
});


router.post('/moveOne', async(req, res) => {

    console.log("ENTERRD");
    const num = Number(req.body.num);
    const user = await User.find({username: res.locals.user}).exec();
    if (req.body.num === '' || user.CurrentTasks.length <= num) {
        //No tasks are removed. Just return to screen.
        //res.redirect('/main/current');
    }
    else {
        /*
        const comlen = user.CompletedTasks.length;
        await (new CompletedTasks({
            userid: res.locals.user,
            user: comlen,
            createdAt: data[num].createdAt,
            title: data[num].title,
            taskDetails: data[num].taskDetails,
            estimatedCompletionTime: data[num].estimatedCompletionTime,
            completedAt: new Date().toLocaleString(),
        })).save();
        CurrentTasks.deleteOne(data[num]);
        */
    }
    res.redirect('/main/current');

    
    // const data = req.body.data.split("{");
    // //Validate number and selection input
    // if (num === '' || data.length <= num) {
    //     res.redirect('/main/current');
    // }
    // //Get the id value for removing
    // const id = data[num].substring(data[num].indexOf("ObjectId(")+9, 
    //     data[num].indexOf(',')-1);
    // console.log("This is the id:", id);
    // const task = await CurrentTasks.find({"_id": id}).exec();
    // await (new CompletedTasks({
    //     user: data[num].user,
    //     createdAt: data[num].createdAt,
    //     title: data[num].title,
    //     taskDetails: data[num].taskDetails,
    //     estimatedCompletionTime: data[num].estimatedCompletionTime,
    //     completedAt: new Date().toLocaleString(),
    // })).save();
    // CurrentTasks.deleteOne(task);
    // res.redirect('/main/current');
    
});

router.post('/moveAll', async (req, res) => {
    //Move all tasks to the completed tasks section
    if (req.body.delete === "true") {
        const data = await CurrentTasks.find({userid: res.locals.user}).exec();
        for (const obj of data) {
            await (new CompletedTasks({
                userid: res.locals.user,
                user: obj.user,
                createdAt: obj.createdAt,
                title: obj.title,
                taskDetails: obj.taskDetails,
                estimatedCompletionTime: obj.estimatedCompletionTime,
                completedAt: new Date().toLocaleString(),
            })).save();
        }
        await CurrentTasks.deleteMany({userid: res.locals.user}).exec();
        console.log(data);
    }
    res.redirect('/main/current');
});

module.exports = router;

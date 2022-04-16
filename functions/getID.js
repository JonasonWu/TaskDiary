

const mongoose = require('mongoose');
const User = mongoose.model('User');

//Given username, either find the id number for current task, or create one 
//  and return it. Note: the username is expected to exist already.
async function findCurrentTaskNumber(username) {

    const user = await User.find({username}).exec();

    //Get identifying number of CurrentTasks for user
    let number = user.CurrentTasks;
    if (number === undefined) {
        number = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        let user = await User.find({CurrentTasks: number}).exec();
        //While user exists, we need another number
        while (user) {
            number = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            user = await User.find({CurrentTasks: number}).exec();
        }
        await User.findOneAndUpdate(
                {username: res.locals.user}, 
                {CurrentTasks: number}).exec();
            
    }

}



module.exports = {
    findCurrentTaskNumber,
    findCompletedTaskNumber,
    findDiaryNumber };
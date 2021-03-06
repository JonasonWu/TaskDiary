const mongoose = require('mongoose'),
	//URLSlugs = require('mongoose-url-slugs'),
	passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
	username: {type: String, required: true, minlength: 3},
    //password: {type: String, required: true}, //We will store the hash+salt together
	salt: String,
	hash: String,
	CurrentTasks: [Number], //Reference number to the current tasks
	//CurrentTasksGroupNames: [String],
	CompletedTasks: [Number], //Reference number to the completed tasks
	Diary: [Number] //Refernce number to the diary
});

const CurrentTask = new mongoose.Schema({
	userid: Object,
	user: Number, // a reference to a User object
	createdAt: String, //Time of creation of this object
	title: String, //The subject or focus of the task
	taskDetails: [String], //an array that stores details of the task (via bullet points).
	estimatedCompletionTime: Number, //The amount of time that it may take to finish the task 
	group: Number
});

const CompletedTask = new mongoose.Schema({
	userid: Object,
	user: Number, // a reference to a User object
	createdAt: String, //Time of creation of this object
	title: String, //The subject or focus of the task
	taskDetails: [String], //an array that stores details of the task (via bullet points).
	estimatedCompletionTime: Number, //The amount of time that it may take to finish the task 
	completedAt: String
});

const Diary = new mongoose.Schema({
	userid: Object,
	user: Number, // a reference to a User object.
	createdAt: String, //Time of creation of this object. 
	date: String, //The date the diary is for.
	title: String, //The subject or focus of the diary. (data + title will be the title of the diary page shown to the user)
	details: String, //The diary record for the day
	completedAt: String //Finish time of the task
});

User.plugin(passportLocalMongoose);

mongoose.model('User', User);
mongoose.model('CurrentTask', CurrentTask);
mongoose.model('CompletedTask', CompletedTask);
mongoose.model('Diary', Diary);


// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
	// if we're in PRODUCTION mode, then read the configration from a file
	// use blocking file io to do this...
	const fs = require('fs');
	const path = require('path');
	const fn = path.join(__dirname, 'config.json');
	const data = fs.readFileSync(fn);

	// our configuration file will be in json, so parse it and set the
	// conenction string appropriately!
	const conf = JSON.parse(data);
	dbconf = conf.dbconf;
} else {
	// if we're not in PRODUCTION mode, then use localhost db
	dbconf = 'mongodb://localhost/TaskDiary';
}

// OPTIONAL: modify the connection code below if
// using mongodb authentication
const mongooseOpts = {
	useNewUrlParser: true,  
	useUnifiedTopology: true
}; 

//This is for the connection for deployment
mongoose.connect(dbconf, mongooseOpts, (err) => {
  if (err) {
  console.log(err);
  } else {
    console.log('connected to database'); 
  }
});



//mongoose.connect('mongodb://localhost/TaskDiary');

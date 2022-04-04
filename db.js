// const mongoose = require('mongoose'),
// 	URLSlugs = require('mongoose-url-slugs'),
//   	passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');

const User = new mongoose.Schema({
	username: {type: String, required: true, minlength: 3},
    password: {type: String, required: true}, //We will store the hash+salt together
	CurrentTasks: [Number],
	CurrentTasksGroupNames: [String],
	CompletedTasks: [Number],
	Diary: [Number]
	// lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});

const CurrentTask = new mongoose.Schema({
	user: Number, // a reference to a User object
	createdAt: String, //Time of creation of this object
	title: String, //The subject or focus of the task
	taskDetails: [String], //an array that stores details of the task (via bullet points).
	estimatedCompletionTime: Number, //The amount of time that it may take to finish the task 
	group: Number
});


const CompletedTask = new mongoose.Schema({
	user: Number, // a reference to a User object
	createdAt: String, //Time of creation of this object
	title: String, //The subject or focus of the task
	taskDetails: [String], //an array that stores details of the task (via bullet points).
	estimatedCompletionTime: Number, //The amount of time that it may take to finish the task 
	completedAt: String
});

const Diary = new mongoose.Schema({
	user: Number, // a reference to a User object.
	createdAt: String, //Time of creation of this object. 
	date: String, //The date the diary is for.
	title: String, //The subject or focus of the diary. (data + title will be the title of the diary page shown to the user)
	details: String, //The diary record for the day
	completedAt: String //Finish time of the task
});

// const Item = new mongoose.Schema({
// 	name: {type: String, required: true},
// 	quantity: {type: Number, min: 1, required: true},
// 	checked: {type: Boolean, default: false, required: true}
// }, {
// 	_id: true
// });


// const List = new mongoose.Schema({
//   user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
//   name: {type: String, required: true},
// 	createdAt: {type: Date, required: true},
// 	items: [Item]
// });


// User.plugin(passportLocalMongoose);
// List.plugin(URLSlugs('name'));

mongoose.model('User', User);
mongoose.model('CurrentTask', CurrentTask);
mongoose.model('CompletedTask', CompletedTask);
mongoose.model('Diary', Diary);



// OPTIONAL: modify the connection code below if
// using mongodb authentication
const mongooseOpts = {
	useNewUrlParser: true,  
	useUnifiedTopology: true
}; 



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
	// if we're not in PRODUCTION mode, then use
	dbconf = 'mongodb://localhost/TaskDiary';
}

//This is for the connection for deployment
mongoose.connect(dbconf, mongooseOpts, (err) => {
  if (err) {
  console.log(err);
  } else {
    console.log('connected to database'); 
  }
});



//mongoose.connect('mongodb://localhost/TaskDiary');

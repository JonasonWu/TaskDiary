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
mongoose.connect('mongodb://localhost/TaskDiary');


# Task Diary

## Overview

There are many tasks to do every day. In order to keep track of the tasks to do, we may use a text document or Post-its. With so many tasks that are done each day, it will become hard to keep track of the tasks that are completed and tasks that still need to be done. However, the general result is that the details of the task will be deleted or thrown away once the task is completed. 

Task Diary is a web application that attempts to keep it simple and easy to manage every task that the user adds to the app. Multiple timestamps will be added to each task to help the user recall the details of the task. The user could also optionally write a diary using the app, assisted by a list of completed tasks and new tasks to do.

## Data Model

The application will store User, CurrentTask, CompletedTask, and Diary

* Each User stores references to the CurrentTask, CompletedTask, and Diary objects (via references)
* Each CurrentTask object will include the current tasks that the user has not completed
* Each CompletedTask object stores a completed task that the user completed
* Each Diary object stores the details of a day.

An Example User:

```javascript
{
  username: "user1",
  hash: ,// a password hash,
  CurrentTasks: [12, 14, 17], // an array of references to the current tasks of the user
  CompletedTasks: [5, 7, 19], //an array of references to the completed tasks of the user
  CurrentTasksGroupNames: ["Urgent", "Not Urgent", "Long Term"], //an array of group names that the user creates to sort the current tasks
  Diary: [12, 19, 22]//an array of references to the diary pages of the user
}
```

Examples of CurrentTask:

```javascript
{
  user: 12, // a reference to a User object
  createdAt: ,//Time of creation of this object. Time stamp
  title: "Wash the car",//The subject or focus of the task
  taskDetails: ["Drive to Washing place", "Ask for a normal wash", "Wait for car to finish washing", "Drive home"], //an array that stores details of the task (via bullet points).
  estimatedCompletionTime: "2 hours", //The amount of time that it may take to finish the task 
  group: 1 //The index of the group to display the current task on
}
```
```javascript
{
  user: 14, // a reference to a User object
  createdAt: ,//Time of creation of this object. Time stamp
  title: "",//The subject or focus of the task
  taskDetails: [], //an array that stores details of the task (via bullet points).
  estimatedCompletionTime: "", //The amount of time that it may take to finish the task 
  group: 1 //The index of the group to display the current task on
}
```

An Example CompletedTask:

```javascript
{
  user: 5, // a reference to a User object
  createdAt: ,//Time of creation of this object
  title: "Walk home", //The subject or focus of the task (written by user)
  taskDetails: ["Go home"], //an array that stores details of the task (via bullet points by the user).
  estimatedCompletionTime: "10 minutes", //The amount of time the user thinks it may take to finish the task 
  completedAt: //Finish time of the task
}
```

An Example Diary:

```javascript
{
  user: 12, // a reference to a User object.
  createdAt: ,//Time of creation of this object. 
  date: "3/23/22" ,//The date the diary is for.
  title: "Great day", //The subject or focus of the diary page. (data + title will be the title of the diary page shown to the user)
  details: "It was raining in the morning. I went home early this evening.",//The diary record for the day
  completedAt: //Finish time of the task
}
```


## [Link to Commented First Draft Schema](db.js) 

## Wireframes

/login - login page of the web app. <!-- The site might or might not try logging in through google first. -->

![login page](documentation/login.jpg)

/new - page to create a new account

![new account page](documentation/new.jpg)

/main - page that indicates features of the web application

![main page](documentation/main.jpg)

/main/current - page that includes all the current tasks

![current tasks](documentation/main-current.jpg)

/main/completed - page that indicates all completed tasks

![completed tasks](documentation/main-completed.jpg)

/main/diary - page that includes all the diary entries

![diary entries](documentation/main-diary.jpg)

## Site map

![Site map](documentation/sitemap.jpg)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site.
2. as a user, I can log in to the site.
3. as a user, I access the current tasks, completed tasks, and diary.
4. as a user, I add a new task to the current tasks page.
5. as a user, I can check off the task and details of the task to indicate completion.
6. as a user, I can edit the tasks that was already created.
7. as a user, I can create groups for the current tasks page to sort the tasks.
8. as a user, I can search specific diary entries that I previously wrote.
9. as a user, I can create a new diary entry.
10. as a user, I can see all the completed tasks.

<!--
11. as a user, I can delete completed tasks.
12. as a user, I can log out.
 -->

## Research Topics

* (3 points) Unit testing with JavaScript - Mocha
    * This is a library that is used for testing the functions in JavaScript.
    * It is useful for making sure that the functions for the website is written correctly.
    * I'm going to try writing my own mocha code for testing my functions.
* (5 points) Functional testing for all of my routes - Selenium
    * This is a library that is used for testing the web browser to make sure that user interactions work. It automates the user interaction, so tests can be written for it. <!-- I think this is how it works -->
    * This should solve the problem of having to test whether the web application works after every single change.
* (x points) Perform automatic authentication (or provide option) if the user is signed into google.
    * Other websites have ways to login through another site.
    * There would be a way to sign in through /login window, or the user can choose to sign in through google account.

8+x points total out of 8 required points


## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

1. [selenium intro](https://www.lambdatest.com/blog/automation-testing-with-selenium-javascript/) - [RouteTesting.js](/tests/RouteTesting.js)

<!-- 1. [passport.js authentication docs](http://passportjs.org/docs) - ([db.js](db.js), [index.js](/routes/index.js)) -->
<!-- 2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this) -->


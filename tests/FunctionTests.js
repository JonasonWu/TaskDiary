//This uses mocha to test functions that I will create
//This is for the 3 point research topic "Unit testing with JS"
const path = require('path');
const chai = require('chai');
const expect = chai.expect; 
const modulePath = path.join(__dirname, '../MemoryGame/memoryFunctions.js');
const c = require(modulePath);
console.log(modulePath);


//Potential functions that I will create
//1. Test whether user already exists (for new user that is trying to register)
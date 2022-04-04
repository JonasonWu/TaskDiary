//This uses mocha to test functions that I will create
//This is for the 3 point research topic "Unit testing with JS"
const path = require('path');
const chai = require('chai');
const expect = chai.expect; 
const modulePath = path.join(__dirname, '../');
const c = require(modulePath);
console.log(modulePath);
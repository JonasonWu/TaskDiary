
const path = require('path');
const chai = require('chai');
const expect = chai.expect; 
const modulePath = path.join(__dirname, './RouteTesting.js');
const funcs = require(modulePath);

//The precondition is that noone but this program has this username
const username = "sdfghbnmfgiwrohkljdnkjreop orepoevlfd";
const password = "dfghjiuiekjllvb roi ,  ff";
describe("RouteTesting", function() {
    describe("makeAccount", function() {
        it('Does not allow registration for usernames of less than 3 characters.', function() {
            const title1 = funcs.makeAccount("j", "dklfj");
            const title2 = funcs.makeAccount('fd', "dfsd");
            expect(title1).to.deep.equal("Register");
            expect(title2).to.deep.equal("Register");
        });
    });
    describe("Login", function() {
        it("Successfully logs in on valid account creation", function() {
            funcs.makeAccount(username, password);
            const title = funcs.Login(username, password);
            expect(title).to.deep.equal.apply("Main");
        });
    });
    describe("addTask", function() {
        it("Should end up at the same page after adding a task", function() {
            funcs.addTask(username, password);
        });
    });
});
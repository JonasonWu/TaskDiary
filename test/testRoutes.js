
const path = require('path');
const chai = require('chai');
const expect = chai.expect; 
const modulePath = path.join(__dirname, './RouteTesting.js');
const funcs = require(modulePath);

//The precondition is that the username is only used by this program.
const username = "sdfghbnmfgiwrohkljdnkjreop orepoevlfd";
const password = "dfghjiuiekjllvb roi ,  ff";

describe.only("RouteTesting", function() {
    describe.only("makeAccount", function() {
        it('Does not allow registration for usernames of less than 3 characters.', async function() {
            const title1 = await funcs.makeAccount("j", "dklfj");
            const title2 = await funcs.makeAccount('fd', "dfsd");
            expect(title1).to.equal("Register");
            expect(title2).to.equal("Register");
        }).timeout(20000);
    });
    describe.only("Login", function() {
        it("Successfully logs in on valid account creation", async function() {
            await funcs.makeAccount(username, password);
            const title = await funcs.Login(username, password);
            expect(title).to.equal("Main");
        }).timeout(20000);
    });
    describe.only("addTask", function() {
        it("Should end up at the same page after adding a task", async function() {
            const title = await funcs.addTask(username, password);
            expect(title).to.equal("Current Tasks");
        }).timeout(20000);
    });
    describe.only("removeTask", function() {
        it("Should remove all tasks, so the task list is empty", async function() {
            await funcs.removeCurrentTasks(username, password);
            const empty = await funcs.checkEmpty(username, password);
            expect(empty).to.equal(true);
        }).timeout(20000);
    });
});

//This file contains the functions that perform automated testing with selenium
//const webdriver = require('selenium-webdriver');
const {By, Key, Builder} = require("selenium-webdriver");
require("chromedriver");

//Makes an account given the username and password, then returns the title of the resulting page.
async function makeAccount(username, password) {
    //To wait for browser to build and launch properly
    const driver = await new Builder().forBrowser("chrome").build();
    //Go to this site
    await driver.get('http://localhost:3000');
    //Click on the register link
    await driver.findElement(By.linkText("Register")).click();

    //Try registering for the account
    await driver.findElement(By.name("username")).sendKeys(username);
    await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);

    //Get the title of the current page
    const title = await driver.getTitle();
    //If it is still Register, then the account has not been created.
    //If it is Login, then account should be successfully created.
    //console.log("Title of the page is: ", title);
    await driver.quit();
    return title;
}

//This function test the functionality of the login, given a username and password.
//Tries to log in with the username and password, then returns the title of the resulting page. 
async function Login(username, password) {
    //To wait for browser to build and launch properly
    const driver = await new Builder().forBrowser("chrome").build();
    
    await driver.get('http://localhost:3000');
    //Click on the register link
    await driver.findElement(By.linkText("Login")).click();

    //Input the username and password
    await driver.findElement(By.name("username")).sendKeys(username);
    await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);

    //Verify entry
    const title = await driver.getTitle();
    await driver.quit();
    return title;
}

//This function attempts to test the functionality of adding a new task.
//Attempts to go to the path of where adding tasks is possible, then attempts to add a task.
//  The title of the resulting page is returned.
async function addTask(username, password) {
    //To wait for browser to build and launch properly
    const driver = await new Builder().forBrowser("chrome").build();
    await driver.get('http://localhost:3000');
    //Click on the register link
    await driver.findElement(By.linkText("Login")).click();

    //This should be valid
    await driver.findElement(By.name("username")).sendKeys(username);
    await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);

    await driver.findElement(By.linkText("Current Tasks")).click();
    
    //Find the inputs for adding a new task
    const inputs = await driver.findElements(By.css("form[action='/main/current/newTask'] > input"));
    //Create strings to fill the inputs with
    const addTitle = "Go to the park";
    const addDetail = "Eat food";
    const addDetail2 = "Play with dog";
    //Add the string values into the inputs of the form and press enter.
    await inputs[0].sendKeys(addTitle);
    await inputs[1].sendKeys(addDetail);
    await inputs[2].sendKeys(addDetail2);
    await inputs[inputs.length-1].sendKeys(Key.RETURN);
    //Return the title of the resulting page.
    const title = await driver.getTitle();
    await driver.quit();
    return title;
}

//This function attempts to test the functionality of the removing form.
//Operates on the form for moving all the tasks away from the page.
//Returns the title of the resulting page after all operations.
async function removeCurrentTasks(username, password) {
    //To wait for browser to build and launch properly
    const driver = await new Builder().forBrowser("chrome").build();
    await driver.get('http://localhost:3000');
    //Click on the register link
    await driver.findElement(By.linkText("Login")).click();

    //This should be valid
    await driver.findElement(By.name("username")).sendKeys(username);
    await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);

    await driver.findElement(By.linkText("Current Tasks")).click();
    
    const input = await driver.findElement(By.css('form[action="/main/current/moveALL"] > input[type="submit"]'));
    await input.sendKeys(Key.RETURN);
    const title = await driver.getTitle();
    await driver.quit();
    return title;
}

//This function attempts to test whether the current task list is empty
async function checkEmpty(username, password) {
    //To wait for browser to build and launch properly
    const driver = await new Builder().forBrowser("chrome").build();
    await driver.get('http://localhost:3000');
    //Click on the register link
    await driver.findElement(By.linkText("Login")).click();

    //This should be valid
    await driver.findElement(By.name("username")).sendKeys(username);
    await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);

    await driver.findElement(By.linkText("Current Tasks")).click();
    
    //Get the data elements of the page.
    const param = await driver.findElements(By.css("ol > li"));
    await driver.quit();
    //If param doesn't exist, then the list is empty, which means that no data exists.
    if (param.length === 0) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = {
    makeAccount,
    Login,
    addTask,
    removeCurrentTasks,
    checkEmpty
};
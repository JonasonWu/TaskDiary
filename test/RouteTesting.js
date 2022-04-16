//This tries to perform testing with selenium
//const webdriver = require('selenium-webdriver');
const {By, Key, Builder} = require("selenium-webdriver");
require("chromedriver");

//Note: this is just an example test that works. It is not really
//  a test I will need for my web app.
// async function example() {
//     const searchString = "Automation testing with Selenium and JavaScript";

//     //To wait for browser to build and launch properly
//     const driver = await new Builder().forBrowser("chrome").build();

//     //To fetch http://google.com from the browser with our code.
//     await driver.get("http://google.com");

//     //To send a search query by passing the value in searchString.
//     await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);

//     //Verify the page title and print it
//     const title = await driver.getTitle();

//     console.log('Title is:', title);

//     //It is always a safe practice to quit the browser after execution
//     await driver.quit();

// }
//example();

// describe("Routes", function() {
//     describe("Register", function() {
//         it('Creates an account for valid inputs', function() {
//             //To wait for browser to build and launch properly
//             const driver = await new Builder().forBrowser("chrome").build();
//             //Go to this site
//             await driver.get('http://localhost:3000/register');

//             //Try registering for the account
//             await driver.findElement(By.name("username")).sendKeys(username);
//             await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);

//             //Get the title of the current page
//             const title = await driver.getTitle();
//         });
//     });
// });


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


//This function attempts to test the functionality of the login
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

//This function attempts to test the functionality of the task addition form
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
    
    const inputs = await driver.findElements(By.css("form[action='/main/current/newTask'] > input"));
    console.log(inputs);
    const addTitle = "Go to the park";
    const addDetail = "Eat food";
    const addDetail2 = "Play with dog";
    
    await inputs[0].sendKeys(addTitle);
    await inputs[1].sendKeys(addDetail);
    await inputs[2].sendKeys(addDetail2);
    await inputs[inputs.length-1].sendKeys(Key.RETURN);
    const title = await driver.getTitle();
    await driver.quit();
    return title;
}




//describe('');





// const Chrome = new webdriver.Builder();

// withCapabilities(webdriver.Capabilities.chrome()).build();

// Chrome.get('http:/www.google.com');

// const promise = webdriver.getTitle();

// promise.then(function(title) {

//     console.log(title);

// });

// webdriver.quit();



//Links to help
/**
https://www.lambdatest.com/blog/automation-testing-with-selenium-javascript/
\





 */



module.exports = {
    makeAccount,
    Login,
    addTask
};
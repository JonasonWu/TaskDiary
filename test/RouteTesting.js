//This tries to perform testing with selenium
//const webdriver = require('selenium-webdriver');
const {By, Key, Builder} = require("selenium-webdriver");
require("chromedriver");

//Note: this is just an example test that works. It is not really
//  a test I will need for my web app.
async function example() {
    const searchString = "Automation testing with Selenium and JavaScript";

    //To wait for browser to build and launch properly
    const driver = await new Builder().forBrowser("chrome").build();

    //To fetch http://google.com from the browser with our code.
    await driver.get("http://google.com");

    //To send a search query by passing the value in searchString.
    await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);

    //Verify the page title and print it
    const title = await driver.getTitle();
    console.log('Title is:', title);

    //It is always a safe practice to quit the browser after execution
    await driver.quit();

}
//example();

//This function attempts to test the functionality of the login
async function Login(username, password) {
    const addTitle = "Go to the park";
    const addDetail = "Eat food";
    const addDetail2 = "Play with dog";

    //To wait for browser to build and launch properly
    const driver = await new Builder().forBrowser("chrome").build();
    //Go to this site
    await driver.get('http://localhost:3000/login');

    await driver.findElement(By.name("username")).sendKeys(username);
    await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);

    //Verify entry


    await driver.quit();


}
Login("jw5911", "jw5911");

//This function attempts to test the functionallity of the task addition form
function addTask() {

}




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
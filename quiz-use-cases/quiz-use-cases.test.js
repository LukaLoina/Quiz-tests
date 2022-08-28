const {Builder, until, By} = require('selenium-webdriver');
const { suite  } = require('selenium-webdriver/testing');
const chromeDriver = require('chromedriver');
const geckoDriver = require('geckodriver');

const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

let driver = null
var port = process.env.PORT || '3000';
const useCaseShowBrowser = process.env.USE_CASE_SHOW_BROWSER || false;

const POM = {
    "body": By.css('body'),
    "quizStartBox": By.css('.quiz-start-box'),
    "quizStartButton": By.css('.quiz-start-button'),
    "questionBox": By.css('.question-box'),
    "questionSpinner": By.css('.lds-dual-ring'),
    "resultsDisplay": By.css('.quiz-results-container')
}


const tests = [
    {name: "goes to homepage",
     steps: async () => {
	await driver.get('http://localhost:'+port);
	let ele = await driver.wait(until.elementLocated(POM.body),10000);
	let title = await driver.getTitle();
	expect(title).toBe("Arithmetic Mental Stress Test")
     }},
    {name: "goes to quiz page",
     steps: async () => {
	await driver.get('http://localhost:'+port+"/quiz");
	let quizStartBox = await driver.wait(until.elementLocated(POM.quizStartBox),10000);
	expect(quizStartBox).not.toBe(null)
     }},
    {name: "can start quiz by clicking button",
     steps: async () => {
	 await driver.get('http://localhost:'+port+"/quiz");
	 let quizStartBox = await driver.wait(until.elementLocated(POM.quizStartBox),10000);
	 let button = quizStartBox.findElement(POM.quizStartButton);
	 
	 button.click()

	 let questionBox = await driver.wait(until.elementLocated(POM.questionBox),10000);
	 expect(questionBox).not.toBe(null)
     }},
    {name: "question dissapears after 5 seconds",
     steps: async () => {
	 await driver.get('http://localhost:'+port+"/quiz");
	 let quizStartBox = await driver.wait(until.elementLocated(POM.quizStartBox),10000);
	 let button = quizStartBox.findElement(POM.quizStartButton);
	 
	 button.click()

	 let questionBox = await driver.wait(until.elementLocated(POM.questionBox),10000);
	 const startTime = new Date();

	 let spinner = await driver.wait(until.elementLocated(POM.questionSpinner),10000);
	 const endTime = new Date();
	 var timeDiff = endTime - startTime;

	 const expectedTime = 5000;
	 const jitter = 200;
	 
	 expect(spinner).not.toBe(null)
	 expect(timeDiff).toBeGreaterThan(expectedTime - jitter);
	 expect(timeDiff).toBeLessThan(expectedTime + jitter);
     }},
    {name: "spinner between questions is shown for 2 seconds",
     steps: async () => {
	 await driver.get('http://localhost:'+port+"/quiz");
	 let quizStartBox = await driver.wait(until.elementLocated(POM.quizStartBox),10000);
	 let button = quizStartBox.findElement(POM.quizStartButton);
	 
	 button.click()
	 let questionBox = await driver.wait(until.elementLocated(POM.questionBox),10000);
	 let spinner = await driver.wait(until.elementLocated(POM.questionSpinner),10000);
	 const startTime = new Date();
	 questionBox = await driver.wait(until.elementLocated(POM.questionBox),10000);
	 const endTime = new Date();
	 var timeDiff = endTime - startTime;

	 const expectedTime = 2000;
	 const jitter = 200;

	 expect(questionBox).not.toBe(null)
	 expect(timeDiff).toBeGreaterThan(expectedTime - jitter);
	 expect(timeDiff).toBeLessThan(expectedTime + jitter);
     }},
    {name: "quiz ends after 7 minutes",
     steps: async () => {
	 await driver.get('http://localhost:'+port+"/quiz");
	 let quizStartBox = await driver.wait(until.elementLocated(POM.quizStartBox),10000);
	 let button = quizStartBox.findElement(POM.quizStartButton);
	
	 button.click()
	 const startTime = new Date();
	 
	 let quizEndBox = await driver.wait(until.elementLocated(POM.resultsDisplay), 7.5*60*1000);
	 const endTime = new Date();
	 var timeDiff = endTime - startTime;

	 const expectedTime = 7*60*1000;
	 const jitter = 200;

	 console.log(`quiz end time: ${timeDiff}`)
	 expect(quizEndBox).not.toBe(null)
	 expect(timeDiff).toBeGreaterThan(expectedTime - jitter);
	 expect(timeDiff).toBeLessThan(expectedTime + jitter);
     }}
]

jest.setTimeout(60*60*1000)


describe('firefox', () => {
    beforeEach(async () => {
	
	let options = new firefox.Options();
	if(!useCaseShowBrowser){
	    options.addArguments('--headless');
	}
	const service = new firefox.ServiceBuilder(geckoDriver.path).enableVerboseLogging(true).setLoopback(false).addArguments("-vv")
        driver = await new Builder()
            .setFirefoxOptions(options)
            .forBrowser('firefox')
	    .setFirefoxService(service)
            .build();
    });

    afterEach(() => {
	driver.quit()
    });


    for(test of tests){it("firefox "+test.name, test.steps)}
})

describe('chrome', () => {
    
    beforeEach(async () => {
	let options = new chrome.Options()
	if(!useCaseShowBrowser){
	    options.addArguments('--headless');
	}
	const service = new chrome.ServiceBuilder(chromeDriver.path);
        driver = await new Builder()
	    .forBrowser('chrome')
            .setChromeOptions(options)
	    .setChromeService(service)
            .build();
    });

    afterEach(() => {
	driver.quit()
    });

    for(test of tests){it("chrome "+test.name, test.steps)}
})



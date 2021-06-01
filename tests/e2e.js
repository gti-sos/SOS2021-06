const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    console.log("Browser opened.");

    const page = await browser.newPage();
    await page.goto('http://localhost:10000/');
 
    console.log("Page opened! Taking an screenshot...");

    await page.screenshot({ path: './tests/01.png' });
   ////////////////////////////////////////////////////////////////////////// 
    const [response] = await Promise.all([
        page.waitForNavigation(),
        page.click("body > header > div > div > div.col-lg-4 > a:nth-child(1)"),
      ]);

    await page.click("body > main > div > ul:nth-child(10) > li:nth-child(1) > a"),
      
    console.log("Clicked \"Github page\" link, waiting for contacts...");
      
    await page.waitForTimeout(1000);  

    console.log("Timeout! Taking an screenshot...");

    await page.screenshot({ path: './tests/02.png' });
  ////////////////////////////////////////////////////////////////////////////////////////
    var rowCount = (await page.$$("body > main > main > table > tbody > tr")).length;
    
    console.log(`Initial row count = ${rowCount}`);
    
    await page.$eval('#inputGroup', el => el.value = 'Cuatro');
    await page.$eval('#inputCountry', el => el.value = 'Spain');
    await page.$eval('#inputYear', el => el.value = '2021');
    await page.$eval('#inputAudienceYear', el => el.value = '1100000');
    await page.$eval('#inputAge', el => el.value = '60');
    await page.$eval('#inputAudienceMonth', el => el.value = '950000');

    await page.screenshot({ path: './tests/03.png' });

    await page.click("#insert"),

    await page.waitForTimeout(2000);  

    await page.screenshot({ path: './tests/04.png' });


    await browser.close();

    console.log("Browser closed!");

})();
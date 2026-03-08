import puppeteer from 'puppeteer';

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => {
        console.log('PAGE REQUEST FAILED:', request.url(), request.failure().errorText);
    });

    console.log("Navigating to diakzona.hu...");
    await page.goto('https://diakzona.hu/', { waitUntil: 'networkidle2' });

    console.log("Waiting 3s for any subsequent errors...");
    await new Promise(r => setTimeout(r, 3000));

    await browser.close();
    console.log("Done.");
})();

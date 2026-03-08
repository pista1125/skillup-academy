import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://diakzona.hu/', { waitUntil: 'networkidle0' });

    // Check if Bejelentkezés button exists
    const html = await page.evaluate(() => {
        const header = document.querySelector('header');
        return header ? header.outerHTML : 'NO HEADER FOUND';
    });

    console.log(html);
    await browser.close();
})();

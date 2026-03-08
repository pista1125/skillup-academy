import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://diakzona.hu/', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'live-site-screenshot.png' });
    await browser.close();
})();

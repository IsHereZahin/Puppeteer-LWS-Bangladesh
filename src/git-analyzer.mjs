import puppeteer from "puppeteer";
import fs from "fs/promises"; // use promises version of fs for better async/await handling

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: { width: 1920, height: 1080 },
            slowMo: 250,
            userDataDir: "temporary",
        });

        const page = await browser.newPage();
        await page.goto('https://git-analyzer.netlify.app/', { waitUntil: 'networkidle2' });
        
        await page.waitForSelector('input[placeholder="Enter GitHub Username"]');
        await page.type('input[placeholder="Enter GitHub Username"]', 'isherezahin');
        await page.click('button[class="generate-button"]');
        
        await page.waitForSelector('.result');
        
        // Ensure the directory exists
        await fs.mkdir('public/image/class', { recursive: true });

        // Get the bounding box of the result element
        const element = await page.$('.result');
        const boundingBox = await element.boundingBox();

        // Take a screenshot of the result element
        await page.screenshot({
            path: 'public/image/class/git-analyzer.png',
            clip: {
                x: boundingBox.x,
                y: boundingBox.y,
                width: boundingBox.width,
                height: boundingBox.height
            }
        });

        // Close the browser
        await browser.close();
    } catch (error) {
        console.error("Error:", error);
    }
})();

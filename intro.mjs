import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

// Function to ensure the directory exists
const ensureDirectoryExists = (filePath) => {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
};

(async () => {
    const filePath = "public/image/example.com.png";
    ensureDirectoryExists(filePath); // Ensure the directory exists

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1920, height: 1080 },
        slowMo: 250,
        userDataDir: "temporary",
    });

    const page = await browser.newPage();
    await page.goto("http://example.com", {
        waitUntil: "networkidle2",
        timeout: 60000,
    });

    await page.screenshot({ path: filePath });
    await browser.close();
})();

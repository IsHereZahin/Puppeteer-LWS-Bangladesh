import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import axios from "axios";

// Function to ensure the directory exists
const ensureDirectoryExists = (filePath) => {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
};

(async () => {
    const filePath = "public/image/class/profile.png";
    ensureDirectoryExists(filePath); // Ensure the directory exists

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1920, height: 1080 },
        slowMo: 250,
        userDataDir: "temporary",
    });

    const page = await browser.newPage();
    await page.goto("https://www.facebook.com/IsHereJahin");

    // Download the image from the URL
    const imageURL = "https://scontent.fdac137-1.fna.fbcdn.net/v/t39.30808-6/441340180_794391945986699_2590642621852220495_n.jpg?stp=dst-jpg_p526x296&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=n6FisxlqXqgQ7kNvgH45xxp&_nc_ht=scontent.fdac137-1.fna&oh=00_AYBQRFb9axE18OgPjPE_VAJUEIrQhh52lyrpvvM7u8HCQg&oe=6651464B";
    const imageResponse = await axios.get(imageURL, { responseType: "arraybuffer" });
    fs.writeFileSync("public/image/image.jpg", imageResponse.data);

    // Take a screenshot of the page
    await page.screenshot({ path: filePath });

    // Close the browser
    await browser.close();
})();

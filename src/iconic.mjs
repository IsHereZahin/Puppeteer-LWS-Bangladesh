import puppeteer from "puppeteer";

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: { width: 1920, height: 1080 },
            slowMo: 250,
            userDataDir: "temporary",
        });

        const page = await browser.newPage();
        await page.goto('http://iconicsolutionsbd.com/service/it/', { waitUntil: 'networkidle2' });
        
        // Wait for the portfolio content to load
        await page.waitForSelector('.page-content');

        // Extract portfolio data
        const portfolioData = await page.evaluate(() => {
            const portfolios = [];
            const portfolioElements = document.querySelectorAll('.service-item');

            // Get the count of portfolio items
            const portfolioCount = portfolioElements.length;

            portfolioElements.forEach(portfolio => {
                const titleElement = portfolio.querySelector('h3 a');
                const descriptionElement = portfolio.querySelector('p');
                const visitLinkElement = portfolio.querySelector('a.btn-text');

                portfolios.push({
                    title: titleElement ? titleElement.innerText.trim() : 'No title found',
                    description: descriptionElement ? descriptionElement.innerText.trim() : 'No description found',
                    visitLink: visitLinkElement ? visitLinkElement.href : 'No link found',
                });
            });

            return { portfolioCount, portfolios };
        });

        console.log(portfolioData);

        // Close the browser
        await browser.close();
    } catch (error) {
        console.error("Error:", error);
    }
})();

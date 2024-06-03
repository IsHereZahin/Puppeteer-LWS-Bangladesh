import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
//   const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    // slowMo: 250,
    userDataDir: "temporary",
  });


  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://developer.chrome.com/');

  // Type into search box
  await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.devsite-result-item-link';
  await page.waitForSelector(searchResultSelector, { visible: true }); // Wait for element to become visible
  // Wait for a specified amount of time
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second (1000 milliseconds)
  await page.click(searchResultSelector);  

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await page.screenshot({path: 'public/image/class/getting-started.png'});

  await browser.close();
})();
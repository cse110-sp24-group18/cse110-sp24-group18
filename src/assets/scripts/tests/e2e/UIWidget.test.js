const puppeteer = require('puppeteer');

describe('UI Widget E2E Tests', () => {
  let browser;
  let page;

  // Helper function to wait for a timeout
  const waitForTimeout = async (timeout) => {
    await page.evaluate((timeout) => {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    }, timeout);
  };

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:8080/src/index.html'); // Adjust URL to your local server

    // Bypass splash screen
    await page.mouse.click(0, 0);
    await waitForTimeout(400);
  });

  afterAll(async () => {
    await browser.close();
  });

  // Pre-change
  it('Look at summary', async () => {
    console.log('Look at summary');

    // When clicked, the summary will pop out
    const summaryHandler = await page.$('div[class="dropdown"]');
    const summaryBtn = await summaryHandler.$('button');
    await summaryBtn.click();

    const dropBoxes = await summaryHandler.$('div[class="dropdown-content show"]');
    const shown = dropBoxes ? true : false;

    expect(shown).toBe(true);

    const sleepData = await dropBoxes.$('div[class="bar-graph"]');
    const firstDaySleep = await sleepData.$eval('div[class="bar"]', el => getComputedStyle(el).height);

    expect(firstDaySleep).toBe('60px');

    const moodData = await dropBoxes.$('div[id="mood-box"]');
    const firstDayMood = await moodData.$('div[class="day"]');
    const imageHandle = await firstDayMood.$('img');

    const src = await imageHandle.evaluate(img => img.src);

    expect(src).toBe('http://127.0.0.1:5501/src/assets/emotion-widget/media/faceMeh.png');

    const codeData = await dropBoxes.$('div[id="lines-coded-summary"]');
    const firstDayCode = await codeData.$eval('div[class="bar"]', el => getComputedStyle(el).height);

    expect(firstDayCode).toBe('0px');
    
    await page.mouse.click(0,0);
  });

  // Open burger, make sure buttons show
  it('Checking the burger works', async () => {
    console.log('Checking the burger works');

    let displayProperty = await page.$eval('.burger-menu-container', el => getComputedStyle(el).display);

    expect(displayProperty).toBe('none');

    // Clicking the toggle
    const toggleSelector = '#toggle1';

    await page.evaluate(() => {
      const toggle = document.querySelector('#toggle1');
      if (toggle) {
        toggle.checked = true;
        toggle.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, toggleSelector);
    
    displayProperty = await page.$eval('.burger-menu-container', el => getComputedStyle(el).display);
    expect(displayProperty).toBe('flex');
    
  });

  // Sleep widget
  it('Checking the sleep widget', async () => {
    console.log('Checking the sleep widget');

    // Reloading to make sure it works
    await page.reload();
    await page.mouse.click(0, 0);
    await waitForTimeout(400);

    const toggleSelector = '#toggle1';

    await page.evaluate(() => {
      const toggle = document.querySelector('#toggle1');
      if (toggle) {
        toggle.checked = true;
        toggle.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, toggleSelector);

    // Checking the clicking of its button
    let sleepInterface = await page.$eval('div[id="sleep-toggle"]', el => getComputedStyle(el).display);
    const sleepBtn = await page.$('div[data-target="sleep-toggle"]');
    await sleepBtn.click();
    
    expect(sleepInterface).toBe('none');
    sleepInterface = await page.$eval('div[id="sleep-toggle"]', el => getComputedStyle(el).display);
    expect(sleepInterface).toBe('flex');

    // Get the bounding box of the slider
    const slider = await page.$('input[class="slider"]');
    const boundingBox = await slider.asElement().boundingBox();

    // Calculate the target position on the slider
    const targetX = boundingBox.x + (boundingBox.width / 2);
    const targetY = boundingBox.y + (boundingBox.height * 0.3); // Set the slider to Good

    // Simulate the mouse drag to move the slider
    await page.mouse.click(targetX, targetY);

    await page.mouse.click(0,0);

    sleepInterface = await page.$eval('div[id="sleep-toggle"]', el => getComputedStyle(el).display);
    expect(sleepInterface).toBe('none');

    // Check the summary for the change
    const summaryHandler = await page.$('div[class="dropdown"]');
    const summaryBtn = await summaryHandler.$('button');
    await summaryBtn.click();

    const dropBoxes = await summaryHandler.$('div[class="dropdown-content show"]');
    const sleepData = await dropBoxes.$('div[class="bar-graph"]');
    const firstDay = await sleepData.$eval('div[class="bar"]', el => getComputedStyle(el).height);

    expect(firstDay).toBe('80px');
  });

  // Mood widget
  it('Checking the mood widget', async () => {
    console.log('Checking the mood widget');

    // Reloading to make sure it works
    await page.reload();
    await page.mouse.click(0, 0);
    await waitForTimeout(400);

    const toggleSelector = '#toggle1';

    await page.evaluate(() => {
      const toggle = document.querySelector('#toggle1');
      if (toggle) {
        toggle.checked = true;
        toggle.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, toggleSelector);

    // Checking the clicking of its button
    let moodInterface = await page.$eval('div[id="mood-toggle"]', el => getComputedStyle(el).display);
    const moodBtn = await page.$('div[data-target="mood-toggle"]');
    await moodBtn.click();
    
    expect(moodInterface).toBe('none');
    moodInterface = await page.$eval('div[id="mood-toggle"]', el => getComputedStyle(el).display);
    expect(moodInterface).toBe('flex');

    // Get the gauge element's bounding box
    const gaugeBoundingBox = await page.evaluate(() => {
      const gauge = document.getElementById('gauge');
      const rect = gauge.getBoundingClientRect();
      return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      };
    });

    // Calculate the coordinates within the gauge based on the angle (420 for Amazing)
    const centerX = gaugeBoundingBox.x + (gaugeBoundingBox.width / 2);
    const centerY = gaugeBoundingBox.y + (gaugeBoundingBox.height / 2);
    const radius = gaugeBoundingBox.width / 2;
    const radians = (420 - 90) * (Math.PI / 180); // Convert angle to radians and adjust for 0 degrees being at 3 o'clock
    const x = centerX + (radius * Math.cos(radians));
    const y = centerY + (radius * Math.sin(radians));

    console.log(`Clicking at: (${x}, ${y}) for angle: ${420}`);

    // Move and click the mouse at the calculated coordinates
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.up();

    // Wait for UI update
    await waitForTimeout(400);

    await page.mouse.click(0,0);

    // Check the summary for the change
    const summaryHandler = await page.$('div[class="dropdown"]');
    const summaryBtn = await summaryHandler.$('button');
    await summaryBtn.click();

    const dropBoxes = await summaryHandler.$('div[class="dropdown-content show"]');
    const moodData = await dropBoxes.$('div[id="mood-box"]');
    const firstDay = await moodData.$('div[class="day"]');
    const imageHandle = await firstDay.$('img');

    const src = await imageHandle.evaluate(img => img.src);

    expect(src).toBe('http://127.0.0.1:5501/src/assets/emotion-widget/media/faceAmazing.png');
  });

  // Lines of code widget
  it('Checking the lines of code widget', async () => {
    console.log('Checking the lines of code widget');

    // Reloading to make sure it works
    await page.reload();
    await page.mouse.click(0, 0);
    await waitForTimeout(400);

    const toggleSelector = '#toggle1';

    await page.evaluate(() => {
      const toggle = document.querySelector('#toggle1');
      if (toggle) {
        toggle.checked = true;
        toggle.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, toggleSelector);

    // Checking the clicking of its button
    let codeInterface = await page.$eval('div[id="code-line-toggle"]', el => getComputedStyle(el).display);
    let codeBtn = await page.$('div[data-target="code-line-toggle"]');
    await codeBtn.click();
    
    expect(codeInterface).toBe('none');
    codeInterface = await page.$eval('div[id="code-line-toggle"]', el => getComputedStyle(el).display);
    expect(codeInterface).toBe('flex');

    // Using the + button
    let textBox = await page.$('input[class="number"]');
    
    await textBox.click();
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA'); // Press 'A' key
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace'); // Press 'Backspace' key
    await page.keyboard.type('0');

    const plusButton = await page.$('button[id="lines-increment"]');
    
    await plusButton.click();

    await page.mouse.click(0,0);

    // Check the summary for the change
    let summaryHandler = await page.$('div[class="dropdown"]');
    let summaryBtn = await summaryHandler.$('button');
    await summaryBtn.click();
    
    let dropBoxes = await summaryHandler.$('div[class="dropdown-content show"]');
    let codeData = await dropBoxes.$('div[id="lines-coded-summary"]');
    let firstDay = await codeData.$eval('div[class="bar"]', el => getComputedStyle(el).height);

    expect(firstDay).toBe('0.125px');
    await page.mouse.click(0,0);

    // Using the - button
    await page.evaluate(() => {
      const toggle = document.querySelector('#toggle1');
      if (toggle) {
        toggle.checked = true;
        toggle.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, toggleSelector);
    
    codeBtn = await page.$('div[data-target="code-line-toggle"]');
    await waitForTimeout(400);
    await codeBtn.click();

    const minusButton = await page.$('button[id="lines-decrement"]');
    
    await minusButton.click();

    await page.mouse.click(0,0);

    // Check the summary for the change
    summaryHandler = await page.$('div[class="dropdown"]');
    summaryBtn = await summaryHandler.$('button');
    await summaryBtn.click();
    
    dropBoxes = await summaryHandler.$('div[class="dropdown-content show"]');
    codeData = await dropBoxes.$('div[id="lines-coded-summary"]');
    firstDay = await codeData.$eval('div[class="bar"]', el => getComputedStyle(el).height);

    expect(firstDay).toBe('0px');
    await page.mouse.click(0,0);

    // Using the textbox
    await page.evaluate(() => {
      const toggle = document.querySelector('#toggle1');
      if (toggle) {
        toggle.checked = true;
        toggle.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, toggleSelector);
    
    codeBtn = await page.$('div[data-target="code-line-toggle"]');
    await codeBtn.click();
    
    textBox = await page.$('input[class="number"]');
    
    await textBox.click();
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA'); // Press 'A' key
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace'); // Press 'Backspace' key
    await page.keyboard.type('10000');

    await page.mouse.click(0,0);

    // Check the summary for the change
    summaryHandler = await page.$('div[class="dropdown"]');
    summaryBtn = await summaryHandler.$('button');
    await summaryBtn.click();
    
    dropBoxes = await summaryHandler.$('div[class="dropdown-content show"]');
    codeData = await dropBoxes.$('div[id="lines-coded-summary"]');
    firstDay = await codeData.$eval('div[class="bar"]', el => getComputedStyle(el).height);

    expect(firstDay).toBe('100px');
  });
});

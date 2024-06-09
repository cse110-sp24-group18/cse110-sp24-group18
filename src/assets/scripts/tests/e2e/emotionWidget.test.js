/**
 * @jest-environment jsdom
 */

const puppeteer = require('puppeteer');

describe('Emotion Widget E2E Tests', () => {
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
    await page.waitForSelector('#splash-container'); // Adjust to your splash screen's button or interaction point
    await page.click('#splash-container');

    await waitForTimeout(1000);

    // Wait for the burger menu to be available in the DOM
    await page.waitForSelector('.hamburger1');

    // Click the burger menu button
    await page.click('.hamburger1');

    await waitForTimeout(1000);

    // Wait for the widget button to be available in the DOM
    await page.waitForSelector('.widget-btn');

    // Click the widget button
    await page.click('div.widget-btn[data-target="mood-toggle"]');

    await waitForTimeout(1000);

    // Ensure the getEmotion function is available
    await page.waitForFunction(() => typeof window.getEmotion === 'function');
  });

  afterAll(async () => {
    await browser.close();
  });

  const gaugePositions = {
    MISERABLE: { angle: 300 }, // Adjusted for more precision
    SAD: { angle: 320 },
    MEH: { angle: 360 },
    HAPPY: { angle: 380 },
    AMAZING: { angle: 420 }
  };

  const resetState = async () => {
    await page.evaluate(() => {
      window.currSpeed = 150; // Reset currSpeed before each test
      window.emotion = 'MEH'; // Reset emotion before each test
    });
  };

  const clickGaugeAndCheckEmotion = async (angle, expectedEmotion) => {
    await resetState();

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

    // Calculate the coordinates within the gauge based on the angle
    const centerX = gaugeBoundingBox.x + (gaugeBoundingBox.width / 2);
    const centerY = gaugeBoundingBox.y + (gaugeBoundingBox.height / 2);
    const radius = gaugeBoundingBox.width / 2;
    const radians = (angle - 90) * (Math.PI / 180); // Convert angle to radians and adjust for 0 degrees being at 3 o'clock
    const x = centerX + (radius * Math.cos(radians));
    const y = centerY + (radius * Math.sin(radians));

    console.log(`Clicking at: (${x}, ${y}) for angle: ${angle}`);

    // Move and click the mouse at the calculated coordinates
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.up();

    // Wait for UI update
    await waitForTimeout(1000);

    // Check the emotion
    const emotion = await page.evaluate(() => window.getEmotion());
    console.log(`Emotion after click: ${emotion}`);
    expect(emotion).toBe(expectedEmotion); // Ensure the correct emotion is set
  };

  test('should set emotion to MISERABLE on click', async () => {
    await clickGaugeAndCheckEmotion(gaugePositions.MISERABLE.angle, 'MISERABLE');
  });

  test('should set emotion to SAD on click', async () => {
    await clickGaugeAndCheckEmotion(gaugePositions.SAD.angle, 'SAD');
  });

  test('should set emotion to MEH on click', async () => {
    await clickGaugeAndCheckEmotion(gaugePositions.MEH.angle, 'MEH');
  });

  test('should set emotion to HAPPY on click', async () => {
    await clickGaugeAndCheckEmotion(gaugePositions.HAPPY.angle, 'HAPPY');
  });

  test('should set emotion to AMAZING on click', async () => {
    await clickGaugeAndCheckEmotion(gaugePositions.AMAZING.angle, 'AMAZING');
  });
});

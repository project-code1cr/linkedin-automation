const { chromium } = require("playwright");

// helper: random delay (anti-bot)
function randomDelay(min = 20000, max = 60000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function startLinkedInAutomation() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Opening LinkedIn login...");
  await page.goto("https://www.linkedin.com/login");

  console.log("Login manually (60s)...");
  await page.waitForTimeout(60000);

  // force feed (skip onboarding issues)
  await page.goto("https://www.linkedin.com/feed/", {
    waitUntil: "networkidle",
  });

  console.log("Logged in. Starting profile visits...");

  // 👇 list of profiles to visit
  const profiles = [
    "https://www.linkedin.com/in/satyanadella/",
    "https://www.linkedin.com/in/sundarpichai/",
    "https://www.linkedin.com/in/elonmusk/"
  ];

  for (const profile of profiles) {
    console.log("Visiting:", profile);
    await page.goto(profile, { waitUntil: "networkidle" });

    const delay = randomDelay();
    console.log(`Waiting ${delay / 1000} seconds (human-like)`);
    await page.waitForTimeout(delay);
  }

  console.log("Profile visiting completed");
}

module.exports = { startLinkedInAutomation };

const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  const logs = [];
  page.on('pageerror', err => errors.push('[PAGE ERROR] ' + err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') logs.push('[ERROR] ' + msg.text());
    else if (msg.type() === 'log') logs.push('[LOG] ' + msg.text());
  });
  try {
    await page.goto('http://192.168.0.101:5173', { timeout: 15000 });
    console.log('Page loaded');
  } catch(e) { console.log('Load error:', e.message); await browser.close(); return; }
  await page.waitForTimeout(2000);
  const startBtn = page.getByRole('button', { name: /start/i }).first();
  if (await startBtn.isVisible().catch(() => false)) {
    await startBtn.click();
    console.log('Clicked Start Game');
  } else { console.log('Start button not found'); }
  await page.waitForTimeout(1000);
  const classBtns = await page.getByRole('button').all();
  console.log('Buttons count:', classBtns.length);
  if (classBtns.length > 0) { await classBtns[0].click(); console.log('Clicked class'); }
  await page.waitForTimeout(1000);
  const allBtns = await page.getByRole('button').all();
  for (const btn of allBtns) {
    const text = await btn.textContent().catch(() => '');
    if (text && text.toLowerCase().includes('normal')) { await btn.click(); console.log('Clicked Normal'); break; }
  }
  await page.waitForTimeout(3000);
  console.log('ERRORS:', errors.join('\n'));
  console.log('LOGS:', logs.join('\n'));
  const canvasCount = await page.locator('canvas').count();
  console.log('Canvas count:', canvasCount);
  if (canvasCount > 0) { const bb = await page.locator('canvas').first().boundingBox(); console.log('Canvas BB:', JSON.stringify(bb)); }
  await browser.close();
})();

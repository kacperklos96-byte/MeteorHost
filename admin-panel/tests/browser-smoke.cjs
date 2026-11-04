/* Browser smoke test for the actual Ore-inspired admin panel.
 * Run: npm install --no-save playwright && npx playwright install chromium
 *      node admin-panel/tests/browser-smoke.cjs
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const shots = path.join(__dirname, 'screenshots');
fs.mkdirSync(shots, { recursive: true });

const server = http.createServer((req, res) => {
  const urlPath = new URL(req.url, 'http://localhost').pathname;
  const file = path.resolve(ROOT, '.' + (urlPath === '/' ? '/index.html' : urlPath));
  if (!file.startsWith(ROOT + path.sep)) {
    res.writeHead(403); res.end(); return;
  }
  fs.readFile(file, (err, bytes) => {
    if (err) { res.writeHead(404); res.end(); return; }
    res.setHeader('Content-Type',
      file.endsWith('.css') ? 'text/css' : file.endsWith('.js') ?
      'application/javascript' : 'text/html; charset=utf-8');
    res.end(bytes);
  });
});

async function run() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = 'http://127.0.0.1:' + server.address().port + '/';
  const browser = await chromium.launch({ headless:true, args:['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport:{width:1440,height:900},
      deviceScaleFactor:1 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url, { waitUntil:'domcontentloaded' });
    await page.locator('#overviewStats .stat').first().waitFor({ timeout:10000 });
    assert.equal(await page.locator('#overviewStats .stat').count(), 4);
    assert.equal(await page.locator('#page-overview').isVisible(), true);
    const navColor = await page.locator('.sidebar').evaluate(x=>getComputedStyle(x).backgroundColor);
    assert.equal(navColor, 'rgb(40, 41, 44)');
    await page.screenshot({path:path.join(shots,'desktop-overview.png'),fullPage:true});
    await page.locator('.navitem[data-page="settings"]').click();
    assert.equal(new URL(page.url()).hash,'#settings');
    await page.locator('.navitem[data-page="settings"]').focus();
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('#page-map').isVisible(),true);
    assert.equal(new URL(page.url()).hash,'#map');
    await page.locator('.navitem[data-page="settings"]').click();
    assert.equal(await page.locator('#page-settings').isVisible(), true);
    await page.locator('#oreDensity').selectOption('compact');
    assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('ore-compact')),true);
    await page.locator('#oreConsoleSize').evaluate(el=>{el.value='17';el.dispatchEvent(new Event('input',{bubbles:true}));});
    assert.equal(await page.locator('#oreConsoleSizeValue').innerText(),'17 px');
    await page.locator('#oreTimestamps').uncheck();
    assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('ore-hide-timestamps')),true);
    await page.locator('#oreDemoHints').uncheck();
    assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('ore-hide-tips')),true);
    await page.screenshot({path:path.join(shots,'desktop-settings.png'),fullPage:true});
    await page.reload({waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('#page-settings').isVisible(),true);
    assert.equal(await page.locator('#oreConsoleSize').inputValue(),'17');
    assert.equal(await page.locator('#oreDensity').inputValue(),'compact');
    assert.equal(await page.locator('#oreTimestamps').isChecked(),false);
    await page.locator('.navitem[data-page="console"]').click();
    assert.equal(await page.locator('#page-console').isVisible(),true);
    await page.locator('#consoleCommand').fill('list');
    await page.locator('[data-run="consoleCommand"]').click();
    assert.ok((await page.locator('#fullLogs').innerText()).includes('list'));
    await page.locator('.navitem[data-page="players"]').click();
    assert.equal(await page.locator('#page-players').isVisible(),true);
    await page.locator('.navitem[data-page="anticheat"]').click();
    assert.equal(await page.locator('#page-anticheat').isVisible(),true);
    await page.locator('.navitem[data-page="map"]').click();
    assert.equal(await page.locator('#page-map').isVisible(),true);

    const mobile = await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
    mobile.on('pageerror', error=>errors.push('mobile: '+error.message));
    await mobile.goto(url,{waitUntil:'domcontentloaded'});
    await mobile.locator('#overviewStats .stat').first().waitFor();
    assert.equal(await mobile.locator('.mobile-head').isVisible(),true);
    const overflow=await mobile.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=1, 'Mobile horizontal overflow '+overflow+'px');
    await mobile.screenshot({path:path.join(shots,'mobile-overview.png'),fullPage:true});
    await mobile.locator('#mobileMenuOpen').click();
    assert.equal(await mobile.locator('body').evaluate(el=>el.classList.contains('menu-open')),true);
    await mobile.locator('.sidebar .navitem[data-page="settings"]').click();
    assert.equal(await mobile.locator('#page-settings').isVisible(),true);
    await mobile.screenshot({path:path.join(shots,'mobile-settings.png'),fullPage:true});
    assert.deepEqual(errors,[], 'Browser JavaScript errors');
    console.log('Chromium desktop + mobile passed, 4 screenshots captured, no JS runtime errors.');
    await page.close(); await mobile.close();
  } finally {
    await browser.close();
  }
}
run().then(()=>server.close()).catch(err=>{console.error(err);server.close();process.exitCode=1});

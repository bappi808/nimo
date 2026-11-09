import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';

const port = 3227;
const base = 'http://127.0.0.1:' + port;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], {
  env: {...process.env, INQUIRY_FORM_ENABLED: 'false', NEXT_PUBLIC_SITE_LAUNCHED: 'false'},
  stdio:'inherit',
});
let browser;

async function assertFitsViewport(page, label) {
  const dimensions = await page.evaluate(() => ({
    viewport:window.innerWidth,
    scrollWidth:document.documentElement.scrollWidth,
  }));
  assert(dimensions.scrollWidth <= dimensions.viewport + 2,
    label + ' horizontal overflow ' + JSON.stringify(dimensions));
}

async function checkLoadedImages(page, label) {
  const broken = await page.locator('img').evaluateAll(items => items
    .filter(img => img.complete && img.naturalWidth === 0)
    .map(img => img.getAttribute('src')));
  assert.deepEqual(broken, [], label + ' has broken loaded images');
}

try {
  let started = false;
  for (let attempt=0; attempt<60; attempt++) {
    if (server.exitCode !== null) throw new Error('Next production server exited');
    try {
      const response = await fetch(base);
      if (response.ok) {started = true; break;}
    } catch {}
    await delay(400);
  }
  assert(started, 'Next production server never started');
  await mkdir('qa-screenshots', {recursive:true});
  browser = await chromium.launch({headless:true, args:['--no-sandbox']});

  for (const [label,width,height] of [['mobile',390,844],['tablet',768,1024],['desktop',1440,900]]) {
    const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));

    await page.goto(base, {waitUntil:'networkidle'});
    assert.equal(await page.locator('a.category-pill').count(),8, label + ' homepage must show eight categories');
    await assertFitsViewport(page, label + ' home');
    await checkLoadedImages(page, label + ' home');
    await page.screenshot({path:'qa-screenshots/home-' + label + '.png',fullPage:true});

    if (width <= 810) {
      const menu = page.locator('button.menu-toggle');
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'),'true', label + ' mobile menu failed to open');
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'),'false', label + ' mobile menu failed to close');
    }

    await page.locator('a.category-pill').filter({hasText:'Beverages'}).click();
    await page.waitForURL(/category=Beverages/);
    await page.locator('button[aria-pressed="true"]').filter({hasText:'Beverages'}).waitFor();
    assert.equal(await page.locator('a[class*="card"]').count(),1, label + ' Beverages filter should show one item');
    await assertFitsViewport(page, label + ' products');

    await page.goto(base + '/products/aromatic-rice-1kg', {waitUntil:'networkidle'});
    assert((await page.locator('h1').innerText()).includes('NIMO Aromatic Rice'));
    await checkLoadedImages(page, label + ' product detail');
    await assertFitsViewport(page, label + ' product detail');

    await page.goto(base + '/contact?product=NIMO%20Aromatic%20Rice', {waitUntil:'networkidle'});
    const selected = await page.locator('select[name="product"]').inputValue();
    assert.equal(selected,'NIMO Aromatic Rice',label + ' product inquiry preselection broken');
    await assertFitsViewport(page, label + ' contact');
    assert.deepEqual(pageErrors, [], label + ' runtime page errors');
    await page.screenshot({path:'qa-screenshots/contact-' + label + '.png',fullPage:true});
    console.log('PASS browser QA',label,'— category filter, menu, product details, contact prefill, responsive widths');
    await page.close();
  }
  console.log('ALL BROWSER QA TESTS PASSED');
} finally {
  if(browser)await browser.close();
  server.kill('SIGTERM');
}

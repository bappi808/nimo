import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';

const port = 3217;
const base = 'http://127.0.0.1:' + port;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], {
  cwd: process.cwd(),
  stdio:'inherit',
  env:{...process.env, NEXT_PUBLIC_SITE_LAUNCHED:'false', INQUIRY_FORM_ENABLED:'false'},
});

async function request(path, options) {
  const response = await fetch(base + path, {redirect:'manual', ...options});
  return response;
}

try {
  let available = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    if (server.exitCode !== null) throw new Error('Next.js server exited unexpectedly');
    try {
      const check = await request('/');
      if (check.ok) { available = true; break; }
    } catch { /* server not yet ready */ }
    await delay(350);
  }
  assert(available, 'Next.js production server did not start');

  const pages = ['/', '/products', '/products/aromatic-rice-1kg', '/about', '/export', '/contact', '/privacy', '/robots.txt', '/sitemap.xml'];
  for (const path of pages) {
    const response = await request(path);
    assert.equal(response.status, 200, path + ' must return 200');
    console.log('PASS', response.status, path);
  }

  const files = await readFile('data/products.js', 'utf8');
  const images = [...new Set([...files.matchAll(/image:\s*'([^']+\.webp)'/g)].map(match => match[1]))];
  assert.equal(images.length, 14, 'Expected 14 products');
  for (const file of images) {
    const response = await request('/products/cutouts/' + file);
    assert.equal(response.status, 200, 'Missing local asset ' + file);
    assert.match(response.headers.get('content-type') || '', /image\/webp/, file + ' content-type');
    const bytes = (await response.arrayBuffer()).byteLength;
    assert(bytes > 2000, 'Asset too small: ' + file);
  }
  console.log('PASS all 14 local official product photos');

  const robots = await (await request('/robots.txt')).text();
  assert.match(robots, /Disallow:\s*\//, 'Preview must not be indexed');
  const missing = await request('/this-route-does-not-exist');
  assert.equal(missing.status, 404);

  const inactiveInquiry = await request('/api/inquiry', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({}),
  });
  assert.equal(inactiveInquiry.status, 503, 'Unconfigured form must not pretend to accept inquiries');

  const homepage = await request('/');
  assert.equal(homepage.headers.get('x-content-type-options'), 'nosniff');
  console.log('PASS preview noindex, branded 404, disabled inquiry API and security header');
  console.log('ALL PRODUCTION SMOKE TESTS PASSED');
} finally {
  server.kill('SIGTERM');
}

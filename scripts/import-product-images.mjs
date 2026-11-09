/**
 * One-time image migration helper. Run BEFORE moving nimofood.com DNS.
 * Downloads only known product images from the owned official website.
 * Does not generate or alter the packaging. Verify quality before launch.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const source = 'https://www.nimofood.com/products/cutouts/';
const destination = path.join(root, 'public/products/cutouts');
const data = await fs.readFile(path.join(root, 'data/products.js'), 'utf8');
const filenames = [...new Set([...data.matchAll(/image:\s*'([^']+\.webp)'/g)].map(match => match[1]))];

if (filenames.length !== 14) {
  throw new Error('Expected 14 product images; refusing unexpected asset migration: ' + filenames.length);
}

await fs.mkdir(destination, {recursive:true});
const failures = [];
for (const filename of filenames) {
  const link = source + encodeURIComponent(filename);
  try {
    const response = await fetch(link, {
      redirect:'follow',
      signal:AbortSignal.timeout(20000),
      headers:{'User-Agent':'NIMO-Asset-Migration/1.0'},
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const body = Buffer.from(await response.arrayBuffer());
    if (body.length < 2000 || body.length > 4_000_000 ||
        body.toString('ascii',0,4) !== 'RIFF' || body.toString('ascii',8,12) !== 'WEBP') {
      throw new Error('Response is not a valid expected-sized WebP image');
    }
    await fs.writeFile(path.join(destination, filename), body);
    console.log('Saved', filename, body.length, 'bytes');
  } catch (error) {
    failures.push(filename + ': ' + error.message);
  }
}

if (failures.length) {
  console.error('Migration incomplete; do not change image base or domain:\n' + failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('All', filenames.length, 'genuine WebP files imported. Visually review before cutover.');
}

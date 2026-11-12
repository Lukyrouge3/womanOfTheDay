import { chromium } from 'playwright';
const [,, url='http://localhost:5173/', out='.impeccable/review'] = process.argv;
const b = await chromium.launch();
for (const [name, w, h] of [['mobile', 390, 844], ['desktop', 1440, 900]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: name==='mobile'?2:1, reducedMotion: 'reduce' });
  const errs = []; p.on('console', m => m.type()==='error' && errs.push(m.text())); p.on('pageerror', e => errs.push(String(e)));
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${out}/${name}-fold.png` });
  await p.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  const ow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(name, 'overflowX', ow, 'errors', errs);
  await p.close();
}
await b.close();

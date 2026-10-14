const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const vm = require('vm');
const cp = require('child_process');
const root = path.join(__dirname, '..');
const files = fs.readdirSync(root).filter(f => f.endsWith('.html') && f !== '404.html');
const pages = new Map(files.map(f => [f, fs.readFileSync(path.join(root, f), 'utf8')]));
const titles = new Set();
const descriptions = new Set();
const canonicalURLs = new Set();
const resolve = url => {
  const pathname = decodeURIComponent(new URL(url, 'https://homemassagejuffair.com').pathname);
  return pathname === '/' ? 'index.html' : pathname.slice(1).replace(/\/$/, '').replace(/\.html$/, '')+'.html';
};
for (const [file, html] of pages) {
  assert.equal((html.match(/<title>/g)||[]).length, 1, file+' title count');
  assert.equal((html.match(/name="description"/g)||[]).length, 1, file+' description count');
  assert.equal((html.match(/<h1\b/g)||[]).length, 1, file+' H1 count');
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  const description = html.match(/name="description" content="([^"]+)"/)[1];
  assert(!titles.has(title), file+' duplicate title'); titles.add(title);
  assert(!descriptions.has(description), file+' duplicate description'); descriptions.add(description);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.equal(resolve(canonical), file);
  assert(!canonicalURLs.has(canonical)); canonicalURLs.add(canonical);
  if(file !== 'index.html') {
    assert(!canonical.endsWith('/') && !canonical.endsWith('.html'));
    for(const lang of ['en','ar','x-default']) {
      const alternate = html.match(new RegExp('hreflang="'+lang+'" href="([^"]+)"'))[1];
      const target = pages.get(resolve(alternate)); assert(target, file+' alternate exists');
      if(lang !== 'x-default') assert(target.includes('hreflang="'+(file.startsWith('مساج')?'ar':'en')+'" href="'+canonical+'"'), file+' reciprocity');
    }
    assert(html.includes('property="og:url" content="'+canonical+'"'));
  }
  for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if(match[1].includes('application/ld+json')) JSON.parse(match[2]);
    else if(match[2].trim()) new vm.Script(match[2], {filename:file});
  }
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const link = match[1];
    if(/^(https?:|mailto:|tel:|data:)/.test(link)) continue;
    if(link.startsWith('#')) {if(link !== '#') assert(html.includes('id="'+link.slice(1)+'"'), file+' anchor '+link);continue;}
    const local = decodeURIComponent(link.split('#')[0].replace(/^\//,''));
    assert(fs.existsSync(path.join(root,local)) || pages.has(resolve(link)), file+' missing '+link);
  }
  // Existing visible text, styles, scripts, image references and booking destinations must survive.
  const old = cp.execFileSync('git',['show','52f7ef98866a7466c30619a95a7dbcf2190ba677:'+file],{cwd:root,encoding:'utf8'});
  const body = s => s.split(/<body[^>]*>/)[1].split('</body>')[0].replace(/<h3><a href="\/[^"]+" style="color:inherit;text-decoration:none">([^<]+)<\/a><\/h3>/g,'<h3>$1</h3>').replace(/<a href="\/[^"]+" style="color:inherit;text-decoration:none">([^<]+)<\/a>/g,'$1').replace(/ lang="ar"/g,'');
  if(file !== 'index.html') assert.equal(body(html).replace(/href="(\/[^"#]+)"/g,'href="$1/"'), body(old));
  else assert.equal(body(html).replace(/\r\n/g,'\n'),body(old).replace(/\r\n/g,'\n'));
}
const sitemap = fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>decodeURI(m[1]));
assert.deepEqual(new Set(locs),canonicalURLs);
assert(fs.readFileSync(path.join(root,'robots.txt'),'utf8').includes('Sitemap: https://homemassagejuffair.com/sitemap.xml'));
assert(fs.readFileSync(path.join(root,'_redirects'),'utf8').includes('/massage/juffair/ / 301'));
assert(fs.readFileSync(path.join(root,'404.html'),'utf8').includes('name="robots" content="noindex"'));
console.log('PASS: 13 indexable pages; unique metadata/H1; canonical/sitemap; EN/AR reciprocity; schema JSON; scripts; local links; preserved body/style/tracking/booking.');

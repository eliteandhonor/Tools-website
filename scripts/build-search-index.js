import {readFileSync, writeFileSync} from 'fs';
const lines = readFileSync('tools.csv','utf8').trim().split(/\r?\n/).slice(1);
const index = lines.map(line => {
  const [name,,desc] = JSON.parse(`[${line}]`);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  return {name, desc, url: `tools/${slug}/index.html`};
});
writeFileSync('search-index.json', JSON.stringify(index));

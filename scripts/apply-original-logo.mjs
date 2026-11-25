import fs from 'node:fs/promises';
let s=await fs.readFile('src.js','utf8');
s=s.replaceAll('<span>BLACK MERIDIAN</span><small>TALENT MANAGEMENT</small>','<span class="original-logo"><img src="/assets/black-meridian-original.png" width="1200" height="1200" alt="Black Meridian Talent Management"></span>');
s=s.replace('<div class="monogram" aria-hidden="true">B<span>M</span></div>','<div class="monogram original-monogram" aria-hidden="true"><img src="/assets/black-meridian-original.png" width="1200" height="1200" alt=""></div>');
s=s.replace('<span class="empty-symbol" aria-hidden="true">bm.</span>','<span class="original-monogram empty-symbol" aria-hidden="true"><img src="/assets/black-meridian-original.png" width="1200" height="1200" alt=""></span>');
await fs.writeFile('src.js',s);

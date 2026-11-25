import fs from 'node:fs/promises';
let src=await fs.readFile('src.js','utf8');
src=src.replace("import './style.css';","import './style.css';\nimport './editorial.css';");
src=src.replace("const txt=k=>esc(t[k]);",`const txt=k=>esc(t[k]);
const editorialImage=(name,key,extra='')=>\`<figure class="editorial-image \${extra}"><img src="/assets/\${name}.jpg" alt="" loading="lazy" decoding="async"><figcaption>\${txt(key)}</figcaption></figure>\`;
const photoSources=await fetch('/image-sources.json').then(r=>r.json());`);
src=src.replace('<div class="monogram" aria-hidden="true">B<span>M</span></div></section>','<div class="monogram" aria-hidden="true">B<span>M</span></div><div class="about-photography">${editorialImage(\'athletics\',\'sportTag\')}${editorialImage(\'on-set\',\'creatorTag\')}</div><p class="caption about-photo-note">${txt(\'imageNote\')}</p></section>');
src=src.replace('<div class="service-list">','<div class="services-body"><div class="service-photography">${editorialImage(\'boxing\',\'sport\')}${editorialImage(\'fashion\',\'creators\')}</div><div class="service-list">');
src=src.replace("join('')}</div></section>\n<section id=\"talents\"", "join('')}</div></div></section>\n<section id=\"talents\"");
src=src.replace('<section id="brands" class="brands section"><div class="brand-heading">','<section id="brands" class="brands section"><div class="brand-photography">${editorialImage(\'football\',\'sport\')}${editorialImage(\'production\',\'creators\')}</div><div class="brand-heading">');
src=src.replace("<p><a href=\"https://unsplash.com/license\">Unsplash License</a></p>","<p><a href=\"https://unsplash.com/license\">Unsplash License</a></p>");
// Append the individual source links after the existing credits, with DOM-safe text.
src=src.replace("function showDialog(html){document.querySelector('#dialog-content').innerHTML=html;", "function showDialog(html){document.querySelector('#dialog-content').innerHTML=html;if(html.includes('https://unsplash.com/license')){document.querySelector('#dialog-content').insertAdjacentHTML('beforeend',photoSources.map(p=>`<p><a href=\"${esc(p.url)}\" target=\"_blank\" rel=\"noopener\">${esc(p.author)} — ${esc(p.name)}</a></p>`).join(''));}");
await fs.writeFile('src.js',src);

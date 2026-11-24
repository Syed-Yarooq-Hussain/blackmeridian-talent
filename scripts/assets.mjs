import fs from 'node:fs/promises';
const items=[['sport','https://images.unsplash.com/photo-1715431900724-6bf15144ae0e'],['creator','https://images.unsplash.com/photo-1768766924783-5453669aa589']];
for(const [name,url] of items){const res=await fetch(url+'?auto=format&fit=crop&w=1600&q=85');if(!res.ok)throw Error(res.status);await fs.writeFile(`public/assets/${name}.jpg`,Buffer.from(await res.arrayBuffer()));console.log(name,'downloaded');}

import fs from 'node:fs/promises';
const items=[
['boxing','photo-1780476870797-6e9d05efbd9e','Diego Corona','0jCAWsE_qfA'],
['football','flagged/photo-1568105631375-d992b82a905b','Manuel Navarro','V4G9k-ev8q0'],
['athletics','photo-1744060204728-f68e434a3edf','Jorge Alberto Vega Barrera','1-nuy7fD3fw'],
['production','photo-1749163569134-b525276f367f','Kyle Loftus','Dw681UwPYOY'],
['fashion','photo-1783867174650-19e019926c68','Tri Vo','rL6dy49NXo0'],
['on-set','photo-1745860565625-c6f027b902b9','925 Studio','55YqOFU7r-I']
];
for(const [name,id] of items){const response=await fetch(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1500&q=82`);if(!response.ok)throw Error(name+' '+response.status);await fs.writeFile(`public/assets/${name}.jpg`,Buffer.from(await response.arrayBuffer()));console.log(name,'downloaded');}
await fs.writeFile('public/image-sources.json',JSON.stringify(items.map(([name,id,author,photo])=>({name,author,url:`https://unsplash.com/photos/${photo}`,license:'https://unsplash.com/license'})),null,2));

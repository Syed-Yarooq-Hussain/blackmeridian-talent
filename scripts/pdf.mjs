import fs from 'node:fs';
import {createRequire} from 'node:module';
process.getBuiltinModule ??= createRequire(import.meta.url);
import {createCanvas,DOMMatrix,ImageData,Path2D} from '@napi-rs/canvas';
Object.assign(globalThis,{DOMMatrix,ImageData,Path2D});
const {getDocument}=await import('pdfjs-dist/legacy/build/pdf.mjs');
const doc=await getDocument({data:new Uint8Array(fs.readFileSync('C:/Users/Admin/Downloads/Black_Meridian_Eierschalenweiss (1).pdf')),useSystemFonts:true}).promise;
for(let i=1;i<=doc.numPages;i++){const p=await doc.getPage(i);console.log(i,(await p.getTextContent()).items.map(x=>x.str).join(' '));const v=p.getViewport({scale:1});const c=createCanvas(v.width,v.height);await p.render({canvasContext:c.getContext('2d'),viewport:v}).promise;fs.writeFileSync(`brand-${i}.png`,c.toBuffer('image/png'));}

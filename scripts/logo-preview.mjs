import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
const qa=await fs.readFile('scripts/qa.mjs','utf8');
await fs.writeFile('scripts/qa.mjs',qa.replace("page.locator('main img').count()!==8","page.locator('main img').count()!==10").replace('Expected eight editorial photographs','Expected eight editorial photographs and two brand marks'));
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage();
for(const width of [1440,390,320]){await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:5174/');await page.locator('header .logo img').waitFor();await page.locator('header .logo img').evaluate(i=>i.decode());await page.screenshot({path:`artifacts/logo-header-${width}.png`});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+width);const box=await page.locator('header .logo').boundingBox();if(box.height<100)throw Error('Logo too small');if(width===390){await page.locator('.menu').click();await page.locator('nav.open').waitFor();await page.screenshot({path:'artifacts/logo-mobile-menu.png'});}await page.locator('footer').scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/logo-footer-${width}.png`});}
await browser.close();console.log('Original logo: desktop, mobile, narrow mobile and navigation passed.');

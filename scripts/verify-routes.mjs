import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const out = 'C:/Users/User/AppData/Local/Temp/nordic-shots'
fs.mkdirSync(out, { recursive: true })
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--disable-gpu', '--no-sandbox'],
})
const page = await browser.newPage()
const notes = []

async function visit(width, path, file) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })
  const response = await page.goto(`http://127.0.0.1:5173${path}`, { waitUntil: 'networkidle0' })
  await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' })
  const info = await page.evaluate(() => {
    const doc = document.documentElement
    const nordic = [...document.querySelectorAll('a')].filter((a) => (a.href || '').includes('nordicbtc.ae') && !a.href.includes('wp-content') && !a.href.includes('mailto'))
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent || '',
      overflow: doc.scrollWidth - doc.clientWidth,
      externalNordic: nordic.map((a) => a.getAttribute('href')).slice(0, 8),
    }
  })
  notes.push({ width, path, status: response?.status(), ...info })
  if (file) await page.screenshot({ path: `${out}/${file}.png` })
}

await visit(1440, '/', 'route-home')
await visit(1440, '/our-story', 'route-story')
await visit(1440, '/blog', 'route-blog')
await visit(1440, '/contact', 'route-contact')
await visit(1024, '/academy-courses', 'route-academy-1024')
await visit(768, '/academy-courses', 'route-academy-768')
await visit(430, '/contact', 'route-contact-430')
await visit(375, '/blog', 'route-blog-375')
await visit(1440, '/courses/beauty-therapy-diploma', 'route-diploma')
await visit(375, '/our-story', 'route-story-375')

await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://127.0.0.1:5173/blog', { waitUntil: 'networkidle0' })
await page.click('.media-card a')
await page.waitForSelector('article, .rich-text, h1')
const postUrl = page.url()
notes.push({ postUrl, postH1: await page.$eval('h1', (el) => el.textContent) })

await page.goto('http://127.0.0.1:5173/academy-courses', { waitUntil: 'networkidle0' })
await page.click('.accordion-item button[aria-expanded="false"]')
const expanded = await page.$eval('.accordion-item button[aria-expanded="true"]', (el) => el.textContent)
notes.push({ expanded: expanded.trim() })

await page.goto('http://127.0.0.1:5173/contact', { waitUntil: 'networkidle0' })
await page.click('#message button[type="submit"]')
const errors = await page.$$eval('#message .field-error', (nodes) => nodes.map((node) => node.textContent))
notes.push({ contactErrors: errors })

await page.setViewport({ width: 375, height: 812 })
await page.goto('http://127.0.0.1:5173/our-story', { waitUntil: 'networkidle0' })
await page.click('.burger')
await page.click('.mobile-nav a[href="/blog"]')
await page.waitForFunction(() => location.pathname === '/blog')
notes.push({ mobileBlog: page.url() })
await page.screenshot({ path: `${out}/route-mobile-blog.png` })

const iframe = await page.goto('http://127.0.0.1:5173/courses/beauty-therapy-diploma', { waitUntil: 'networkidle0' })
const hasVideo = await page.$('iframe')
notes.push({ diplomaStatus: iframe?.status(), hasVideo: Boolean(hasVideo) })

fs.writeFileSync(`${out}/routes.json`, JSON.stringify(notes, null, 2))
await browser.close()
console.log('ok')

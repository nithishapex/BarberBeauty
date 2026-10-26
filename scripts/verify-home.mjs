import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--disable-gpu', '--mute-audio'],
})
const page = await browser.newPage()
const errors = []
page.on('pageerror', (error) => errors.push(String(error)))
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' })
await page.waitForSelector('h1')

const home = await page.evaluate(() => ({
  title: document.title,
  h1: document.querySelector('h1')?.textContent,
  video: Boolean(document.querySelector('video source')),
  courses: [...document.querySelectorAll('.course-pick')].map((link) => link.textContent.trim()),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
}))

await page.hover('.academy-trigger')
await page.waitForSelector('.mega:not([hidden])', { timeout: 3000 })
const link = await page.$('.mega a[href="/courses/barbering"]')
const box = await link.boundingBox()
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
await new Promise((resolve) => setTimeout(resolve, 400))
const stillOpen = await page.$('.mega:not([hidden])')
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
await page.waitForFunction(() => location.pathname === '/courses/barbering')

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' })
await page.click('.academy-trigger a')
await page.waitForFunction(() => location.pathname === '/academy-courses')

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' })
await page.click('.chevron-btn')
const openedByClick = await page.$eval('.chevron-btn', (button) => button.getAttribute('aria-expanded'))
await page.click('.chevron-btn')
const closedByClick = await page.$eval('.chevron-btn', (button) => button.getAttribute('aria-expanded'))

const shots = 'C:/Users/User/AppData/Local/Temp/nordic-shots'
fs.mkdirSync(shots, { recursive: true })
await page.setViewport({ width: 1440, height: 1100 })
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' })
await new Promise((resolve) => setTimeout(resolve, 800))
await page.screenshot({ path: `${shots}/home-1440.png` })
await page.setViewport({ width: 375, height: 800 })
await new Promise((resolve) => setTimeout(resolve, 300))
const mobile = await page.evaluate(() => ({
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  h1: document.querySelector('h1')?.textContent,
}))
await page.screenshot({ path: `${shots}/home-375.png` })

console.log(JSON.stringify({ home, stillOpen: Boolean(stillOpen), openedByClick, closedByClick, mobile, errors }, null, 2))
await browser.close()

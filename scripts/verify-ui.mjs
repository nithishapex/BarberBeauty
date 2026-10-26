import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const shots = 'C:/Users/User/AppData/Local/Temp/nordic-shots'
fs.mkdirSync(shots, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--disable-gpu', '--mute-audio'],
})
const page = await browser.newPage()
const errors = []
page.on('pageerror', (error) => errors.push(String(error)))

async function audit(width, path, name) {
  await page.setViewport({ width, height: 900 })
  const response = await page.goto(`http://127.0.0.1:5173${path}`, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('h1')
  const data = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent?.trim(),
    forms: document.querySelectorAll('form.enquiry-form').length,
    leaveLinks: [...document.querySelectorAll('a')].filter((a) => a.textContent.trim() === 'Leave request').map((a) => a.getAttribute('href')),
    cards: document.querySelectorAll('.card-header').length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }))
  await page.screenshot({ path: `${shots}/${name}.png` })
  return { width, path, status: response.status(), ...data }
}

const results = []
for (const width of [1440, 1024, 768, 430, 375]) {
  results.push(await audit(width, '/blog', `blog-${width}`))
}
results.push(await audit(1440, '/courses/beauty-therapy-diploma', 'course-ui'))
results.push(await audit(375, '/courses/barbering', 'barber-375'))
results.push(await audit(768, '/academy-courses', 'academy-768'))
results.push(await audit(430, '/contact', 'contact-430'))
results.push(await audit(1440, '/', 'home-ui'))

console.log(JSON.stringify({ results, errors }, null, 2))
await browser.close()

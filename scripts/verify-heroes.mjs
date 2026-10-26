import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const shots = 'C:/Users/User/AppData/Local/Temp/nordic-shots'
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--disable-gpu', '--mute-audio'],
})
const page = await browser.newPage()
const errors = []
page.on('pageerror', (error) => errors.push(String(error)))

async function shot(width, path, name) {
  await page.setViewport({ width, height: 900 })
  await page.goto(`http://127.0.0.1:5173${path}`, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('h1')
  const data = await page.evaluate(() => {
    const hero = document.querySelector('.page-hero')
    const card = document.querySelector('.page-hero-card')
    const img = document.querySelector('.page-hero-media img')
    const home = document.querySelector('.home-hero')
    const style = card ? getComputedStyle(card) : null
    const title = document.querySelector('.page-hero h1, .home-hero h1')
    return {
      h1: document.querySelector('h1')?.textContent?.trim().slice(0, 80),
      variant: hero?.className || (home ? 'home-hero' : 'none'),
      hasImage: Boolean(img),
      imageHeight: img ? Math.round(img.getBoundingClientRect().height) : 0,
      radius: style?.borderRadius || '',
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      titleSize: title ? getComputedStyle(title).fontSize : '',
      titleColor: title ? getComputedStyle(title).color : '',
    }
  })
  await page.screenshot({ path: `${shots}/${name}.png` })
  return { width, path, ...data }
}

const pages = [
  [1440, '/blog', 'hero-blog-1440'],
  [1024, '/blog', 'hero-blog-1024'],
  [768, '/our-story', 'hero-story-768'],
  [430, '/contact', 'hero-contact-430'],
  [375, '/academy-courses', 'hero-academy-375'],
  [1440, '/our-story', 'hero-story-1440'],
  [1440, '/contact', 'hero-contact-1440'],
  [1440, '/courses/barbering', 'hero-barber-1440'],
  [375, '/courses/barbering', 'hero-barber-375'],
  [1024, '/courses/cosmetic-medical-chemical-peeling-skincare-course', 'hero-long-1024'],
  [375, '/blog/everything-you-need-to-know-before-signing-up-for-a-beauty-therapist-course', 'hero-article-375'],
  [1440, '/', 'home-after-hero'],
  [375, '/', 'home-after-375'],
]
const results = []
for (const item of pages) results.push(await shot(...item))

const homeStyles = await page.evaluate(() => {
  const pick = (selector, props) => {
    const node = document.querySelector(selector)
    if (!node) return null
    const style = getComputedStyle(node)
    return Object.fromEntries(props.map((prop) => [prop, style[prop]]))
  }
  return {
    body: pick('body', ['backgroundColor', 'fontFamily', 'color']),
    header: pick('.site-header', ['backgroundColor', 'boxShadow', 'height']),
    hero: pick('.home-hero h1', ['fontSize', 'color', 'fontWeight']),
    panel: pick('.purple-panel', ['borderRadius', 'backgroundImage']),
  }
})

console.log(JSON.stringify({ results, homeStyles, errors }, null, 2))
await browser.close()

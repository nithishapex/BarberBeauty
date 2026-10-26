import fs from 'node:fs'
import path from 'node:path'

const html = fs.readFileSync(path.join(process.env.TEMP, 'nordic-pages/academy.html'), 'utf8')
const titles = [...html.matchAll(/elementor-tab-title[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/g)].map((match) =>
  match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
)
console.log('TITLES')
console.log(titles.join('\n'))
const hrefs = [...html.matchAll(/href="(\/courses\/[^"]+)"/g)].map((match) => match[1])
console.log('HREFS')
console.log([...new Set(hrefs)].join('\n'))

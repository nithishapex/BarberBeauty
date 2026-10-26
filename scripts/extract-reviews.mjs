import fs from 'node:fs'

const html = fs.readFileSync(`${process.env.TEMP}/nordic-pages/home.html`, 'utf8')
const start = html.indexOf('ti-reviews-container-wrapper')
const chunk = html.slice(start, start + 200000)
const pattern =
  /<!-- R-CONTENT -->([\s\S]*?)<!-- R-CONTENT -->[\s\S]*?<div class="ti-name">\s*([^<]+?)\s*<\/div>\s*<div class="ti-date">([^<]+)<\/div>/g
const reviews = [...chunk.matchAll(pattern)].map((match) => ({
  name: match[2].trim(),
  date: match[3].trim(),
  text: match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
}))
fs.writeFileSync('src/data/reviews.json', JSON.stringify(reviews, null, 2))
console.log(reviews.length)
for (const review of reviews) {
  console.log(`${review.date} | ${review.name} | ${review.text.slice(0, 90)}`)
}

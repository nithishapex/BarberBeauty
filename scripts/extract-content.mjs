import fs from 'node:fs'
import path from 'node:path'

const temp = process.env.TEMP
const courses = JSON.parse(fs.readFileSync(path.join(temp, 'nordic-pages/courses.json'), 'utf8'))
const posts = JSON.parse(fs.readFileSync(path.join(temp, 'nordic-pages/posts1.json'), 'utf8'))

function textOf(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function firstImg(html) {
  const match = html.match(/src="([^"]+)"/)
  return match ? match[1] : ''
}

console.log('COURSES', courses.length)
for (const course of courses) {
  const html = course.content.rendered
  console.log(
    `${course.slug} | ${textOf(course.title.rendered)} | ${textOf(html).length} | ${firstImg(html).slice(0, 90)}`,
  )
}

console.log('POSTS', posts.length)
for (const post of posts) {
  const html = post.content.rendered
  console.log(`${post.date.slice(0, 10)} | ${post.slug} | ${textOf(html).length} | ${firstImg(html).slice(0, 90)}`)
}

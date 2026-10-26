import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const temp = path.join(process.env.TEMP, 'nordic-pages')
const imageDir = path.join(root, 'public', 'images', 'library')
fs.mkdirSync(imageDir, { recursive: true })

const coursesRaw = JSON.parse(fs.readFileSync(path.join(temp, 'courses.json'), 'utf8'))
const postsRaw = JSON.parse(fs.readFileSync(path.join(temp, 'posts1.json'), 'utf8'))
const courseMedia = JSON.parse(fs.readFileSync(path.join(temp, 'course-media.json'), 'utf8'))
const postMedia = JSON.parse(fs.readFileSync(path.join(temp, 'post-media.json'), 'utf8'))

const mediaIds = [
  ...new Set(
    [...courseMedia, ...postMedia].map((item) => item.featured_media).filter(Boolean),
  ),
]

const mediaMap = {}
for (const id of mediaIds) {
  const response = await fetch(
    `https://www.nordicbtc.ae/wp-json/wp/v2/media/${id}?_fields=id,source_url,alt_text`,
  )
  if (!response.ok) {
    console.warn('media fail', id, response.status)
    continue
  }
  const media = await response.json()
  mediaMap[id] = media
  console.log('media', id)
}

const downloaded = new Map()

function fileNameFromUrl(url) {
  const clean = url.split('?')[0]
  const base = path.basename(clean).replace(/[^a-zA-Z0-9._-]/g, '-')
  return base || 'image.jpg'
}

async function localImage(url) {
  if (!url || url.includes('youtube.com') || url.includes('youtu.be')) return url
  if (downloaded.has(url)) return downloaded.get(url)
  const name = fileNameFromUrl(url)
  const dest = path.join(imageDir, name)
  const publicPath = `/images/library/${name}`
  if (!fs.existsSync(dest)) {
    const response = await fetch(url)
    if (!response.ok) {
      console.warn('image fail', response.status, url)
      downloaded.set(url, url)
      return url
    }
    const buffer = Buffer.from(await response.arrayBuffer())
    fs.writeFileSync(dest, buffer)
    console.log('saved', name, buffer.length)
  }
  downloaded.set(url, publicPath)
  return publicPath
}

function decode(text) {
  return text
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8216;/g, '‘')
    .replace(/<[^>]+>/g, '')
    .trim()
}

function localHref(href) {
  if (!href) return href
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return href
  let url = href
  if (url.startsWith('/')) url = `https://www.nordicbtc.ae${url}`
  try {
    const parsed = new URL(url)
    if (!parsed.hostname.endsWith('nordicbtc.ae')) return href
    const parts = parsed.pathname.replace(/\/+$/, '').split('/').filter(Boolean)
    if (parts[0] === 'courses' && parts[1]) return `/courses/${parts[1]}`
    if (parts[0] === 'our-story') return '/our-story'
    if (parts[0] === 'contact-us') return '/contact'
    if (parts[0] === 'courses-archive') return '/academy-courses'
    if (parts[0] === 'blog') return '/blog'
    if (parts[0] === 'category') return '/blog'
    if (parts.length === 1) return `/blog/${parts[0]}`
    if (parts.length === 0) return '/courses/barbering'
    return href
  } catch {
    return href
  }
}

async function sanitize(html) {
  let output = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\sstyle="[^"]*"/gi, '')
  const images = [...output.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/gi)]
  for (const match of images) {
    const src = match[1]
    const local = await localImage(src)
    output = output.replaceAll(src, local)
  }
  output = output.replace(/href="([^"]+)"/g, (_, href) => `href="${localHref(href)}"`)
  output = output.replace(/<iframe\b([^>]*)>/gi, (tag, attrs) => {
    const src = (attrs.match(/src="([^"]+)"/) || [])[1] || ''
    if (!/youtube\.com|youtu\.be|vimeo\.com/.test(src)) return ''
    return `<iframe src="${src}" title="Course video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  })
  return output.trim()
}

function excerptText(html) {
  const text = decode(html)
  return text.length > 180 ? `${text.slice(0, 177).trim()}...` : text
}

const courseMediaBySlug = Object.fromEntries(courseMedia.map((item) => [item.slug, item.featured_media]))
const postMediaBySlug = Object.fromEntries(postMedia.map((item) => [item.slug, item]))

const courses = []
for (const course of coursesRaw) {
  const title = decode(course.title.rendered)
  const media = mediaMap[courseMediaBySlug[course.slug]]
  const image = media ? await localImage(media.source_url) : ''
  const imageAlt = media?.alt_text || title
  courses.push({
    slug: course.slug,
    title,
    image,
    imageAlt,
    excerpt: excerptText(course.excerpt?.rendered || course.content.rendered),
    html: await sanitize(course.content.rendered),
  })
}

const posts = []
for (const post of postsRaw) {
  const title = decode(post.title.rendered)
  const mediaId = postMediaBySlug[post.slug]?.featured_media
  const media = mediaMap[mediaId]
  const image = media ? await localImage(media.source_url) : ''
  posts.push({
    slug: post.slug,
    title,
    date: post.date.slice(0, 10),
    category: 'Uncategorized',
    image,
    imageAlt: media?.alt_text || title,
    excerpt: excerptText(post.excerpt.rendered),
    html: await sanitize(post.content.rendered),
  })
}

const extraImages = {
  story: 'https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-1-1.jpg',
  beautyCard: 'https://www.nordicbtc.ae/wp-content/uploads/2021/09/bEAUTY.jpg',
  hairStyling: 'https://www.nordicbtc.ae/wp-content/uploads/2022/02/Hair-Styling.jpg',
  hairCutting: 'https://www.nordicbtc.ae/wp-content/uploads/2022/02/Hair-Cutting.jpg',
  hairColor: 'https://www.nordicbtc.ae/wp-content/uploads/2022/02/Hair-Color.jpg',
}
const extras = {}
for (const [key, url] of Object.entries(extraImages)) extras[key] = await localImage(url)

const payload = { courses, posts, extras }
const dest = path.join(root, 'src', 'data', 'library.js')
fs.writeFileSync(dest, `export const library = ${JSON.stringify(payload, null, 2)}\n`)
console.log('wrote', dest, 'courses', courses.length, 'posts', posts.length)

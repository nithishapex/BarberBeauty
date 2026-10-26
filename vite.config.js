import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repository = 'BarberBeauty'
const pages = process.env.GITHUB_PAGES === 'true'
const base = pages ? `/${repository}/` : '/'

function prefixPublicImages() {
  return {
    name: 'prefix-public-images',
    enforce: 'pre',
    transform(code, id) {
      if (!pages || id.includes('node_modules') || !/\.(jsx?|css)$/.test(id)) return null
      if (!code.includes('/images/')) return null
      const next = code
        .replaceAll('href="/', `href="${base}`)
        .replaceAll("href='/", `href='${base}`)
        .replaceAll('href=\\"/', `href=\\"${base}`)
        .replaceAll('"/images/', `"${base}images/`)
        .replaceAll("'/images/", `'${base}images/`)
        .replaceAll('`/images/', `\`${base}images/`)
      return next === code ? null : { code: next, map: null }
    },
  }
}

export default defineConfig({
  base,
  plugins: [prefixPublicImages(), react()],
})

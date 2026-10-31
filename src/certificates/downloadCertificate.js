import { certificateFileName } from '../data/certificates'
import { renderCertificateBlob } from './renderCertificate'

const PAGE_WIDTH = 842

function saveBlob(blob, fileName) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function concatBytes(chunks) {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  const output = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    output.set(chunk, offset)
    offset += chunk.length
  }
  return output
}

async function deflateBytes(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

function pdfFromImage(imageBytes, width, height) {
  const pageHeight = Math.round((PAGE_WIDTH * height) / width)
  const encoder = new TextEncoder()
  const chunks = []
  const offsets = [0]

  function add(value) {
    chunks.push(typeof value === 'string' ? encoder.encode(value) : value)
  }

  function startObject() {
    offsets.push(chunks.reduce((sum, chunk) => sum + chunk.length, 0))
  }

  add('%PDF-1.4\n')
  startObject()
  add('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')
  startObject()
  add('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n')
  startObject()
  add(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${pageHeight}] /Contents 4 0 R /Resources << /XObject << /Im0 5 0 R >> >> >>\nendobj\n`,
  )
  const content = `q\n${PAGE_WIDTH} 0 0 ${pageHeight} 0 0 cm\n/Im0 Do\nQ\n`
  startObject()
  add(`4 0 obj\n<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`)
  startObject()
  add(
    `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${imageBytes.length} >>\nstream\n`,
  )
  add(imageBytes)
  add('\nendstream\nendobj\n')

  const xref = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  add('xref\n')
  add(`0 ${offsets.length}\n`)
  add('0000000000 65535 f \n')
  for (let index = 1; index < offsets.length; index += 1) {
    add(`${String(offsets[index]).padStart(10, '0')} 00000 n \n`)
  }
  add(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`)
  return concatBytes(chunks)
}

async function certificatePdfBlob(pngBlob) {
  const bitmap = await createImageBitmap(pngBlob)
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const context = canvas.getContext('2d', { willReadFrequently: true })
  context.drawImage(bitmap, 0, 0)
  const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height)
  bitmap.close()

  const rgb = new Uint8Array(width * height * 3)
  for (let source = 0, target = 0; source < data.length; source += 4, target += 3) {
    rgb[target] = data[source]
    rgb[target + 1] = data[source + 1]
    rgb[target + 2] = data[source + 2]
  }

  const image = await deflateBytes(rgb)
  return new Blob([pdfFromImage(image, width, height)], { type: 'application/pdf' })
}

export async function downloadCertificate(certificate) {
  const artwork = await renderCertificateBlob(certificate)
  const pdf = await certificatePdfBlob(artwork)
  saveBlob(pdf, certificateFileName(certificate))
}

import QRCode from 'qrcode'
import { certificateVerifyUrl } from '../data/certificates'

const OUTPUT_SCALE = 2

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('unavailable'))
    image.src = src
  })
}

async function fetchArtwork(certificate) {
  const response = await fetch(certificate.certificateImage)
  if (!response.ok) throw new Error('unavailable')
  return response.blob()
}

function drawCover(context, image, x, y, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  const sourceWidth = width / scale
  const sourceHeight = height / scale
  const sourceX = (image.naturalWidth - sourceWidth) / 2
  const sourceY = Math.max(0, (image.naturalHeight - sourceHeight) * 0.12)
  context.save()
  context.beginPath()
  context.rect(x, y, width, height)
  context.clip()
  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height)
  context.restore()
}

export async function renderCertificateBlob(certificate) {
  const artworkBlob = await fetchArtwork(certificate)
  const artworkUrl = URL.createObjectURL(artworkBlob)
  try {
    const artwork = await loadImage(artworkUrl)
    const canvas = document.createElement('canvas')
    canvas.width = artwork.naturalWidth * OUTPUT_SCALE
    canvas.height = artwork.naturalHeight * OUTPUT_SCALE
    const context = canvas.getContext('2d')
    if (!context) throw new Error('unavailable')
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'
    context.drawImage(artwork, 0, 0, canvas.width, canvas.height)

    if (certificate.photo && certificate.portrait) {
      try {
        const photo = await loadImage(encodeURI(certificate.photo))
        const { x, y, width, height } = certificate.portrait
        drawCover(
          context,
          photo,
          Math.round(x * OUTPUT_SCALE),
          Math.round(y * OUTPUT_SCALE),
          Math.round(width * OUTPUT_SCALE),
          Math.round(height * OUTPUT_SCALE),
        )
      } catch {
        // Keep the printed placeholder when the student photo cannot be loaded.
      }
    }

    const { x, y, size } = certificate.qr
    const qrX = Math.round(x * OUTPUT_SCALE)
    const qrY = Math.round(y * OUTPUT_SCALE)
    const qrSize = Math.round(size * OUTPUT_SCALE)
    context.fillStyle = '#ffffff'
    context.fillRect(qrX, qrY, qrSize, qrSize)

    const qrCanvas = document.createElement('canvas')
    await QRCode.toCanvas(qrCanvas, certificateVerifyUrl(certificate.id), {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: qrSize,
      color: { dark: '#000000', light: '#ffffff' },
    })
    context.imageSmoothingEnabled = false
    context.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize)

    const stamped = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!stamped) throw new Error('unavailable')
    return stamped
  } catch {
    return artworkBlob
  } finally {
    URL.revokeObjectURL(artworkUrl)
  }
}

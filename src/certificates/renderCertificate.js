import QRCode from 'qrcode'
import { certificateVerifyUrl } from '../data/certificates'

const OUTPUT_SCALE = 4

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

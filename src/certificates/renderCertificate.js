import QRCode from 'qrcode'
import { certificateVerifyUrl } from '../data/certificates'

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
    canvas.width = artwork.naturalWidth
    canvas.height = artwork.naturalHeight
    const context = canvas.getContext('2d')
    if (!context) throw new Error('unavailable')
    context.drawImage(artwork, 0, 0)

    const { x, y, size } = certificate.qr
    context.fillStyle = '#ffffff'
    context.fillRect(x, y, size, size)
    const qrUrl = await QRCode.toDataURL(certificateVerifyUrl(certificate.id), {
      errorCorrectionLevel: 'L',
      margin: 0,
      width: size,
      color: { dark: '#111820', light: '#ffffff' },
    })
    const qr = await loadImage(qrUrl)
    context.drawImage(qr, x, y, size, size)

    const stamped = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!stamped) throw new Error('unavailable')
    return stamped
  } catch {
    return artworkBlob
  } finally {
    URL.revokeObjectURL(artworkUrl)
  }
}

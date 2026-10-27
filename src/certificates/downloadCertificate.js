import { certificateFileName } from '../data/certificates'
import { renderCertificateBlob } from './renderCertificate'

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

export async function downloadCertificate(certificate) {
  const blob = await renderCertificateBlob(certificate)
  saveBlob(blob, certificateFileName(certificate))
}

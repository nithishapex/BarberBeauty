import { useEffect, useState } from 'react'
import { renderCertificateBlob } from './renderCertificate'

export function useCertificateImage(certificate) {
  const [src, setSrc] = useState(certificate.certificateImage)

  useEffect(() => {
    let active = true
    let objectUrl = ''
    renderCertificateBlob(certificate)
      .then((blob) => {
        if (!active) return
        objectUrl = URL.createObjectURL(blob)
        setSrc(objectUrl)
      })
      .catch(() => {})
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [certificate])

  return src
}

import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CertificatePanel from '../components/CertificatePanel'
import { findCertificate } from '../data/certificates'
import '../certificates.css'

export default function CertificateVerifyPage() {
  const { certificateId } = useParams()
  const certificate = findCertificate(certificateId)

  useEffect(() => {
    document.title = certificate
      ? `${certificate.id} | Crownora Barber Academy`
      : 'Certificate not found | Crownora Barber Academy'
  }, [certificate])

  if (!certificate) {
    return (
      <div className="cert-page">
        <div className="wrap cert-missing">
          <p className="cert-kicker">Certificate verification</p>
          <h1>Certificate not found</h1>
          <p>Certificate not found. Please check the Certificate ID and try again.</p>
          {certificateId ? (
            <p>
              Requested ID: <strong>{certificateId}</strong>
            </p>
          ) : null}
          <p>
            <Link className="cert-back" to="/certificates/access">
              Back
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="cert-page">
      <div className="wrap">
        <Link className="cert-back" to="/certificates/access">
          Back
        </Link>
        <CertificatePanel certificate={certificate} />
      </div>
    </div>
  )
}

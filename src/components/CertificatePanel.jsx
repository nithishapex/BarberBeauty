import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  certificateAltText,
  certificateFileName,
  certificateReviewPath,
  formatIssueDate,
  statusLabel,
} from '../data/certificates'
import { downloadCertificate } from '../certificates/downloadCertificate'
import { useCertificateImage } from '../certificates/useCertificateImage'
export default function CertificatePanel({ certificate }) {
  const [downloadError, setDownloadError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const imageSrc = useCertificateImage(certificate)

  async function onDownload() {
    setDownloadError('')
    setDownloading(true)
    try {
      await downloadCertificate(certificate)
    } catch {
      setDownloadError('The certificate could not be downloaded.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <>
      <div className="cert-layout">
        <div>
          {imageError ? (
            <p className="cert-preview cert-muted">Certificate image unavailable.</p>
          ) : (
            <div className="cert-preview">
              <img
                src={imageSrc}
                width={certificate.imageWidth}
                height={certificate.imageHeight}
                alt={certificateAltText(certificate)}
                onError={() => setImageError(true)}
              />
            </div>
          )}
        </div>
        <div className="cert-facts">
          {certificate.status === 'valid' ? <p className="cert-badge">Verified certificate</p> : null}
          <h1>{certificate.studentName}</h1>
          <dl>
            <div>
              <dt>Certificate ID</dt>
              <dd>{certificate.id}</dd>
            </div>
            <div>
              <dt>Nationality</dt>
              <dd>{certificate.nationality}</dd>
            </div>
            <div>
              <dt>Date of birth</dt>
              <dd>{certificate.dateOfBirth}</dd>
            </div>
            <div>
              <dt>Passport No.</dt>
              <dd>{certificate.passportNumber}</dd>
            </div>
            <div>
              <dt>Academy</dt>
              <dd>
                {certificate.academyName}, {certificate.country}
              </dd>
            </div>
            <div>
              <dt>Issue date</dt>
              <dd>{formatIssueDate(certificate.issueDate)}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{statusLabel(certificate.status)}</dd>
            </div>
          </dl>
          <p>{certificate.summary}</p>
          {certificate.skills?.length ? (
            <div>
              <h2>Skills</h2>
              <ul className="cert-skills">
                {certificate.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="cert-actions">
            <button type="button" className="cert-btn cert-btn-gold" onClick={onDownload} disabled={downloading}>
              {downloading ? 'Preparing PDF…' : 'Download PDF'}
            </button>
            {certificate.reviewEnabled ? (
              <Link className="cert-btn" to={certificateReviewPath(certificate.id)}>
                Write a Review
              </Link>
            ) : null}
          </div>
          {downloadError ? (
            <p className="cert-error" role="alert">
              {downloadError} Expected file: {certificateFileName(certificate)}.
            </p>
          ) : (
            <p className="cert-note">
              {/* The download is {certificateFileName(certificate)}. The QR code printed on the certificate opens this
              page. It does not open the private certificate area. */}
            </p>
          )}
        </div>
      </div>
      {/* <section className="cert-section" aria-labelledby="saved-reviews">
        <h2 id="saved-reviews">Reviews saved in this browser</h2>
        <p className="cert-note">
          Reviews are stored locally for this demo. They are not sent to a server, published for other visitors, or
          available on another device. A saved review is not an authenticated or verified review.
        </p>
        {reviews.length === 0 ? (
          <p className="cert-empty">No reviews saved in this browser for this certificate.</p>
        ) : (
          <div className="cert-reviews">
            {reviews.map((review) => (
              <article className="cert-review" key={review.id}>
                <p>
                  <span aria-hidden="true">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  <span className="sr-only">{review.rating} out of 5</span>
                </p>
                {review.title ? <h3>{review.title}</h3> : null}
                <p>{review.message}</p>
                <p className="cert-muted">Saved {new Date(review.createdAt).toLocaleString()}</p>
              </article>
            ))}
          </div>
        )}
      </section> */}
    </>
  )
}

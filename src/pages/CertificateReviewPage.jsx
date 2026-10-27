import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  certificateVerifyPath,
  findCertificate,
} from '../data/certificates'
import {
  REVIEW_MESSAGE_LIMIT,
  REVIEW_TITLE_LIMIT,
  saveReview,
  validateReview,
} from '../certificates/reviews'
import '../certificates.css'

export default function CertificateReviewPage() {
  const { certificateId } = useParams()
  const certificate = findCertificate(certificateId)
  const [rating, setRating] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [storageError, setStorageError] = useState('')
  const [saved, setSaved] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    document.title = certificate
      ? `Review ${certificate.id} | Crownora Barber Academy`
      : 'Certificate not found | Crownora Barber Academy'
  }, [certificate])

  if (!certificate) {
    return (
      <div className="cert-page">
        <div className="wrap cert-missing">
          <Link className="cert-back" to="/certificates/access">
            Access my certificates
          </Link>
          <h1>Certificate not found</h1>
          <p>Certificate not found. Please check the Certificate ID and try again.</p>
        </div>
      </div>
    )
  }

  function onSubmit(event) {
    event.preventDefault()
    if (submitting) return
    const result = validateReview({ rating, title, message })
    setErrors(result.errors)
    setStorageError('')
    if (Object.keys(result.errors).length > 0) return
    setSubmitting(true)

    const review = {
      id: crypto.randomUUID(),
      certificateId: certificate.id,
      studentName: certificate.studentName,
      courseName: certificate.courseName,
      rating: result.value.rating,
      title: result.value.title,
      message: result.value.message,
      createdAt: new Date().toISOString(),
    }

    try {
      saveReview(review)
      setSaved(review)
    } catch {
      setStorageError('This review could not be saved in this browser.')
      setSubmitting(false)
    }
  }

  return (
    <div className="cert-page">
      <div className="wrap">
        <Link className="cert-back" to={certificateVerifyPath(certificate.id)}>
          Back to certificate
        </Link>
        <header className="cert-header">
          <p className="cert-kicker">Course review</p>
          <h1>Write a review</h1>
          <p className="cert-lead">
            Reviews are stored locally in this demo. They stay in this browser, are not submitted to a central
            server, and are not published for other people. Writing a review does not verify that you are the
            student named on the certificate.
          </p>
        </header>

        {saved ? (
          <div className="cert-panel cert-success" role="status">
            <h2>Review saved on this browser</h2>
            <p>
              {`Your ${saved.rating}-star review for ${certificate.id} is saved locally and will appear on this certificate's details page when you open it here.`}
            </p>
            <div className="cert-actions">
              <Link className="cert-btn cert-btn-gold" to={certificateVerifyPath(certificate.id)}>
                View certificate
              </Link>
              <Link className="cert-btn cert-btn-ghost" to="/certificates/access">
                Access my certificates
              </Link>
            </div>
          </div>
        ) : (
          <form className="cert-form cert-panel" onSubmit={onSubmit} noValidate>
            <div>
              <label htmlFor="review-student">Student name</label>
              <input id="review-student" value={certificate.studentName} readOnly className="cert-readonly" />
            </div>
            <div>
              <label htmlFor="review-id">Certificate ID</label>
              <input id="review-id" value={certificate.id} readOnly className="cert-readonly" />
            </div>
            <div>
              <label htmlFor="review-course">Course name</label>
              <input id="review-course" value={certificate.courseName} readOnly className="cert-readonly" />
            </div>
            <fieldset className="cert-stars" aria-describedby={errors.rating ? 'rating-error' : undefined}>
              <legend>Rating</legend>
              <div className="cert-star-row">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="rating"
                      value={value}
                      checked={Number(rating) === value}
                      onChange={() => setRating(value)}
                    />
                    <span>
                      {value} {value === 1 ? 'star' : 'stars'}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            {errors.rating ? (
              <p id="rating-error" className="cert-error" role="alert">
                {errors.rating}
              </p>
            ) : null}
            <div>
              <label htmlFor="review-title">Review title</label>
              <input
                id="review-title"
                value={title}
                maxLength={REVIEW_TITLE_LIMIT}
                aria-invalid={errors.title ? 'true' : undefined}
                aria-describedby="title-help"
                onChange={(event) => setTitle(event.target.value)}
              />
              <p id="title-help" className="cert-counter">
                {title.trim().length}/{REVIEW_TITLE_LIMIT}
              </p>
              {errors.title ? (
                <p className="cert-error" role="alert">
                  {errors.title}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="review-message">Review message</label>
              <textarea
                id="review-message"
                value={message}
                maxLength={REVIEW_MESSAGE_LIMIT}
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby="message-help"
                onChange={(event) => setMessage(event.target.value)}
              />
              <p id="message-help" className="cert-counter">
                {message.trim().length}/{REVIEW_MESSAGE_LIMIT}
              </p>
              {errors.message ? (
                <p className="cert-error" role="alert">
                  {errors.message}
                </p>
              ) : null}
            </div>
            {storageError ? (
              <p className="cert-error" role="alert">
                {storageError}
              </p>
            ) : null}
            <div className="cert-actions">
              <button className="cert-btn cert-btn-gold" type="submit" disabled={submitting} aria-busy={submitting}>
                {submitting ? 'Saving review' : 'Submit Review'}
              </button>
              <Link className="cert-btn cert-btn-ghost" to={certificateVerifyPath(certificate.id)}>
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

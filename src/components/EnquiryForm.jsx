import { useEffect, useRef, useState } from 'react'
import { CONTACT } from '../data/site'

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

function validate(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Enter your name.'
  else if (name.length > 80) errors.name = 'Name should be 80 characters or fewer.'

  if (!email) errors.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'

  if (phone) {
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 7 || digits.length > 15) {
      errors.phone = 'Enter a valid phone number, or leave this field empty.'
    }
  }

  if (!subject) errors.subject = 'Enter a subject.'
  else if (subject.length > 140) errors.subject = 'Subject should be 140 characters or fewer.'

  if (!message) errors.message = 'Enter a message.'
  else if (message.length > 2000) errors.message = 'Message should be 2000 characters or fewer.'

  return errors
}

function enquiryText(values, lead) {
  return [
    lead,
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim() || 'Not provided'}`,
    `Subject: ${values.subject.trim()}`,
    '',
    values.message.trim(),
  ].join('\n')
}

function Field({ id, label, error, className, children }) {
  return (
    <div className={`field ${className || ''} ${error ? 'is-invalid' : ''}`.trim()}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default function EnquiryForm({
  id = 'enquiry',
  title = 'Leave Request',
  description = 'Leave your contact information and our manager will get back to you as soon as possible.',
  lead = 'Barbering Course enquiry',
}) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [ready, setReady] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const successRef = useRef(null)

  useEffect(() => {
    if (ready) successRef.current?.focus()
  }, [ready])

  function onChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }
    setCopied(false)
    setCopyFailed(false)
    setReady(true)
  }

  const text = enquiryText(values, lead)
  const mailHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(text)}`
  const whatsappHref = `https://wa.me/971569043232?text=${encodeURIComponent(text)}`

  async function copyDetails() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setCopyFailed(false)
    } catch {
      setCopied(false)
      setCopyFailed(true)
    }
  }

  return (
    <section className="page-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <div className="purple-panel enquiry-card">
          <div className="enquiry-grid">
            <div className="enquiry-intro">
              <h2 id={`${id}-title`}>{title}</h2>
              {description ? <p>{description}</p> : null}
            </div>

            {ready ? (
              <div className="enquiry-success" role="status">
                <h3 ref={successRef} tabIndex={-1}>
                  Your message is ready to send
                </h3>
                <p>
                  This page does not send enquiries to Nordic Beauty. Use email or WhatsApp to deliver the
                  message yourself.
                </p>
                <pre className="preview-box">{text}</pre>
                <div className="enquiry-actions">
                  <a className="btn btn-white" href={mailHref}>
                    Send by email
                  </a>
                  <a className="btn btn-ghost" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    Send on WhatsApp
                  </a>
                  <button type="button" className="btn btn-ghost" onClick={copyDetails}>
                    {copied ? 'Details copied' : 'Copy details'}
                  </button>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => {
                      setReady(false)
                      setCopied(false)
                      setCopyFailed(false)
                    }}
                  >
                    Edit message
                  </button>
                </div>
                {copyFailed ? (
                  <p className="field-error">Select the details above and copy them manually.</p>
                ) : null}
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={onSubmit} noValidate>
                {Object.keys(errors).length > 0 ? (
                  <p className="form-alert" role="alert">
                    Check the highlighted fields and try again.
                  </p>
                ) : null}
                <div className="form-grid">
                  <Field id="name" label="Name, required" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Name *"
                      required
                      aria-required="true"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      value={values.name}
                      onChange={onChange}
                    />
                  </Field>
                  <Field id="email" label="Email address, required" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="Email Address *"
                      required
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      value={values.email}
                      onChange={onChange}
                    />
                  </Field>
                  <Field id="phone" label="Phone, optional" error={errors.phone}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="Phone"
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      value={values.phone}
                      onChange={onChange}
                    />
                  </Field>
                  <Field id="subject" label="Subject, required" error={errors.subject}>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Subject"
                      required
                      aria-required="true"
                      aria-invalid={errors.subject ? 'true' : 'false'}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      value={values.subject}
                      onChange={onChange}
                    />
                  </Field>
                  <Field id="message" label="Message, required" error={errors.message} className="span-2">
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      placeholder="Message *"
                      required
                      aria-required="true"
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      value={values.message}
                      onChange={onChange}
                    />
                  </Field>
                </div>
                <div className="enquiry-actions">
                  <button type="submit" className="btn btn-white">
                    Send Message
                  </button>
                </div>
                <p className="form-note">
                  This page cannot deliver the form to Nordic Beauty. After you continue, you can send it by
                  email or WhatsApp.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

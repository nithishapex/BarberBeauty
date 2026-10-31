import { useEffect, useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticateStudent, certificatesForStudent, certificateVerifyPath } from '../data/certificates'
import '../certificates.css'

const INVALID =
  'Those details do not match a certificate. Check the Student ID and date of birth, then try again.'

export default function CertificateAccessPage() {
  const navigate = useNavigate()
  const studentField = useId()
  const codeField = useId()
  const [studentId, setStudentId] = useState('CBA-STU-2026-0001')
  const [accessCode, setAccessCode] = useState('1996-01-01')
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Access My Certificates | Crownora Barber Academy'
  }, [])

  function onSubmit(event) {
    event.preventDefault()
    const id = studentId.trim()
    const code = accessCode.trim()
    if (!id || !code) {
      setError('Enter both your Student ID and date of birth.')
      return
    }
    const student = authenticateStudent(id, code)
    if (!student) {
      setError(INVALID)
      return
    }
    const certificates = certificatesForStudent(student.studentId)
    if (certificates.length === 0) {
      setError('There is no certificate assigned to this student.')
      return
    }
    setError('')
    navigate(certificateVerifyPath(certificates[0].id))
  }

  return (
    <div className="cert-page">
      <div className="wrap cert-access">
        <p className="cert-kicker">Crownora Barber Academy</p>
        <h1>Access My Certificates</h1>
        <p className="cert-lead">Enter your Student ID and date of birth to view your certificate.</p>
        <p className="cert-note">The password for a certificate is the date of birth. Choose it from the calendar.</p>
        <form className="cert-panel cert-form" onSubmit={onSubmit} noValidate>
          <div>
            <label htmlFor={studentField}>Student ID</label>
            <input
              id={studentField}
              name="studentId"
              value={studentId}
              autoComplete="off"
              spellCheck="false"
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'access-error' : undefined}
              onChange={(event) => {
                setStudentId(event.target.value)
                if (error) setError('')
              }}
            />
          </div>
          <div>
            <label htmlFor={codeField}>Date of Birth</label>
            <input
              id={codeField}
              name="dateOfBirth"
              type="date"
              value={accessCode}
              autoComplete="bday"
              max="2015-12-31"
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'access-error' : undefined}
              onChange={(event) => {
                setAccessCode(event.target.value)
                if (error) setError('')
              }}
            />
          </div>
          {error ? (
            <p id="access-error" className="cert-error" role="alert">
              {error}
            </p>
          ) : null}
          <button className="cert-btn cert-btn-gold" type="submit">
            View Certificate
          </button>
        </form>
      </div>
    </div>
  )
}

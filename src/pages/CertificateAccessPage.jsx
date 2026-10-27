import { useEffect, useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticateStudent, certificatesForStudent, certificateVerifyPath } from '../data/certificates'
import '../certificates.css'

const INVALID = 'Those details do not match a student record. Check the Student ID and private access code, then try again.'

export default function CertificateAccessPage() {
  const navigate = useNavigate()
  const studentField = useId()
  const codeField = useId()
  const [studentId, setStudentId] = useState('CBA-STU-2026-00842')
  const [accessCode, setAccessCode] = useState('K7P9-X4M2')
  const [showCode, setShowCode] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Access My Certificates | Crownora Barber Academy'
  }, [])

  function onSubmit(event) {
    event.preventDefault()
    const id = studentId.trim()
    const code = accessCode.trim()
    if (!id || !code) {
      setError('Enter both your Student ID and private access code.')
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
        <p className="cert-lead">Enter your Student ID and private access code to view your certificates.</p>
        <p className="cert-note">
          This is simulated access for a static demo. It is not secure sign-in. The private access code is checked
          in this browser and is not saved after you continue. Anyone can read the demonstration codes in the page
          source.
        </p>
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
            <label htmlFor={codeField}>Private Access Code</label>
            <div className="cert-secret">
              <input
                id={codeField}
                name="accessCode"
                type={showCode ? 'text' : 'password'}
                value={accessCode}
                autoComplete="off"
                spellCheck="false"
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? 'access-error' : undefined}
                onChange={(event) => {
                  setAccessCode(event.target.value)
                  if (error) setError('')
                }}
              />
              <button
                type="button"
                className="cert-btn cert-btn-ghost"
                aria-pressed={showCode}
                onClick={() => setShowCode((current) => !current)}
              >
                {showCode ? 'Hide' : 'Show'}
              </button>
            </div>
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
        {/* <section className="cert-panel cert-demo" aria-labelledby="demo-access">
          <h2 id="demo-access">Demonstration credentials</h2>
          <p className="cert-note">Use one student at a time. Each login shows only that student's certificates.</p>
          <ul className="cert-demo-list">
            {STUDENTS.map((student) => (
              <li key={student.studentId}>
                <strong>{student.name}</strong>
                <span>Student ID {student.studentId}</span>
                <span>Access code {student.accessCode}</span>
              </li>
            ))}
          </ul>
          <p className="cert-note">
            Noor Ahmed has no certificates yet, so that login shows the empty state.{' '}
            <Link to="/certificates/verify/CBA-BC-2026-0148">QR verification</Link> opens one certificate without
            these codes.
          </p>
        </section> */}
      </div>
    </div>
  )
}

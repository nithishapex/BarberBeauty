/**
 * Certificate records for the static prototype.
 * A future backend can replace these lookups with authenticated accounts,
 * server-side verification, issuance, and revocation.
 * The certificate password is the student's date of birth. It lives only in
 * this module so the browser session does not keep it. This is not secure
 * authentication.
 */

export const STUDENTS = [
  {
    studentId: 'CBA-2026-368',
    name: 'FIROZ IDRISH',
    accessCode: '01011996',
    dateOfBirth: '01-01-1996',
    nationality: 'Pakistan',
    passportNumber: 'AL330777',
  },
  {
    studentId: 'CBA-2026-978',
    name: 'MOHD TANVEER MOHAMAD MEHTAB SALMANI',
    accessCode: '27102004',
    dateOfBirth: '27-10-2004',
    nationality: 'India',
    passportNumber: 'AL055177',
  },
  {
    studentId: 'CBA-2026-774',
    name: 'NAVEED AHMAD MUHAMMAD RASHEED RAJPUT',
    accessCode: '21111999',
    dateOfBirth: '21-11-1999',
    nationality: 'India',
    passportNumber: 'WL1178591',
  },
  {
    studentId: 'CBA-2026-324',
    name: 'NAVED ALI SIKANDER',
    accessCode: '12122000',
    dateOfBirth: '12-12-2000',
    nationality: 'India',
    passportNumber: 'AD843576',
  },
]

const HAIR_SKILLS = [
  'Hairstyling Techniques',
  'Styling Methods',
  'Modern Grooming',
  'Client Care & Consultation',
]

const HAIR_SUMMARY =
  'This course was conducted at Crownora Barber Academy, Pakistan and covers advanced hairstyling techniques, modern grooming and professional client care.'

const ART = { imageWidth: 1536, imageHeight: 1024 }
const PORTRAIT = { x: 1220, y: 401, width: 200, height: 235 }
const QR = { x: 1225, y: 703, size: 185 }

export const CERTIFICATES = [
  {
    id: 'CBA-2026-368',
    studentId: 'CBA-2026-368',
    studentName: 'FIROZ IDRISH',
    courseName: 'Hair Styling & Grooming Course',
    nationality: 'Pakistan',
    passportNumber: 'AL330777',
    dateOfBirth: '01-01-1996',
    issueDate: '2026-05-13',
    academyName: 'Crownora Barber Academy',
    country: 'Pakistan',
    certificateImage: '/images/certificates/new2/Firoz_Idrish_Certificate_HD.png',
    photo: '/images/certificates/photo/FIROZ IDRISH.jpg',
    ...ART,
    portrait: PORTRAIT,
    qr: QR,
    summary: HAIR_SUMMARY,
    skills: HAIR_SKILLS,
    status: 'valid',
    reviewEnabled: true,
  },
  {
    id: 'CBA-2026-978',
    studentId: 'CBA-2026-978',
    studentName: 'MOHD TANVEER MOHAMAD MEHTAB SALMANI',
    courseName: 'Hair Styling & Grooming Course',
    nationality: 'India',
    passportNumber: 'AL055177',
    dateOfBirth: '27-10-2004',
    issueDate: '2026-06-12',
    academyName: 'Crownora Barber Academy',
    country: 'Pakistan',
    certificateImage: '/images/certificates/new2/Mohd_Tanveer_Mohamad_Mehtab_Salmani_Certificate_HD.png',
    photo: '/images/certificates/photo/MOHD TANVEER MOHAMAD MEHTAB SALMANI.jpg',
    ...ART,
    portrait: PORTRAIT,
    qr: QR,
    summary: HAIR_SUMMARY,
    skills: HAIR_SKILLS,
    status: 'valid',
    reviewEnabled: true,
  },
  {
    id: 'CBA-2026-774',
    studentId: 'CBA-2026-774',
    studentName: 'NAVEED AHMAD MUHAMMAD RASHEED RAJPUT',
    courseName: 'Hair Styling & Grooming Course',
    nationality: 'India',
    passportNumber: 'WL1178591',
    dateOfBirth: '21-11-1999',
    issueDate: '2026-05-16',
    academyName: 'Crownora Barber Academy',
    country: 'Pakistan',
    certificateImage: '/images/certificates/new2/Naveed_Ahmad_Muhammad_Rasheed_Rajput_Certificate_HD.png',
    photo: '/images/certificates/photo/NAVEED AHMAD MUHAMMAD RASHEED RAJPUT.jpg',
    ...ART,
    portrait: PORTRAIT,
    qr: QR,
    summary: HAIR_SUMMARY,
    skills: HAIR_SKILLS,
    status: 'valid',
    reviewEnabled: true,
  },
  {
    id: 'CBA-2026-324',
    studentId: 'CBA-2026-324',
    studentName: 'NAVED ALI SIKANDER',
    courseName: 'Hair Styling & Grooming Course',
    nationality: 'India',
    passportNumber: 'AD843576',
    dateOfBirth: '12-12-2000',
    issueDate: '2026-10-27',
    academyName: 'Crownora Barber Academy',
    country: 'Pakistan',
    certificateImage: '/images/certificates/new2/Naved_Ali_Sikander_Certificate_HD.png',
    photo: '/images/certificates/photo/NAVED ALI SIKANDER.jpg',
    ...ART,
    portrait: PORTRAIT,
    qr: QR,
    summary: HAIR_SUMMARY,
    skills: HAIR_SKILLS,
    status: 'valid',
    reviewEnabled: true,
  },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function normalizeToken(value) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, '')
    .toUpperCase()
}

export function normalizeDateOfBirth(value) {
  const raw = String(value ?? '').trim()
  const parts = raw.split(/[^0-9]+/).filter(Boolean)
  if (parts.length === 3 && parts[0].length === 4) {
    return `${parts[2].padStart(2, '0')}${parts[1].padStart(2, '0')}${parts[0]}`
  }
  if (parts.length === 3 && parts[2].length === 4) {
    return `${parts[0].padStart(2, '0')}${parts[1].padStart(2, '0')}${parts[2]}`
  }
  const digits = raw.replace(/\D/g, '')
  return digits
}

export function normalizeCertificateId(value) {
  return normalizeToken(value)
}

export function findCertificate(value) {
  const id = normalizeCertificateId(value)
  if (!id) return null
  return CERTIFICATES.find((certificate) => certificate.id === id) ?? null
}

export function findStudent(studentId) {
  const id = normalizeToken(studentId)
  const student = STUDENTS.find((item) => item.studentId === id)
  if (!student) return null
  return { studentId: student.studentId, name: student.name }
}

export function authenticateStudent(studentId, accessCode) {
  const id = normalizeToken(studentId)
  const code = normalizeDateOfBirth(accessCode)
  if (!id || !code) return null
  const student = STUDENTS.find((item) => item.studentId === id && item.accessCode === code)
  if (!student) return null
  return { studentId: student.studentId, name: student.name }
}

export function certificatesForStudent(studentId) {
  const id = normalizeToken(studentId)
  return CERTIFICATES.filter((certificate) => certificate.studentId === id)
}

export function formatIssueDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '')
  if (!match) return iso || ''
  const month = MONTHS[Number(match[2]) - 1]
  if (!month) return iso
  return `${Number(match[3])} ${month} ${match[1]}`
}

export function statusLabel(status) {
  return status === 'valid' ? 'Valid' : status
}

export function certificateFileName(certificate) {
  const student = certificate.studentName.trim().replace(/\s+/g, '-')
  return `${certificate.id}-${student}.pdf`
}

export function certificateDetailsPath(id) {
  return `/certificates/${encodeURIComponent(id)}`
}

export function certificateVerifyPath(id) {
  return `/certificates/verify/${encodeURIComponent(id)}`
}

export function certificateReviewPath(id) {
  return `/certificates/review/${encodeURIComponent(id)}`
}

export function certificateVerifyUrl(id) {
  const configured = import.meta.env.VITE_SITE_URL
  const origin = String(configured || window.location.origin).replace(/\/$/, '')
  const base = String(import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return `${origin}${base}/certificates/verify/${encodeURIComponent(id)}`
}

export function certificateAltText(certificate) {
  return `Certificate for ${certificate.studentName}, ${certificate.courseName}, ${certificate.id}`
}

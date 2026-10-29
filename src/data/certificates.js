/**
 * Demo students and certificate records for the static prototype.
 * A future backend can replace these lookups with authenticated accounts,
 * server-side verification, issuance, and revocation.
 * Access codes live only in this module so the browser session does not
 * keep them. This is not secure authentication.
 */

export const STUDENTS = [
  {
    studentId: 'CBA-STU-2026-00842',
    name: 'Hassan Raza',
    accessCode: 'K7P9-X4M2',
  },
  {
    studentId: 'CBA-STU-2026-01933',
    name: 'Muhammad Ali',
    accessCode: 'Q8W3-N5T1',
  },
  {
    studentId: 'CBA-STU-2026-01408',
    name: 'Owais Khan',
    accessCode: 'B2H6-L9R4',
  },
  {
    studentId: 'CBA-STU-2026-00017',
    name: 'Noor Ahmed',
    accessCode: 'T3S8-E1M4',
  },
]

export const CERTIFICATES = [
  {
    id: 'CBA-BC-2026-0148',
    studentId: 'CBA-STU-2026-00842',
    studentName: 'Hassan Raza',
    courseName: 'Classic Barbering Course',
    issueDate: '2026-10-20',
    academyName: 'Crownora Barber Academy',
    country: 'Pakistan',
    certificateImage: '/images/certificates/barbering.png',
    imageWidth: 498,
    imageHeight: 658,
    qr: { x: 392, y: 518, size: 96 },
    summary:
      'This training program was conducted at Crownora Barber Academy, Pakistan and focuses on professional barbering techniques, men\'s grooming, hygiene and client care.',
    skills: [
      'Haircutting Techniques',
      'Clipper Skills',
      'Beard Grooming',
      'Shaving Techniques',
      'Hygiene & Safety Standards',
    ],
    status: 'valid',
    reviewEnabled: true,
  },
  {
    id: 'CBA-HS-2026-0275',
    studentId: 'CBA-STU-2026-01933',
    studentName: 'Muhammad Ali',
    courseName: 'Hair Styling & Grooming Course',
    issueDate: '2026-10-22',
    academyName: 'Crownora Barber Academy',
    country: 'Pakistan',
    certificateImage: '/images/certificates/hair-styling.png',
    imageWidth: 509,
    imageHeight: 323,
    qr: { x: 330, y: 206, size: 104 },
    summary:
      'This course was conducted at Crownora Barber Academy, Pakistan and covers advanced hairstyling techniques, modern grooming methods and professional client care.',
    skills: [
      'Hairstyling Techniques',
      'Styling Methods',
      'Modern Grooming',
      'Client Care & Consultation',
    ],
    status: 'valid',
    reviewEnabled: true,
  },
  {
    id: 'CBA-BE-2026-0361',
    studentId: 'CBA-STU-2026-01408',
    studentName: 'Owais Khan',
    courseName: "Beard & Men's Grooming Course",
    issueDate: '2026-10-25',
    academyName: 'Crownora Barber Academy',
    country: 'Pakistan',
    certificateImage: '/images/certificates/advanced-barbering.png',
    imageWidth: 509,
    imageHeight: 334,
    qr: { x: 388, y: 206, size: 108 },
    summary:
      'This course was conducted at Crownora Barber Academy, Pakistan and focuses on beard styling, facial grooming, skincare and professional client consultation.',
    skills: ['Beard Styling', 'Facial Grooming', 'Skincare Basics', 'Client Consultation'],
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
  const code = normalizeToken(accessCode)
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
  return `${certificate.id}-${student}.png`
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

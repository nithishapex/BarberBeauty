const SESSION_KEY = 'crownora.certificateSession.v1'

function storageAvailable() {
  try {
    return typeof sessionStorage !== 'undefined'
  } catch {
    return false
  }
}

export function readSession() {
  if (!storageAvailable()) return null
  try {
    const parsed = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')
    if (!parsed || typeof parsed.studentId !== 'string' || !parsed.studentId) return null
    return parsed.studentId
  } catch {
    return null
  }
}

export function startSession(studentId) {
  if (!storageAvailable()) throw new Error('storage-unavailable')
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ studentId }))
}

export function clearSession() {
  if (!storageAvailable()) return
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* Ignore blocked storage and continue to the access form. */
  }
}

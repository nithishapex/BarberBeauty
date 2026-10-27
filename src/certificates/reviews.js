export const REVIEW_TITLE_LIMIT = 80
export const REVIEW_MESSAGE_LIMIT = 800
const STORAGE_KEY = 'crownora.certificateReviews.v1'

function storageAvailable() {
  try {
    return typeof localStorage !== 'undefined'
  } catch {
    return false
  }
}

function isReview(value) {
  if (!value || typeof value !== 'object') return false
  return (
    typeof value.id === 'string' &&
    typeof value.certificateId === 'string' &&
    Number.isInteger(value.rating) &&
    value.rating >= 1 &&
    value.rating <= 5 &&
    typeof value.message === 'string' &&
    typeof value.createdAt === 'string'
  )
}

export function readReviews() {
  if (!storageAvailable()) return []
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isReview)
  } catch {
    return []
  }
}

export function reviewsForCertificate(certificateId) {
  return readReviews()
    .filter((review) => review.certificateId === certificateId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function saveReview(review) {
  if (!storageAvailable()) {
    throw new Error('storage-unavailable')
  }
  const next = [review, ...readReviews().filter((item) => item.id !== review.id)]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function validateReview({ rating, title, message }) {
  const errors = {}
  const cleanTitle = String(title ?? '').trim()
  const cleanMessage = String(message ?? '').trim()
  const numericRating = Number(rating)

  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    errors.rating = 'Choose a rating from 1 to 5.'
  }
  if (cleanTitle.length > REVIEW_TITLE_LIMIT) {
    errors.title = `Review title must be ${REVIEW_TITLE_LIMIT} characters or fewer.`
  }
  if (!cleanMessage) {
    errors.message = 'Enter a review message.'
  } else if (cleanMessage.length > REVIEW_MESSAGE_LIMIT) {
    errors.message = `Review message must be ${REVIEW_MESSAGE_LIMIT} characters or fewer.`
  }

  return {
    errors,
    value: {
      rating: numericRating,
      title: cleanTitle,
      message: cleanMessage,
    },
  }
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CardHeader from '../components/CardHeader'
import PageHero from '../components/PageHero'
import { CONTACT } from '../data/site'
import { library } from '../data/library'

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogPage() {
  const [filter, setFilter] = useState('all')
  const [visible, setVisible] = useState(9)
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  const posts = library.posts.filter((post) => filter === 'all' || post.category === 'Uncategorized')
  const shown = posts.slice(0, visible)

  useEffect(() => {
    document.title = 'Blog | Nordic Beauty Academy'
  }, [])

  function subscribe(event) {
    event.preventDefault()
    if (honeypot) return
    if (!email.trim()) {
      setError('Enter your email address.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setReady(true)
  }

  return (
    <>
      <PageHero variant="editorial" title="Blog" text="Keep up to date with our advices" />
      <section className="page-section">
        <div className="wrap">
          <div className="filter-row" role="group" aria-label="Article categories">
            <button type="button" className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')}>
              All articles
            </button>
            <button
              type="button"
              className={filter === 'Uncategorized' ? 'is-active' : ''}
              onClick={() => setFilter('Uncategorized')}
            >
              Uncategorized
            </button>
          </div>
          <div className="media-grid blog-grid">
            {shown.map((post) => (
              <article className="media-card" key={post.slug}>
                <Link to={`/blog/${post.slug}`}>
                  {post.image ? <img src={post.image} alt={post.imageAlt || ''} /> : <span className="media-fallback" />}
                  <CardHeader
                    eyebrow={post.category}
                    meta={formatDate(post.date)}
                    dateTime={post.date}
                    title={post.title}
                    text={post.excerpt}
                  />
                  <span className="text-link">Read Article</span>
                </Link>
              </article>
            ))}
          </div>
          {visible < posts.length ? (
            <p className="catalogue">
              <button type="button" className="btn btn-primary" onClick={() => setVisible(posts.length)}>
                Load more
              </button>
            </p>
          ) : null}
        </div>
      </section>
      <section className="page-section" aria-labelledby="subscribe-title">
        <div className="wrap">
          <div className="purple-panel enquiry-card subscribe-card">
            <h2 id="subscribe-title">Keep up to date with our advices</h2>
            <p>Subscribe now and thank us later</p>
            {ready ? (
              <div role="status">
                <h3>Your subscription is ready to send</h3>
                <p>This page does not add you to a mailing list. Send the request by email instead.</p>
                <a
                  className="btn btn-white"
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Subscribe')}&body=${encodeURIComponent(`Please subscribe ${email.trim()}`)}`}
                >
                  Send by email
                </a>
              </div>
            ) : (
              <form className="subscribe-form" onSubmit={subscribe} noValidate>
                <label className="sr-only" htmlFor="subscribe-email">
                  Email address, required
                </label>
                <input
                  id="subscribe-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Email Address *"
                  value={email}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby={error ? 'subscribe-error' : undefined}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label className="hp" htmlFor="subscribe-company">
                  Leave this field empty if you're human
                </label>
                <input
                  id="subscribe-company"
                  className="hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
                {error ? (
                  <p id="subscribe-error" className="field-error" role="alert">
                    {error}
                  </p>
                ) : null}
                <button type="submit" className="btn btn-white">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

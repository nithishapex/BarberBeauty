import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import EnquiryForm from '../components/EnquiryForm'
import { CAMPUS, COURSE_GROUPS, INSTAGRAM, PARTNERS } from '../data/home'
import reviews from '../data/reviews.json'
import { CONTACT, SOCIAL } from '../data/site'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduced
}

function CourseIcon({ name }) {
  const common = {
    viewBox: '0 0 48 48',
    width: '48',
    height: '48',
    fill: 'none',
    'aria-hidden': 'true',
  }
  if (name === 'skin') {
    return (
      <svg {...common}>
        <rect x="8" y="6" width="14" height="28" rx="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 6v-2h6v2M15 14v8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M28 10h10l-2 22H30L28 10z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M32 32v8h6v-8" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (name === 'face') {
    return (
      <svg {...common}>
        <circle cx="24" cy="22" r="12" stroke="currentColor" strokeWidth="1.6" />
        <path d="M18 22h.1M30 22h.1M19 27c1.6 2 8.4 2 10 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M24 34v8M18 40h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'body') {
    return (
      <svg {...common}>
        <circle cx="24" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 22c0-4 3.5-6 8-6s8 2 8 6v8l4 12M16 30l-4 12M20 42h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M14 34c8-2 12-10 12-18 4 6 8 8 12 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18 16l4-6M30 14l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16" cy="36" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function Slider({ label, items, renderItem, interval = 4000, className = '' }) {
  const windowRef = useRef(null)
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || reduced) return undefined
    const timer = window.setInterval(() => {
      const node = windowRef.current
      const slide = node?.querySelector('.slider-slide')
      if (!node || !slide) return
      const atEnd = node.scrollLeft + node.clientWidth >= node.scrollWidth - 8
      node.scrollTo({ left: atEnd ? 0 : node.scrollLeft + slide.clientWidth, behavior: 'smooth' })
    }, interval)
    return () => window.clearInterval(timer)
  }, [paused, reduced, interval, items.length])

  function move(direction) {
    const node = windowRef.current
    const slide = node?.querySelector('.slider-slide')
    if (!node || !slide) return
    node.scrollBy({ left: direction * slide.clientWidth, behavior: 'smooth' })
  }

  return (
    <div
      className={`slider ${className}`.trim()}
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <div className="slider-window" ref={windowRef}>
        {items.map((item) => (
          <div key={item.key || item.src || item.name} className="slider-slide">
            {renderItem(item)}
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button type="button" onClick={() => move(-1)} aria-label={`Previous ${label}`}>
          ‹
        </button>
        <button type="button" onClick={() => move(1)} aria-label={`Next ${label}`}>
          ›
        </button>
      </div>
    </div>
  )
}

function ReviewCard({ review }) {
  const [open, setOpen] = useState(false)
  const long = review.text.length > 180
  return (
    <article className="review-card">
      <p className="stars" aria-label="5 stars">
        ★★★★★
      </p>
      <p className={open || !long ? '' : 'clamp'}>{review.text}</p>
      {long ? (
        <button type="button" className="text-button" onClick={() => setOpen((value) => !value)}>
          {open ? 'Hide' : 'Read more'}
        </button>
      ) : null}
      <div className="review-person">
        <span aria-hidden="true">{review.name.slice(0, 1)}</span>
        <div>
          <strong>{review.name}</strong>
          <time dateTime={review.date}>{review.date}</time>
        </div>
      </div>
    </article>
  )
}

export default function HomePage() {
  const reduced = useReducedMotion()

  useEffect(() => {
    document.title = 'Crownora Barber Academy'
  }, [])

  // useEffect(() => {
  //   const video = document.querySelector('.home-hero-video')
  //   if (!video) return
  //   if (reduced) video.pause()
  //   else video.play().catch(() => { })
  // }, [reduced])

  return (
    <>
      {/* <section className="home-hero" aria-label="Introduction">
        <video
          className="home-hero-video"
          autoPlay={!reduced}
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/images/home/hero.mp4" type="video/mp4" />
        </video>
        <div className="home-hero-shade" />
        <div className="wrap home-hero-copy">
          <h1>PAKISTAN’S PREMIER INTERNATIONAL BARBER & BEAUTY ACADEMY</h1>
          <Link className="btn btn-white" to="/contact">
            Academy
          </Link>
        </div>
        <div className="wrap home-facts">
          <div>
            <span>Contact</span>
            <p>
              <strong>
                T: <a href={CONTACT.phoneHref}>+971 4 221 1521</a>
              </strong>
              <br />
              <strong>
                <a href={CONTACT.emailHref}>info@nordicbtc.com</a>
              </strong>
            </p>
          </div>
          <div>
            <span>Open Hours</span>
            <p>
              <strong>Monday– Friday</strong>
              <br />
              <strong>10.00 am – 7.00 pm</strong>
            </p>
          </div>
          <div>
            <span>Location</span>
            <p>
              <strong>Al Wasl road, Villa A1053,</strong>
              <br />
              <strong>Jumeirah 3, dubai UAE</strong>
            </p>
          </div>
        </div>
      </section> */}

      <section className="home-hero" aria-label="Introduction">
        <img
          className="home-hero-video"
          src="/images/home/hero-banner.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
        />

        <div className="home-hero-shade" />

        <div className="wrap home-hero-copy">
          <h1>PAKISTAN’S PREMIER INTERNATIONAL BARBER & BEAUTY ACADEMY</h1>
          <Link className="btn btn-white" to="/contact">
            Academy
          </Link>
        </div>

        <div className="wrap home-facts">
          <div>
            <span>Contact</span>
            <p>
              <strong>
                T: <a href={CONTACT.phoneHref}>+971 4 221 1521</a>
              </strong>
              <br />
              <strong>
                <a href={CONTACT.emailHref}>info@nordicbtc.com</a>
              </strong>
            </p>
          </div>
          <div>
            <span>Open Hours</span>
            <p>
              <strong>Monday– Friday</strong>
              <br />
              <strong>10.00 am – 7.00 pm</strong>
            </p>
          </div>
          <div>
            <span>Location</span>
            <p>
              <strong>Al Wasl road, Villa A1053,</strong>
              <br />
              <strong>Jumeirah 3, dubai UAE</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="beauty-courses-title">
        <div className="wrap">
          <h2 id="beauty-courses-title" className="section-title center">
            Beauty Courses
          </h2>
          <div className="course-picks">
            {COURSE_GROUPS.map((group) => (
              <Link key={group.href} to={group.href} className="course-pick">
                <CourseIcon name={group.icon} />
                <span>{group.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* 
      <section className="page-section" aria-labelledby="instagram-title">
        <div className="wrap">
          <h2 id="instagram-title" className="section-title center">
            Instagram
          </h2>
          <Slider
            label="Instagram photos"
            items={INSTAGRAM}
            interval={3000}
            renderItem={(item) => <img src={item.src} alt={item.alt} />}
          />
          <p className="center-action">
            <a className="btn btn-primary" href={SOCIAL[0].href} target="_blank" rel="noopener noreferrer">
              View on Instagram
            </a>
          </p>
        </div>
      </section> */}

      <section className="page-section" aria-labelledby="home-story-title">
        <div className="wrap story-band">
          <img src="/images/home/story.jpg" alt="Crownora Barber Academy professional barber training" />
          <div>
            <h2 id="home-story-title">Our Story</h2>
            <p>Crafting Skills. Building Careers.</p>
            <p>
              Crownora Barber Academy is dedicated to shaping the next
              generation of professional barbers through practical
              training, modern techniques, and industry-focused education.
            </p>
            <p>
              <strong>Excellence in Barbering Education</strong>
              <br />
              At Crownora, we believe barbering is more than a profession;
              it is an art. Our academy focuses on developing essential
              barbering skills, precision cutting, modern fades, beard
              grooming, and professional client care in a supportive
              learning environment.
            </p>

            {/* <Link className="btn btn-primary" to="/our-story">
              Read More
            </Link> */}
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="success-title">
        <div className="wrap success-band">
          <div>
            <h2 id="success-title">YOUR SUCCESS IS OUR SUCCESS!</h2>
            <p>
              Step into the world of professional barbering with
              Crownora Barber Academy.
            </p>

            <p>
              Every student who joins Crownora becomes part of our
              academy family. We provide a welcoming, supportive, and
              professional learning environment where students can
              develop their skills, confidence, and creativity.
            </p>

            <p>
              At Crownora Barber Academy, our trainers and students
              work together to master modern haircuts, precision fades,
              beard styling, and professional grooming techniques.
              Your journey to a successful barbering career starts here.
            </p>
            <Link className="btn btn-primary" to="/contact">
              Reach Us
            </Link>
          </div>
          <Slider
            className="campus-slider"
            label="Academy photographs"
            items={CAMPUS}
            interval={3500}
            renderItem={(item) => <img src={item.src} alt={item.alt} />}
          />
        </div>
      </section>

      <EnquiryForm
        id="home-enquiry"
        title="Send Message"
        description=""
        lead="Crownora barber academy enquiry"
      />

      {/* <section className="page-section" aria-labelledby="partners-title">
        <div className="wrap">
          <h2 id="partners-title" className="section-title center">
            NORDIC BEAUTY IN PARTNERSHIP WITH
          </h2>
          <ul className="partner-grid">
            {PARTNERS.map((partner) => (
              <li key={partner.src}>
                <img src={partner.src} alt={partner.alt} />
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      <section className="page-section" aria-labelledby="reviews-title">
        <div className="wrap">
          <h2 id="reviews-title" className="section-title center">
            SEE WHAT OUR STUDENTS HAS TO SAY
          </h2>
          <Slider
            className="review-slider"
            label="Student reviews"
            items={reviews}
            interval={6000}
            renderItem={(review) => <ReviewCard review={review} />}
          />
        </div>
      </section>
    </>
  )
}

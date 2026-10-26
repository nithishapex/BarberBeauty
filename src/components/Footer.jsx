import { Link } from 'react-router-dom'
import { CONTACT, HOME_PATH, QUICK_LINKS, REVIEW_URL, SEO_CREDIT_URL } from '../data/site'
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to={HOME_PATH}>
            <img src="/images/logo-light.png" alt="Nordic Beauty" width="113" height="113" />
          </Link>
          <p className="copy">
            © 2020 Nordic Beauty.{' '}
            <a href={SEO_CREDIT_URL}>SEO</a> By Brandcare Digital
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2>Quick Links</h2>
          <ul className="footer-links">
            {QUICK_LINKS.map((item) => (
              <li key={item.href}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>Get in Touch</h2>
          <address className="contact-list">
            <p>
              <PhoneIcon />
              <span>
                Tel:{' '}
                <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
              </span>
            </p>
            <p>
              <ChatIcon />
              <span>
                Whatsapp:{' '}
                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                  {CONTACT.whatsappDisplay}
                </a>
              </span>
            </p>
            <p>
              <MailIcon />
              <span>
                Email: <a href={CONTACT.emailHref}>{CONTACT.email}</a>
              </span>
            </p>
            <p>
              <PinIcon />
              <span>Address: {CONTACT.address}</span>
            </p>
          </address>
        </div>

        <div>
          <h2>Leave A Review</h2>
          <a className="review-link" href={REVIEW_URL} aria-label="Review us on Google">
            <img src="/images/google-review.png" alt="Review us on Google" width="200" height="88" />
          </a>
        </div>
      </div>
    </footer>
  )
}

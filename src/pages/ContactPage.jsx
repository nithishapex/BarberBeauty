import { useEffect } from 'react'
import CardHeader from '../components/CardHeader'
import EnquiryForm from '../components/EnquiryForm'
import PageHero from '../components/PageHero'
import { MailIcon, PhoneIcon, PinIcon } from '../components/Icons'
import { CONTACT } from '../data/site'

const MAP_SRC =
  'https://maps.google.com/maps?q=1053%20Al%20Wasl%20Road%2C%20Jumeirah%2C%20Dubai%2C%20UAE&t=m&z=13&output=embed&iwloc=near'

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact | Nordic Beauty Academy'
  }, [])

  return (
    <>
      <PageHero
        variant="contact"
        title="Contact"
        text="We would love hearing from you and moreover meeting you in person. Below you can find all contact details. See you soon!"
      />
      <section className="page-section" aria-label="Contact details">
        <div className="wrap contact-layout">
          <div className="contact-facts">
            <article>
              <CardHeader title="Contact" />
              <p>
                <PhoneIcon />
                <span>
                  T:{' '}
                  <a href={CONTACT.phoneHref}>971 4 221 15 21</a>
                </span>
              </p>
              <p>
                <MailIcon />
                <a href={CONTACT.emailHref}>{CONTACT.email}</a>
              </p>
            </article>
            <article>
              <CardHeader title="Hours" />
              <p>Monday– Friday</p>
              <p>10.00 am – 7.00 pm</p>
            </article>
            <article>
              <CardHeader title="Location" />
              <p>
                <PinIcon />
                <span>{CONTACT.address}</span>
              </p>
            </article>
          </div>
          <iframe className="map-frame" title="Nordic Beauty Academy on Google Maps" src={MAP_SRC} loading="lazy" />
        </div>
      </section>
      <EnquiryForm
        id="message"
        title="Drop Us A Line"
        description="Leave us a message and we will get back to you as soon as possible. We’d love hearing from you."
      />
      <section className="page-section">
        <div className="wrap help-grid">
          <article className="ready-card help-card">
            <CardHeader
              title="Join Our Team"
              text={
                <>
                  Please send us an email at <a href={CONTACT.careersHref}>{CONTACT.careersEmail}</a> telling us a
                  bit about yourself. Oh…and attach your resume.
                </>
              }
            />
            <a className="btn btn-primary" href={CONTACT.careersHref}>
              View Positions
            </a>
          </article>
          <article className="ready-card help-card">
            <CardHeader
              title="Become Our Partner"
              text={
                <>
                  Interested in Franchise? Drop us a line at <a href={CONTACT.emailHref}>{CONTACT.email}</a> and
                  find out more.
                </>
              }
            />
            <a className="btn btn-primary" href={`${CONTACT.emailHref}?subject=${encodeURIComponent('Franchise enquiry')}`}>
              Tell Me More
            </a>
          </article>
        </div>
      </section>
    </>
  )
}

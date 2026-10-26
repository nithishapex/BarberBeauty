import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CardHeader from '../components/CardHeader'
import PageHero from '../components/PageHero'
import { CATEGORIES, UPCOMING } from '../data/academy'
import { library } from '../data/library'

export default function AcademyPage() {
  const [openId, setOpenId] = useState('hair')
  const upcoming = UPCOMING.map((slug) => library.courses.find((course) => course.slug === slug)).filter(Boolean)

  useEffect(() => {
    document.title = 'Academy Courses | Nordic Beauty Academy'
  }, [])

  return (
    <>
      <PageHero
        variant="academy"
        title="Academy"
        text="Our talanted specialists are ready to share their secrets. Don’t loose this opportunity, join the course."
      />
      <section className="page-section" aria-labelledby="upcoming-title">
        <div className="wrap">
          <h2 id="upcoming-title" className="section-title">
            Upcoming Courses
          </h2>
          <div className="media-grid">
            {upcoming.map((course) => (
              <article className="media-card" key={course.slug}>
                <Link to={`/courses/${course.slug}`}>
                  {course.image ? <img src={course.image} alt={course.imageAlt || course.title} /> : null}
                  <CardHeader title={course.title} titleAs="h3" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section" aria-label="Course categories">
        <div className="wrap accordion">
          {CATEGORIES.map((category) => {
            const open = openId === category.id
            return (
              <article className="accordion-item" key={category.id} id={category.id}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`${category.id}-panel`}
                    onClick={() => setOpenId(open ? '' : category.id)}
                  >
                    {category.title}
                    <span aria-hidden="true">{open ? '–' : '+'}</span>
                  </button>
                </h3>
                <div id={`${category.id}-panel`} hidden={!open} className="accordion-panel">
                  {category.paragraphs.map((paragraph) =>
                    paragraph.includes('click here') ? (
                      <p key={paragraph}>
                        {paragraph.replace('click here.', '')}
                        <Link to={category.href}>click here</Link>.
                      </p>
                    ) : (
                      <p key={paragraph}>{paragraph}</p>
                    ),
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </section>
      <section className="page-section">
        <div className="wrap help-grid">
          <article className="ready-card help-card">
            <CardHeader
              title="Need Help?"
              text="Left your contacts and our expert will help to select right cource specially for you."
            />
            <Link className="btn btn-primary" to="/contact#message">
              Leave request
            </Link>
          </article>
          <article className="ready-card help-card">
            <CardHeader
              title="Book Appointment"
              text="Leave your contacts and we will get back to you asap. We are here to help you."
            />
            <Link className="btn btn-primary" to="/contact#message">
              Leave request
            </Link>
          </article>
        </div>
      </section>
    </>
  )
}

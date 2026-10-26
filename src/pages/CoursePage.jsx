import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import RichText from '../components/RichText'
import { library } from '../data/library'

export default function CoursePage() {
  const { slug } = useParams()
  const course = library.courses.find((item) => item.slug === slug)

  useEffect(() => {
    document.title = course
      ? `${course.title} | Crownora Beauty Academy`
      : 'Course not found | Crownora Beauty Academy'
  }, [course])

  if (!course) {
    return (
      <section className="page-section">
        <div className="wrap prose">
          <h1>This course page is not available</h1>
          <p>The course could not be found in the academy catalogue.</p>
          <Link className="btn btn-primary" to="/academy-courses">
            Academy Courses
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHero variant="course" title={course.title} image={course.image} imageAlt={course.imageAlt} />
      <section className="page-section">
        <div className="wrap prose">
          <RichText html={course.html} />
          <p className="catalogue">
            <Link className="btn btn-primary" to="/contact#message">
              Leave request
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}


import { CATALOGUE_URL } from '../data/site'

export default function CourseArticle() {
  return (
    <section className="page-section" id="about" aria-labelledby="about-title">
      <div className="wrap prose">
        <h2 id="about-title">
          Your Go-To Academy for Professional Barber Courses in Pakistan
        </h2>

        <p>
          Are you looking to start a career in barbering? Crownora Barber
          Academy offers career-focused training designed to help students
          develop practical skills and professional confidence. Our courses
          focus on barbering fundamentals, haircutting, hairstyling, and
          grooming techniques. Practical training availability depends on
          the selected course.
        </p>

        <p>
          Students can learn about professional hygiene, sanitation,
          lesson planning where applicable, classroom responsibilities,
          and workplace safety. Maintaining a clean and safe environment
          is an essential part of professional barbering and grooming.
        </p>

        <p>
          Our training emphasizes safe working practices, including proper
          cleaning and disinfection of barbering tools and equipment.
          Students learn the importance of following appropriate hygiene
          procedures to help protect themselves and their clients.
        </p>

        <p>
          Haircutting and hairstyling training introduces students to
          essential techniques for men's haircuts, styling, and grooming.
          Course content varies according to the selected program and
          the student's experience level.
        </p>

        <p>
          Students can develop familiarity with professional tools such
          as clippers, scissors, combs, and razors, learning their
          appropriate use and care as part of barbering practice.
        </p>

        <p>
          Professional barbering also involves excellent customer service.
          Students can develop communication skills, learn to understand
          client preferences, and build positive client relationships.
          Business-related topics may include service pricing, client
          consultations, and handling customer concerns.
        </p>

        <div className="catalogue" id="catalogue">
          <a
            className="btn btn-primary catalogue-btn"
            href={CATALOGUE_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            Explore Crownora Academy Courses
          </a>
        </div>
      </div>
    </section>
  )
}
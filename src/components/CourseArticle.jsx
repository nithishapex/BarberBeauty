import { CATALOGUE_URL } from '../data/site'

export default function CourseArticle() {
  return (
    <section className="page-section" id="about" aria-labelledby="about-title">
      <div className="wrap prose">
        <h2 id="about-title">Your Go-to Platform for The Best Barber Course in Dubai</h2>
        <p>
          Are you looking forward to joining a barber course? Look no further than Nordic Beauty for an
          exceptional, career-oriented course. While you can attend the theory classes at your own pace and
          convenience, you’ll have to follow the practical part in person. Nordic Beauty provides the best{' '}
          <strong>barber course in Dubai</strong>, consisting of online classes and classroom-based classes;
          barbers can also deliver lessons at beauty and barber Institutes.
        </p>
        <p>
          You can learn about first aid requirements, development of lesson plans, ways to manage classroom
          assignments, and setting objectives. Most of these barber courses also deal with sanitation and
          hygiene standards. You will learn about sanitation, cleanliness, and safety standards necessary
          for barbering and cosmetology environments.
        </p>
        <p>
          You will also learn ways to examine the hazards of serious infections, diseases like HIV, and poor
          sanitation. Due to the outbreak of covid-19, barbers must take extra precautions. For example, they
          must sanitize their hands and hair cutting accessories after every use.
        </p>
        <p>
          You will also be required to use gloves when coming in contact with their clients. When you enroll
          in haircutting and hairstyling courses, you can learn about the basic steps involved in men’s
          hairstyling and haircutting.
        </p>
        <p>
          Besides, these courses also cover the basic steps required to properly handle tools such as razors,
          clippers, combs, and scissors. The course will also introduce you to hairstyling tips at the
          beginners’ level.
        </p>
        <p>
          With a customer-centric course, barbers can learn ways to communicate with their customers. It
          increases the likelihood of the consumer’s return in the future. The topics included are service
          pricing, communication skills, and resolving disputes.
        </p>
        <div className="catalogue" id="catalogue">
          <a
            className="btn btn-primary catalogue-btn"
            href={CATALOGUE_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            Check Out Our Academy Courses Catalogue
          </a>
        </div>
      </div>
    </section>
  )
}

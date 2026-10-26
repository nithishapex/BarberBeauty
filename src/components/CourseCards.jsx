import { ADVANCED_COURSE, BASIC_COURSE, TECHNIQUES } from '../data/site'
import CardHeader from './CardHeader'
import { CheckIcon } from './Icons'

function PriceList({ prices }) {
  return (
    <div className="price-block">
      <p className="price-kicker">PRICE</p>
      {prices.map((price) => (
        <p className="price-row" key={price.label}>
          <span>{price.label}</span>
          <strong>{price.value}</strong>
        </p>
      ))}
    </div>
  )
}

export default function CourseCards() {
  return (
    <section className="page-section" aria-label="Barbering course options">
      <div className="wrap course-grid">
        <article className="course-card" id="basic">
          <CardHeader title={BASIC_COURSE.title} text={<em>{BASIC_COURSE.note}</em>} />
          <div className="course-body">
            <div id="techniques">
              <h3>TECHNIQUES</h3>
              <ul className="techniques">
                {TECHNIQUES.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="experience">
              <em>{BASIC_COURSE.experience}</em>
            </p>
            <dl className="facts">
              <div>
                <dt>Duration</dt>
                <dd>{BASIC_COURSE.duration}</dd>
              </div>
              <div>
                <dt>Internship</dt>
                <dd>{BASIC_COURSE.internship}</dd>
              </div>
            </dl>
            <PriceList prices={BASIC_COURSE.prices} />
          </div>
        </article>

        <article className="course-card" id="advanced">
          <CardHeader title={ADVANCED_COURSE.title} text={ADVANCED_COURSE.summary} />
          <div className="course-body">
          <dl className="facts">
            <div>
              <dt>Duration</dt>
              <dd>{ADVANCED_COURSE.duration}</dd>
            </div>
            <div>
              <dt>Internship</dt>
              <dd>{ADVANCED_COURSE.internship}</dd>
            </div>
          </dl>
          <PriceList prices={ADVANCED_COURSE.prices} />
          </div>
        </article>
      </div>
    </section>
  )
}

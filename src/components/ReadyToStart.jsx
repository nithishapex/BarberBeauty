import { Link } from 'react-router-dom'
import CardHeader from './CardHeader'
import { SchoolIcon } from './Icons'

export default function ReadyToStart() {
  return (
    <section className="page-section" id="ready" aria-labelledby="ready-title">
      <div className="wrap">
        <div className="ready-card">
          <SchoolIcon />
          <CardHeader
            id="ready-title"
            title="Ready to Start?"
            text="Please leave a request and we will get back to you soon."
          />
          <Link className="btn btn-primary" to="/contact#message">
            Leave request
          </Link>
        </div>
      </div>
    </section>
  )
}

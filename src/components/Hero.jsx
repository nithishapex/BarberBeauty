import { Link } from 'react-router-dom'
import PageHero from './PageHero'

export default function Hero() {
  return (
    <PageHero
      id="top"
      titleId="course-title"
      variant="course"
      title="BARBERING COURSE"
      text="Learn with our celebrity artists and gain not only a professional and educational course but a creative and fun course that will lead to a career immediately after graduation. Our barber and hairstylist trainers work with celebrities, influencers, and customers around the world and have over 20 years of experience in the hair industry. Barber Course In Dubai in Dubai provides an opportunity to learn from elite Makeup Artists."
      image="/images/barber.jpg"
      imageAlt="Students observing a barbering demonstration at Nordic Beauty Academy"
      actions={
        <Link className="btn btn-primary" to="/contact#message">
          Leave request
        </Link>
      }
    />
  )
}

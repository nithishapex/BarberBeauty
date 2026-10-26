import { useEffect } from 'react'
import CourseArticle from '../components/CourseArticle'
import CourseCards from '../components/CourseCards'
import Hero from '../components/Hero'
import ReadyToStart from '../components/ReadyToStart'

export default function BarberingPage() {
  useEffect(() => {
    document.title = "Barbering Courses in Dubai | Barber's Course & Diploma | Nordic Beauty Academy"
  }, [])

  return (
    <>
      <Hero />
      <CourseCards />
      <CourseArticle />
      <ReadyToStart />
    </>
  )
}


import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import { library } from '../data/library'

export default function OurStoryPage() {
  useEffect(() => {
    document.title = 'Our Story | Crownora Barber Academy'
  }, [])

  return (
    <>
      <PageHero
        variant="story"
        title="Our Story"
        text="Our journey towards excellence in beauty and barber education."
        image={library.extras.story}
        imageAlt="Crownora Barber Academy Pakistan"
      />

      <section className="page-section">
        <div className="wrap prose">
          <p>
            The siblings Ayesha Khan and Ahmed Khan behind Crownora Barber Academy
            share a passion for entrepreneurship, education, creativity, and the
            beauty and grooming industry in Pakistan.
          </p>

          <h2>“Ayesha Khan — The Beauty Educator”</h2>

          <p>
            Ayesha, our Education Director, began her career in the beauty and
            aesthetics industry at an early age. Throughout her career, she
            developed expertise in professional beauty treatments, education,
            customer service, and training.
          </p>

          <p>
            Her vision is to help aspiring professionals build successful careers
            through quality education, practical training, and industry-focused
            learning.
          </p>

          <h2>Designing Excellence</h2>

          <p>
            Ahmed Khan brings a passion for design, entrepreneurship, and
            business development. He believes that creativity, professional
            standards, and strong business skills are essential to building
            successful businesses in the beauty and grooming industry.
          </p>

          <h2>Crownora Barber Academy in Pakistan</h2>

          <p>
            Crownora Barber Academy was established with a vision to provide
            professional education and practical training for people who want
            to build careers in barbering, hairstyling, beauty, and grooming.
            Our focus is on developing practical skills, confidence, and
            professional standards that prepare students for the workplace.
          </p>

          <h2>A Vision for Professional Education</h2>

          <p>
            We understand the challenges faced by salons, barbershops, beauty
            clinics, and grooming businesses. Professional skills, practical
            experience, and quality education are important for improving
            service standards and building successful careers.
          </p>

          <p>
            At Crownora Barber Academy, we aim to bridge the gap between
            learning and professional practice by sharing knowledge, providing
            hands-on training, and helping students develop the skills needed
            to succeed in the industry.
          </p>

          <p>
            Our academy brings together a passion for creativity, education,
            beauty, barbering, and business development. We are committed to
            creating a supportive learning environment where students can
            discover their potential and work towards their career goals.
          </p>

          <p>
            Our main goal is to provide students with the right tools,
            knowledge, and practical expertise to improve professional
            standards. We believe education is a key foundation for success.
          </p>

          <p>
            Our mission is to provide quality barbering, hairstyling, and
            beauty education for individuals starting their careers, existing
            professionals seeking to improve their skills, and businesses
            looking for professional training solutions. We aim to help
            individuals and businesses achieve high standards of service,
            professionalism, and customer satisfaction.
          </p>
        </div>
      </section>
    </>
  )
}

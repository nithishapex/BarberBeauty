import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import { library } from '../data/library'

export default function OurStoryPage() {
  useEffect(() => {
    document.title = 'Our Story | Nordic Beauty Academy'
  }, [])

  return (
    <>
      <PageHero
        variant="story"
        title="Our Story"
        text="How it all started;"
        image={library.extras.story}
        imageAlt="Nordic professional atmosphere"
      />
      <section className="page-section">
        <div className="wrap prose">
          <p>
            The siblings Selvana &amp; Mahmoud Chahine behind Nordic Beauty both have a background in
            entrepreneurship rooted back in Sweden.
          </p>
          <h2>“Selvana Chahine, the Beauty Master”</h2>
          <p>
            Selvana, the Education Director started her aesthetic and beauty career at the age of 19.
            Through-out her career Selvana achieved over 40 international certificates, awards and diplomas
            including the “train the trainer” license and international ambassador license.
          </p>
          <p>
            She decided to open her first beauty academy in Sweden at the age of 23. Over the years she
            successfully graduated hundreds of students within the aesthetic and beauty field across
            Scandinavia, Europe and Middle east / GCC.
          </p>
          <h2>Designing Beauty</h2>
          <p>
            Mahmoud graduated his Master in design from Turin, Italy and quickly fell in love with design and
            business development. In his early 20´s he established his first company within product
            development and got his products selling across Europe. He continued his road in the business
            development field connecting businesses between Europe and GCC.
          </p>
          <h2>“Nordics in Dubai”</h2>
          <p>
            in 2014 Selvana decided to move to Dubai where she worked an opportunity to work as a education
            ambassador for a highly reputable leading international company, with over 40 international brands
            within their portfolio. She extensively travelled through the Middle East and GCC executing
            various levels of trainings such as, skincare &amp; body therapy, makeup artistry aesthetic
            skincare, sales and customer service etc.
          </p>
          <h2>“A beauty hub is born;</h2>
          <p>
            During Selvanas career in the middle east and GCC she recognized the challenges salon, Clinics
            and spa owners are facing daily and the qualifications and proper education that is needed in GCC
            to enhance the level of Standard and achieve successful and fruitful business.
          </p>
          <p>
            Being not only a trained professional and educator in the industry, but also a customer, she
            realized how to breach these, through service, education and training, passing on all her
            knowledge and expertise!
          </p>
          <p>
            Not only being siblings, but also close friends and sharing the passion for Entrepreneurship,
            creativity / design, beauty and business development both Selvana and Mahmoud wanted to establish
            a unique concept by gathering their expertise gained throughout the years and unite United Arab
            emirates and Scandinavia under one roof.
          </p>
          <p>
            The main goal is to provide the right tools and expertise to improve overall standards and we
            believe that education is the key to success.
          </p>
          <p>
            Our mission as an academy is to provide wide opportunities to achieve high quality hair &amp;
            beauty education for individuals who wants to start a career in the beauty industry, existing
            beauty professionals and corporate solutions. We provide the most important tools to enhance
            individuals and company to reach a 5-star level.
          </p>
        </div>
      </section>
    </>
  )
}

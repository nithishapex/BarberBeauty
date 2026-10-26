import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CardHeader from '../components/CardHeader'
import PageHero from '../components/PageHero'
import RichText from '../components/RichText'
import { library } from '../data/library'

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = library.posts.find((item) => item.slug === slug)

  useEffect(() => {
    document.title = post ? `${post.title} | Nordic Beauty Academy` : 'Article not found | Nordic Beauty Academy'
  }, [post])

  if (!post) {
    return (
      <section className="page-section">
        <div className="wrap prose">
          <h1>This article is not available</h1>
          <p>The article could not be found.</p>
          <Link className="btn btn-primary" to="/blog">
            Blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHero variant="article" title={post.title} image={post.image} imageAlt={post.imageAlt} />
      <section className="page-section">
        <div className="wrap prose">
          <CardHeader
            eyebrow={<Link to="/blog">{post.category}</Link>}
            meta={formatDate(post.date)}
            dateTime={post.date}
          />
          <RichText html={post.html} />
          <p className="catalogue">
            <Link className="btn btn-primary" to="/blog">
              All articles
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

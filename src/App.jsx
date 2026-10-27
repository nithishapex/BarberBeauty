import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AcademyPage from './pages/AcademyPage'
import BarberingPage from './pages/BarberingPage'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import CertificateAccessPage from './pages/CertificateAccessPage'
import CertificateDetailsPage from './pages/CertificateDetailsPage'
import CertificateReviewPage from './pages/CertificateReviewPage'
import CertificateVerifyPage from './pages/CertificateVerifyPage'
import ContactPage from './pages/ContactPage'
import CoursePage from './pages/CoursePage'
import OurStoryPage from './pages/OurStoryPage'

function MissingPage() {
  return (
    <section className="page-section">
      <div className="wrap prose">
        <h1>This page is not available</h1>
        <p>Choose a page from the academy navigation.</p>
      </div>
    </section>
  )
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/barbering" element={<BarberingPage />} />
          <Route path="/courses/:slug" element={<CoursePage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/academy-courses" element={<AcademyPage />} />
          <Route path="/certificates/access" element={<CertificateAccessPage />} />
          <Route path="/my-certificates" element={<Navigate to="/certificates/access" replace />} />
          <Route path="/certificates/verify/:certificateId" element={<CertificateVerifyPage />} />
          <Route path="/certificates/review/:certificateId" element={<CertificateReviewPage />} />
          <Route path="/certificates/:certificateId" element={<CertificateDetailsPage />} />
          <Route path="/certificates" element={<Navigate to="/certificates/access" replace />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

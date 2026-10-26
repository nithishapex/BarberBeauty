import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FloatingActions from './FloatingActions'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView()
      })
      return () => window.cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <Header />
      <main id="main" className="page-enter">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}

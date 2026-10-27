import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { COURSE_MENU, HOME_PATH, MAIN_NAV, SOCIAL } from '../data/site'
import { ChevronIcon, FacebookIcon, InstagramIcon } from './Icons'

function SocialLinks({ className }) {
  return (
    <div className={className}>
      {SOCIAL.map((item) => (
        <a key={item.href} href={item.href} aria-label={item.label}>
          {item.icon === 'instagram' ? <InstagramIcon /> : <FacebookIcon />}
        </a>
      ))}
    </div>
  )
}

function CourseLink({ item, onNavigate, className }) {
  const { pathname } = useLocation()
  const current = pathname === item.href
  return (
    <Link to={item.href} className={className} aria-current={current ? 'page' : undefined} onClick={onNavigate}>
      {item.label}
    </Link>
  )
}

export default function Header() {
  const menuId = useId()
  const mobileId = useId()
  const location = useLocation()
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [academyOpen, setAcademyOpen] = useState(true)
  const [aestheticOpen, setAestheticOpen] = useState(false)
  const burgerRef = useRef(null)
  const menuRef = useRef(null)
  const menuWasOpen = useRef(false)
  const skipReturnFocus = useRef(false)
  const closeTimer = useRef(null)
  const academyCurrent = location.pathname === '/academy-courses' || location.pathname.startsWith('/courses/')

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  function openCourses() {
    window.clearTimeout(closeTimer.current)
    setCoursesOpen(true)
  }

  function closeCoursesSoon() {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setCoursesOpen(false), 320)
  }

  function closeCourses() {
    window.clearTimeout(closeTimer.current)
    setCoursesOpen(false)
  }

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    const locked = [document.getElementById('main'), document.querySelector('.site-footer'), document.querySelector('.float-stack')]
    locked.forEach((node) => {
      if (!node) return
      if (menuOpen) node.setAttribute('inert', '')
      else node.removeAttribute('inert')
    })
    if (menuOpen) {
      menuRef.current?.querySelector('button, a')?.focus()
      menuWasOpen.current = true
    } else if (menuWasOpen.current && !skipReturnFocus.current) {
      burgerRef.current?.focus()
    }
    skipReturnFocus.current = false
    return () => {
      document.body.classList.remove('menu-open')
      locked.forEach((node) => node?.removeAttribute('inert'))
    }
  }, [menuOpen])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        window.clearTimeout(closeTimer.current)
        setCoursesOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 980px)')
    const onChange = () => {
      if (media.matches) setMenuOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  function closeMobile(event) {
    const href = event?.currentTarget?.getAttribute?.('href') || ''
    if (href.startsWith('#')) skipReturnFocus.current = true
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      {/* <a className="skip" href="#main">
        Skip to content
      </a> */}
      <div className="wrap header-bar">
        <Link className="brand" to={HOME_PATH}>
          <img src="/images/logo-light.png" alt="Crownora Barber Academy"
            width="160" />
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          <div
            className={`has-mega ${coursesOpen ? 'is-open' : ''}`}
            onMouseEnter={openCourses}
            onMouseLeave={closeCoursesSoon}
            onFocus={openCourses}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) closeCourses()
            }}
          >
            <div className="academy-trigger">
              <NavLink
                to="/academy-courses"
                className={`nav-link ${academyCurrent ? 'is-current' : ''}`}
                onClick={closeCourses}
              >
                Academy Courses
              </NavLink>
              <button
                type="button"
                className="chevron-btn"
                aria-expanded={coursesOpen}
                aria-controls={menuId}
                aria-label={coursesOpen ? 'Hide academy course menu' : 'Show academy course menu'}
                onFocus={openCourses}
                onClick={() => {
                  window.clearTimeout(closeTimer.current)
                  setCoursesOpen((open) => !open)
                }}
              >
                <ChevronIcon />
              </button>
            </div>
            <div className="mega" id={menuId} hidden={!coursesOpen}>
              <div className="mega-inner">
                {COURSE_MENU.map((item) => (
                  <div className="mega-col" key={item.label}>
                    <CourseLink item={item} className="mega-title" onNavigate={closeCourses} />
                    {item.children && (
                      <div className="mega-sub">
                        {item.children.map((child) => (
                          <CourseLink key={child.href} item={child} onNavigate={closeCourses} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {MAIN_NAV.map((item) => {
            const current = item.activePrefix
              ? item.activePrefix.some(
                  (prefix) => location.pathname === prefix || location.pathname.startsWith(`${prefix}/`),
                )
              : location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link${current ? ' is-current' : ''}`}
                aria-current={current ? 'page' : undefined}
                onClick={closeCourses}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="header-actions">
          <SocialLinks className="header-social" />
          <Link className="btn btn-primary header-cta" to="/contact#message">
            Leave request
          </Link>
          <button
            ref={burgerRef}
            type="button"
            className={`burger ${menuOpen ? 'is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls={mobileId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-panel" id={mobileId} ref={menuRef}>
          <nav className="mobile-nav" aria-label="Mobile">
            <div className="mobile-split">
              <Link
                to="/academy-courses"
                aria-current={academyCurrent ? 'page' : undefined}
                onClick={closeMobile}
              >
                Academy Courses
              </Link>
              <button
                type="button"
                aria-expanded={academyOpen}
                aria-label={`${academyOpen ? 'Hide' : 'Show'} Academy Courses`}
                onClick={() => setAcademyOpen((open) => !open)}
              >
                <ChevronIcon />
              </button>
            </div>
            {academyOpen && (
              <div className="mobile-sub">
                {COURSE_MENU.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <div className="mobile-split">
                        <Link to={item.href} onClick={closeMobile}>
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={aestheticOpen}
                          aria-label={`${aestheticOpen ? 'Hide' : 'Show'} ${item.label}`}
                          onClick={() => setAestheticOpen((open) => !open)}
                        >
                          <ChevronIcon />
                        </button>
                      </div>
                      {aestheticOpen && (
                        <div className="mobile-nested">
                          {item.children.map((child) => (
                            <CourseLink key={child.href} item={child} onNavigate={closeMobile} />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <CourseLink key={item.label} item={item} className="mobile-course" onNavigate={closeMobile} />
                  ),
                )}
              </div>
            )}

            {MAIN_NAV.map((item) => {
              const current = item.activePrefix
                ? item.activePrefix.some(
                    (prefix) => location.pathname === prefix || location.pathname.startsWith(`${prefix}/`),
                  )
                : location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  className="mobile-link"
                  to={item.href}
                  aria-current={current ? 'page' : undefined}
                  onClick={closeMobile}
                >
                  {item.label}
                </Link>
              )
            })}

            <Link className="btn btn-primary mobile-cta" to="/contact#message" onClick={closeMobile}>
              Leave request
            </Link>
            <SocialLinks className="mobile-social" />
          </nav>
        </div>
      )}
    </header>
  )
}

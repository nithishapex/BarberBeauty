import { useNavigate } from 'react-router-dom'

export default function RichText({ html }) {
  const navigate = useNavigate()

  function onClick(event) {
    const anchor = event.target.closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href')
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
      return
    }
    if (anchor.target === '_blank') return
    event.preventDefault()
    navigate(href)
  }

  return <div className="rich-text" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
}

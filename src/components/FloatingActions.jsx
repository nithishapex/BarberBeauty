import { CONTACT } from '../data/site'
import { PhoneIcon } from './Icons'

export default function FloatingActions() {
  return (
    <div className="float-stack">
      <a className="float-call" href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phoneDisplay}`}>
        <PhoneIcon />
      </a>
      <a
        className="float-whatsapp"
        href={CONTACT.whatsappWidgetHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Crownora Barber Academy"
      >
        <img src="/images/whatsapp.png" alt="" width="70" height="70" />
      </a>
    </div>
  )
}

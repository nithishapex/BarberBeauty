import { useId } from 'react'

export default function PageHero({
  id,
  titleId,
  title,
  text,
  image,
  imageAlt,
  variant = 'editorial',
  actions,
}) {
  const generatedId = useId()
  const headingId = titleId || generatedId
  const split = Boolean(image) && variant !== 'article'
  const feature = Boolean(image) && variant === 'article'

  return (
    <section className={`masthead masthead--${variant}`} id={id} aria-labelledby={headingId}>
      <div className="wrap">
        <div className={split ? 'masthead-split' : undefined}>
          <div className="masthead-text">
            <span className="masthead-rule" aria-hidden="true" />
            <h1 id={headingId}>{title}</h1>
            {text ? <p>{text}</p> : null}
            {actions ? <div className="masthead-actions">{actions}</div> : null}
          </div>
          {split ? (
            <figure className="masthead-photo">
              <img src={image} alt={imageAlt || ''} />
            </figure>
          ) : null}
        </div>
        {feature ? (
          <figure className="masthead-feature">
            <img src={image} alt={imageAlt || ''} />
          </figure>
        ) : null}
      </div>
    </section>
  )
}

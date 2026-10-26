export default function CardHeader({
  id,
  eyebrow,
  meta,
  dateTime,
  title,
  titleAs: Title = 'h2',
  text,
  children,
}) {
  return (
    <header className="card-header">
      <span className="card-accent" aria-hidden="true" />
      {eyebrow || meta ? (
        <p className="card-kicker">
          {eyebrow ? <span>{eyebrow}</span> : null}
          {meta ? (
            dateTime ? (
              <time dateTime={dateTime}>{meta}</time>
            ) : (
              <span>{meta}</span>
            )
          ) : null}
        </p>
      ) : null}
      {title ? <Title id={id}>{title}</Title> : null}
      {text ? <p className="card-support">{text}</p> : null}
      {children}
    </header>
  )
}

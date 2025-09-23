export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  subheading,
  description,
  alignment = 'center',
  className = '',
}) {
  const alignments = {
    center: 'items-center text-center',
    left: 'items-start text-left',
    right: 'items-end text-right',
  };

  const alignmentClasses = alignments[alignment] ?? alignments.center;

  return (
    <div
      className={`mx-auto flex max-w-3xl flex-col gap-4 ${alignmentClasses} ${className}`.trim()}
      data-aos="fade-up"
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-royal-gold/30 bg-royal-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-royal-muted dark:border-white/10 dark:bg-white/5 dark:text-royal-white/70">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight text-royal-heading sm:text-4xl dark:text-royal-white">
        {title}
        {highlight ? <span className="text-royal-gold"> {highlight}</span> : null}
      </h2>
      {subheading ? (
        <p className="font-heading text-xl text-royal-gold dark:text-royal-gold">{subheading}</p>
      ) : null}
      {description ? (
        <p className="text-base leading-relaxed text-royal-muted dark:text-royal-white/70">{description}</p>
      ) : null}
    </div>
  );
}

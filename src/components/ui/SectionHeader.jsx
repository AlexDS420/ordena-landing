// Encabezado de sección: badge pill + H2 + subtítulo, centrado.
export default function SectionHeader({ badge, icon: Icon, title, subtitle, id }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {badge && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-4 py-1.5 text-[13px] font-medium text-muted shadow-soft">
          {Icon && <Icon size={14} strokeWidth={1.8} aria-hidden="true" />}
          {badge}
        </span>
      )}
      <h2 id={id} className="mt-5 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-muted md:text-[17px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

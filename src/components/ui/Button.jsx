// Botones: primario charcoal pill / secundario blanco con borde sutil.
const base =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';
const stylesFor = (variant) =>
  variant === 'primary'
    ? 'bg-ink text-white hover:bg-[#263043] active:translate-y-px shadow-soft'
    : 'bg-white text-ink border border-hairline hover:bg-page-soft active:translate-y-px';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button className={`${base} ${stylesFor(variant)} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({ children, variant = 'primary', href, className = '', ...props }) {
  return (
    <a href={href} className={`${base} ${stylesFor(variant)} ${className}`} {...props}>
      {children}
    </a>
  );
}

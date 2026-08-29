// CTA final: tarjeta grande con glow cálido y botón hacia el formulario.
import { finalCta } from '../../data/content.js';
import { ButtonLink } from '../ui/Button.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="pb-20 md:pb-28">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <Reveal className="relative overflow-hidden rounded-xl border border-hairline bg-white px-6 py-14 text-center shadow-ambient md:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-full"
            style={{ background: 'radial-gradient(640px 260px at 50% 0%, rgba(212,168,83,0.10), transparent 70%)' }}
          />
          <div className="relative mx-auto max-w-[640px]">
            <h2
              id="cta-title"
              className="text-[clamp(1.9rem,3.6vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.02em] text-ink"
            >
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[16.5px] leading-relaxed text-muted">
              {finalCta.subtitle}
            </p>
            <ButtonLink href={finalCta.button.href} className="mt-8">
              {finalCta.button.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Testimonios: grid 3 columnas con avatares de iniciales.
// PLACEHOLDER: los textos provienen de content.js marcados como ejemplo.
import { Users } from 'lucide-react';
import { testimonials } from '../../data/content.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-gold">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonios" aria-labelledby="testi-title" className="bg-page-soft py-20 md:py-28">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <SectionHeader id="testi-title" badge={testimonials.badge} icon={Users} title={testimonials.title} subtitle={testimonials.subtitle} />
        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 90}>
              <figure className="flex h-full flex-col rounded-lg border border-hairline bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift md:p-7">
                <Stars />
                <blockquote className="mt-4 flex-1 text-[15.5px] leading-relaxed text-[#374151]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-bold ${t.tone}`}
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-ink-soft">{t.name}</span>
                    <span className="block text-[13px] text-faint">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

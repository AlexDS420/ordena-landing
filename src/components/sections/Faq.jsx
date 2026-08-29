// FAQ: acordeón accesible + contacto por correo.
import { CircleHelp } from 'lucide-react';
import { faq } from '../../data/content.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import Accordion from '../ui/Accordion.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <SectionHeader id="faq-title" badge={faq.badge} icon={CircleHelp} title={faq.title} subtitle={faq.subtitle} />
        <Reveal delay={100} className="mx-auto mt-12 max-w-[880px] rounded-lg border border-hairline bg-white px-6 py-2 shadow-soft md:mt-14 md:px-12">
          <Accordion items={faq.items} />
          <div className="mt-6 border-t border-hairline py-8 text-center">
            <p className="text-[15.5px] text-muted">{faq.contactLabel}</p>
            <a
              href={`mailto:${faq.contactEmail}`}
              className="mt-1.5 inline-block text-[20px] font-semibold text-gold-deep transition-colors hover:text-gold-deep hover:underline"
            >
              {faq.contactEmail}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

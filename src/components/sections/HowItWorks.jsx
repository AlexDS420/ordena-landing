// Cómo funciona: 5 pasos en retícula 3+2 con conectores punteados coral.
import { Route } from 'lucide-react';
import { workflow } from '../../data/content.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';

function StepCard({ step, index }) {
  return (
    <div className="relative rounded-md border border-hairline bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-[15px] font-bold text-gold-deep"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="mt-4 text-[17px] font-semibold leading-snug text-ink-soft">{step.title}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{step.desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  const [a, b, c, d, e] = workflow.steps;
  return (
    <section id="como-funciona" aria-labelledby="how-title" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <SectionHeader id="how-title" badge={workflow.badge} icon={Route} title={workflow.title} subtitle={workflow.subtitle} />
        <Reveal delay={100} className="mt-12 rounded-xl border border-hairline bg-white/60 p-5 shadow-soft md:mt-14 md:p-10">
          <div className="relative">
            {/* Conectores punteados (solo desktop) */}
            <svg className="pointer-events-none absolute inset-0 hidden lg:block" width="100%" height="100%" aria-hidden="true">
              <path d="M 266 44 H 456" stroke="#F87171" strokeWidth="1.6" strokeDasharray="6 6" fill="none" opacity="0.75" />
              <path d="M 646 44 H 836" stroke="#F87171" strokeWidth="1.6" strokeDasharray="6 6" fill="none" opacity="0.75" />
              <path d="M 100 110 V 150 Q 100 170 120 170 H 936 Q 956 170 956 150 V 110" stroke="#F87171" strokeWidth="1.6" strokeDasharray="6 6" fill="none" opacity="0.75" transform="translate(210 0)" />
            </svg>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[a, b, c].map((s, i) => (
                <StepCard key={s.title} step={s} index={i} />
              ))}
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:mx-auto lg:max-w-[66%]">
              {[d, e].map((s, i) => (
                <StepCard key={s.title} step={s} index={i + 3} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Cómo funciona: 5 pasos en retícula 3+2 con conectores punteados coral
// alineados a los gaps del grid (sin coordenadas fijas).
import { Route } from 'lucide-react';
import { workflow } from '../../data/content.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';

function StepCard({ step, index, connectorClass = '' }) {
  return (
    <div className="relative rounded-md border border-hairline bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift">
      {connectorClass && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-[46px] -right-5 z-10 w-5 border-t-2 border-dashed border-coral ${connectorClass}`}
        />
      )}
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
          {/* Conectores: entre tarjetas adyacentes del mismo grid, dibujados sobre el gap.
              Fila 1 (3 col en lg): 1→2 y 2→3. Fila 2 (2 col): 4→5. */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <StepCard step={a} index={0} connectorClass="hidden md:block" />
            <StepCard step={b} index={1} connectorClass="hidden lg:block" />
            <StepCard step={c} index={2} />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:mx-auto lg:max-w-[66%]">
            <StepCard step={d} index={3} connectorClass="hidden md:block" />
            <StepCard step={e} index={4} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

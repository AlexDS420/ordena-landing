// Funciones: dos tarjetas grandes (clientes / equipo) con filas internas.
import { QrCode, ShoppingCart, Zap, Monitor, RefreshCw, Timer, LayoutGrid } from 'lucide-react';
import { features } from '../../data/content.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';

const iconMap = {
  qr: QrCode,
  cart: ShoppingCart,
  zap: Zap,
  monitor: Monitor,
  refresh: RefreshCw,
  timer: Timer,
};

export default function Features() {
  return (
    <section id="funciones" aria-labelledby="features-title" className="scroll-mt-24 bg-page-soft py-20 md:py-28">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <SectionHeader id="features-title" badge={features.badge} icon={LayoutGrid} title={features.title} subtitle={features.subtitle} />
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2">
          {features.groups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 120}>
              <div className="h-full rounded-lg border border-hairline bg-white p-6 shadow-soft md:p-9">
                <span className="inline-flex rounded-full border border-hairline bg-page-soft px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-soft">
                  {group.label}
                </span>
                <ul className="mt-6 space-y-3.5">
                  {group.items.map((item) => {
                    const Icon = iconMap[item.icon] ?? Zap;
                    return (
                      <li
                        key={item.title}
                        className="flex items-start gap-4 rounded-md border border-hairline bg-page-soft p-4 transition-shadow duration-300 hover:shadow-soft md:p-5"
                      >
                        <span
                          aria-hidden="true"
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-gold-deep"
                        >
                          <Icon size={19} strokeWidth={1.8} />
                        </span>
                        <div>
                          <h3 className="text-[16.5px] font-semibold text-ink-soft">{item.title}</h3>
                          <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{item.desc}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

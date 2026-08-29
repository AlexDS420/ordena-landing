// Propuesta de valor: 4 beneficios + teléfono ilustrativo sobre blob cálido.
import { Zap, Wallet, ListChecks, Headphones, Rocket, Search } from 'lucide-react';
import { valueProps } from '../../data/content.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import PhoneFrame from '../ui/PhoneFrame.jsx';
import Reveal from '../ui/Reveal.jsx';

const iconMap = { zap: Zap, wallet: Wallet, checklist: ListChecks, headphones: Headphones };

function PhoneMenu() {
  const p = valueProps.phone;
  return (
    <PhoneFrame>
      <div className="p-4 pt-9">
        <p className="text-[14px] font-bold leading-snug text-ink">{p.header}</p>
        <div className="mt-3 flex items-center gap-2 rounded-full bg-page-soft px-3.5 py-2 text-[12px] text-faint">
          <Search size={13} strokeWidth={1.8} aria-hidden="true" />
          Buscar en el menú
        </div>
        <ul className="mt-3 space-y-2.5">
          {p.items.map((item) => (
            <li key={item.name} className="flex items-center justify-between gap-2 rounded-[14px] border border-hairline bg-white px-3 py-2.5">
              <div>
                <p className="text-[12.5px] font-semibold text-ink">{item.name}</p>
                <p className="text-[11.5px] text-muted">{item.price}</p>
              </div>
              <span className="rounded-full bg-coral/90 px-2.5 py-1 text-[10.5px] font-bold text-white">{p.add}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-around rounded-[16px] border border-hairline bg-page-soft px-3 py-2.5 text-[10.5px] font-medium text-faint">
          <span>Menú</span>
          <span>Pedidos</span>
          <span>Cuenta</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function ValueProps() {
  return (
    <section id="beneficios" aria-labelledby="value-title" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <SectionHeader id="value-title" badge={valueProps.badge} icon={Rocket} title={valueProps.title} subtitle={valueProps.subtitle} />
        <Reveal delay={100} className="relative mt-12 overflow-hidden rounded-xl border border-hairline bg-white shadow-soft md:mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-60px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(251,146,120,0.16), transparent 65%)' }}
          />
          <div className="relative grid items-center gap-10 p-6 md:grid-cols-2 md:p-10">
            <ul className="space-y-3.5">
              {valueProps.items.map((item) => {
                const Icon = iconMap[item.icon] ?? Zap;
                return (
                  <li key={item.title} className="flex items-start gap-4 rounded-md border border-hairline bg-page-soft p-4 md:p-5">
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
            <div className="relative pb-2">
              <PhoneMenu />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

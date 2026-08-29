// Hero: badge, H1 con acento, CTAs y dashboard ilustrativo en marco de navegador.
import { ClipboardList, BookOpen, History, Settings, Sparkles } from 'lucide-react';
import { hero } from '../../data/content.js';
import { ButtonLink } from '../ui/Button.jsx';
import BrowserFrame from '../ui/BrowserFrame.jsx';
import Reveal from '../ui/Reveal.jsx';

const sidebarIcons = [ClipboardList, BookOpen, History, Settings];

const statusTone = {
  amber: 'bg-cream text-gold-deep',
  green: 'bg-[#E4EFE4] text-[#3F6C42]',
  gray: 'bg-page text-muted',
  faint: 'bg-page-soft text-faint',
};

function Dashboard() {
  const d = hero.dashboard;
  return (
    <div className="flex">
      <div className="hidden w-[190px] shrink-0 border-r border-hairline bg-page-soft p-4 sm:block" aria-hidden="true">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-ink text-gold">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
              <circle cx="12" cy="12" r="7" />
            </svg>
          </span>
          <span className="text-[13px] font-bold text-ink">Ordena</span>
        </div>
        <ul className="mt-4 space-y-1">
          {d.sidebar.map((item, i) => {
            const Icon = sidebarIcons[i] ?? ClipboardList;
            return (
              <li
                key={item}
                className={`flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] font-medium ${
                  i === 0 ? 'bg-white text-ink shadow-soft' : 'text-muted'
                }`}
              >
                <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="min-w-0 flex-1 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-bold text-ink">{d.title}</p>
          <span className="hidden rounded-full bg-page-soft px-3 py-1 text-[11px] font-medium text-faint sm:block">
            Actualizado en vivo
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {d.stats.map((s) => (
            <div key={s.label} className="rounded-[14px] border border-hairline bg-white px-3 py-2.5 sm:px-4 sm:py-3">
              <p className="truncate text-[11px] font-medium text-faint sm:text-[12px]">{s.label}</p>
              <p className="mt-0.5 text-lg font-bold tracking-tight text-ink sm:text-xl">{s.value}</p>
            </div>
          ))}
        </div>
        <ul className="mt-4 space-y-2.5">
          {d.orders.map((o) => (
            <li key={o.id} className="flex items-center gap-3 rounded-[14px] border border-hairline bg-white px-3.5 py-3 sm:px-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">
                  {o.id} · {o.table}
                </p>
                <p className="mt-0.5 truncate text-[12.5px] text-muted">{o.items}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusTone[o.tone]}`}>
                {o.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-36">
      {/* Luz atmosférica cálida, muy tenue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            'radial-gradient(600px 340px at 50% 6%, rgba(212,168,83,0.10), transparent 70%), radial-gradient(700px 380px at 82% 30%, rgba(251,146,120,0.06), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-content px-6 md:px-8">
        <Reveal className="mx-auto max-w-[860px] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-4 py-1.5 text-[13px] font-medium text-muted shadow-soft">
            <Sparkles size={14} strokeWidth={1.8} aria-hidden="true" />
            {hero.badge}
          </span>
          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink"
          >
            {hero.titleStart}
            <span className="text-gold">{hero.titleAccent}</span>
            {hero.titleEnd}
          </h1>
          <p className="mx-auto mt-5 max-w-[660px] text-[16.5px] leading-relaxed text-muted">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <p className="mt-4 text-[13px] text-faint">{hero.microcopy}</p>
        </Reveal>
        <Reveal delay={120} className="relative mt-14 pb-6 md:mt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 -top-6 bottom-0 rounded-tl-[40px]"
            style={{ background: 'radial-gradient(520px 260px at 50% 20%, rgba(212,168,83,0.14), transparent 70%)' }}
          />
          <BrowserFrame label="Vista ilustrativa del panel de pedidos de Ordena">
            <Dashboard />
          </BrowserFrame>
        </Reveal>
      </div>
    </section>
  );
}

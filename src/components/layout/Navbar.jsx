// Navbar sticky translúcida con menú móvil accesible.
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigation } from '../../data/content.js';
import { ButtonLink } from '../ui/Button.jsx';

export function Logo({ className = '' }) {
  return (
    <a href="#inicio" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Ordena — inicio">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-ink text-gold"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4">
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className="text-[17px] font-bold tracking-[-0.01em] text-ink">{navigation.brand}</span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-hairline bg-white/90 backdrop-blur-md' : 'bg-page/70 backdrop-blur-sm'
      }`}
    >
      <nav aria-label="Navegación principal" className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-6 md:h-20 md:px-8">
        <Logo />
        <ul className="hidden items-center gap-7 lg:flex">
          {navigation.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[14.5px] font-medium text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <ButtonLink href={navigation.cta.href} className="hidden h-10 px-5 text-sm md:inline-flex">
            {navigation.cta.label}
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
          </button>
        </div>
      </nav>
      <div
        id="menu-movil"
        className={`overflow-hidden border-t border-hairline bg-white/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
          open ? 'max-h-[420px]' : 'max-h-0 border-t-0'
        }`}
      >
        <ul className="space-y-1 px-6 py-4">
          {navigation.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-[12px] px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-page-soft"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <ButtonLink href={navigation.cta.href} className="w-full" onClick={() => setOpen(false)}>
              {navigation.cta.label}
            </ButtonLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

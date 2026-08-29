// Footer minimalista: marca + columnas de enlaces reales + legal.
import { footer } from '../../data/content.js';
import { Logo } from './Navbar.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-white">
      <div className="mx-auto grid w-full max-w-content gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-[260px] text-[14.5px] leading-relaxed text-muted">{footer.description}</p>
        </div>
        {footer.groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-faint">{group.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[14.5px] text-muted transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto flex w-full max-w-content flex-col items-center justify-between gap-2 px-6 py-6 text-[13px] text-faint sm:flex-row md:px-8">
          <p>© {new Date().getFullYear()} {footer.brand} · {footer.copyright}</p>
          <p>{footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

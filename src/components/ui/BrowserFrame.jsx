// Marco de navegador premium para el dashboard del hero.
export default function BrowserFrame({ children, label }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative mx-auto w-full max-w-[1040px] rounded-lg border border-hairline bg-white shadow-ambient"
    >
      <div className="flex items-center gap-1.5 border-b border-hairline px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#F1B4AC]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#F3D9A4]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#BFD8BC]" aria-hidden="true" />
        <span className="ml-3 hidden h-6 flex-1 rounded-full bg-page-soft sm:block" aria-hidden="true" />
      </div>
      <div className="pointer-events-none select-none">{children}</div>
    </div>
  );
}

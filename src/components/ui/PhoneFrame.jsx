// Marco de teléfono para la ilustración del menú.
export default function PhoneFrame({ children }) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-[260px] rounded-[40px] border-[10px] border-ink bg-ink shadow-ambient sm:w-[290px]"
    >
      <div className="absolute left-1/2 top-2.5 z-10 h-[18px] w-[90px] -translate-x-1/2 rounded-full bg-ink" />
      <div className="overflow-hidden rounded-[30px] bg-white">
        {children}
      </div>
    </div>
  );
}

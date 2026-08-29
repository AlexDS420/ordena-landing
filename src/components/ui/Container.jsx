// Contenedor central de la retícula global.
export default function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-content px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

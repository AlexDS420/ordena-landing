// ============================================================
// content.js — TODA la copy editable de la landing vive aquí.
// EDITABLE: cambia textos sin tocar componentes.
// ============================================================

export const navigation = {
  brand: 'Ordena',
  links: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Funciones', href: '#funciones' },
    { label: 'Beneficios', href: '#beneficios' },
    { label: 'Preguntas', href: '#faq' },
  ],
  cta: { label: 'Solicitar demo', href: '#contacto' },
};

export const hero = {
  badge: 'Pedidos en línea para restaurantes',
  titleStart: 'Los pedidos de tu restaurante, ',
  titleAccent: 'más simples y más rápidos',
  titleEnd: '.',
  subtitle:
    'Ordena permite que tus clientes pidan desde la web, paguen con QR y sigan su pedido en tiempo real, mientras tu equipo lo gestiona todo desde un panel claro y ordenado.',
  primaryCta: { label: 'Solicitar demo', href: '#contacto' },
  secondaryCta: { label: 'Ver cómo funciona', href: '#como-funciona' },
  microcopy: 'Sin instalación para tus clientes · Registro de cada pedido',
  // EDITABLE: los datos del panel son una ilustración de la interfaz, no datos reales.
  dashboard: {
    title: 'Pedidos de hoy',
    sidebar: ['Pedidos', 'Menú', 'Historial', 'Ajustes'],
    stats: [
      { label: 'Pedidos nuevos', value: 8 },
      { label: 'En preparación', value: 3 },
      { label: 'Listos', value: 5 },
    ],
    orders: [
      { id: '#1024', table: 'Mesa 4', items: '2× Arepa rellena, 1× Jugo natural', status: 'En preparación', tone: 'amber' },
      { id: '#1023', table: 'Mesa 2', items: '1× Sopa del día', status: 'Listo', tone: 'green' },
      { id: '#1022', table: 'Para llevar', items: '3× Empanadas', status: 'Recibido', tone: 'gray' },
      { id: '#1021', table: 'Mesa 1', items: '2× Café, 1× Postre', status: 'Entregado', tone: 'faint' },
    ],
  },
};

export const workflow = {
  badge: 'Cómo funciona',
  title: 'Pedir es así de simple',
  subtitle:
    'El cliente explora, pide y paga en minutos. Cada paso llega al panel del restaurante y se actualiza al instante.',
  steps: [
    { title: 'El cliente pide desde la web', desc: 'Abre el menú, elige sus platos y arma su pedido sin instalar nada.' },
    { title: 'Añade lo que quiere al carrito', desc: 'Revisa y ajusta su pedido antes de confirmarlo.' },
    { title: 'Paga fácilmente con QR', desc: 'Escanea el código y confirma el pago desde su app de pagos.' },
    { title: 'El restaurante lo recibe en su panel', desc: 'Cada pedido entra al dashboard con todos sus detalles.' },
    { title: 'El estado se actualiza en tiempo real', desc: 'De recibido a entregado, el cliente ve cada paso.' },
  ],
};

export const features = {
  badge: 'Funciones',
  title: 'Una sola plataforma para tus clientes y tu equipo',
  subtitle:
    'Del menú digital al panel de gestión: todo lo que necesitas para recibir pedidos y mantener la operación ordenada.',
  groups: [
    {
      label: 'Para tus clientes',
      items: [
        { title: 'Pago con QR', desc: 'Cobros digitales ágiles, sin terminales extra.', icon: 'qr' },
        { title: 'Carrito de compras', desc: 'Pedidos flexibles, ajustables hasta el último detalle.', icon: 'cart' },
        { title: 'Pedidos en línea rápidos', desc: 'Menú claro y pedido en pocos toques.', icon: 'zap' },
      ],
    },
    {
      label: 'Para tu equipo',
      items: [
        { title: 'Panel en tiempo real', desc: 'Todos los pedidos visibles al instante, en un solo lugar.', icon: 'monitor' },
        { title: 'Estados del pedido', desc: 'Actualizaciones claras de recibido a entregado.', icon: 'refresh' },
        { title: 'Operación más ágil', desc: 'Menos idas y vueltas entre mostrador y cocina.', icon: 'timer' },
      ],
    },
  ],
};

export const valueProps = {
  badge: 'Propuesta de valor',
  title: 'Una mejor forma de gestionar pedidos',
  subtitle:
    'De la velocidad a la claridad: cada pedido fluye de principio a fin. Tus clientes lo siguen con total transparencia y tu equipo trabaja sin fricción.',
  items: [
    { title: 'Rápido y práctico', desc: 'Pedidos que fluyen sin esperas ni fricción.', icon: 'zap' },
    { title: 'Pago sencillo', desc: 'Cobros con QR listos para usar desde el primer día.', icon: 'wallet' },
    { title: 'Estado transparente', desc: 'Cada pedido visible en su punto exacto del flujo.', icon: 'checklist' },
    { title: 'Servicio eficiente', desc: 'El equipo enfocado en atender, no en descifrar notas.', icon: 'headphones' },
  ],
  // EDITABLE: ilustración del menú dentro del teléfono (no son datos reales).
  phone: {
    header: 'Buenas, ¿qué pedimos hoy?',
    items: [
      { name: 'Arepa rellena', price: '$12.000' },
      { name: 'Jugo natural', price: '$6.500' },
      { name: 'Sopa del día', price: '$9.800' },
    ],
    add: '+ Agregar',
  },
};

// PLACEHOLDER: reemplazar con testimonios reales cuando existan.
export const testimonials = {
  badge: 'Testimonios',
  title: 'Lo que dicen nuestros usuarios',
  subtitle: 'Historias de la experiencia que buscamos crear en cada pedido.',
  items: [
    { quote: 'Pedir desde el celular fue inmediato. Sin filas y sin confusiones.', name: 'Mariana G.', role: 'Cliente frecuente', initials: 'MG', tone: 'bg-[#FDE7D8] text-[#B45309]', placeholder: true },
    { quote: 'El panel nos ordenó la operación del mostrador por completo.', name: 'Diego R.', role: 'Encargado de local', initials: 'DR', tone: 'bg-[#E8EFD8] text-[#4D7C0F]', placeholder: true },
    { quote: 'Los clientes ven el estado de su pedido y preguntan mucho menos.', name: 'Camila T.', role: 'Cajera', initials: 'CT', tone: 'bg-[#FCE9E4] text-[#C2410C]', placeholder: true },
    { quote: 'El pago con QR agilizó el cierre de cada mesa.', name: 'Andrés P.', role: 'Propietario', initials: 'AP', tone: 'bg-[#E5E9F5] text-[#3730A3]', placeholder: true },
    { quote: 'Tener el menú online nos liberó el teléfono del local.', name: 'Lucía M.', role: 'Administradora', initials: 'LM', tone: 'bg-[#F5E6D3] text-[#92400E]', placeholder: true },
    { quote: 'Actualizar el estado de un pedido toma un segundo.', name: 'Sebastián V.', role: 'Cocina', initials: 'SV', tone: 'bg-[#E0F0EC] text-[#0F766E]', placeholder: true },
  ],
};

export const faq = {
  badge: 'Preguntas frecuentes',
  title: 'Todo lo que necesitas saber',
  subtitle: 'Respondemos las dudas más comunes sobre cómo funciona Ordena.',
  items: [
    {
      q: '¿Necesito instalar una aplicación para pedir?',
      a: 'No. Los clientes piden directamente desde el sitio web: abren el menú, eligen sus platos y confirman el pedido sin instalar nada.',
    },
    {
      q: '¿Cómo funciona el pago con QR?',
      a: 'Al confirmar el pedido se genera un código QR. El cliente lo escanea con su app de pagos y el pedido queda registrado en el panel del restaurante.',
    },
    {
      q: '¿Puedo seguir mi pedido después de pagar?',
      a: 'Sí. Cada pedido muestra su estado en tiempo real: recibido, en preparación, listo y entregado.',
    },
    {
      q: '¿Para quién está diseñada la plataforma?',
      a: 'Para restaurantes, cafeterías y locales de comida que quieren recibir pedidos en línea y gestionarlos desde un solo panel.',
    },
    {
      q: '¿Cómo empiezo a usarla?',
      a: 'Completa el formulario de contacto y te mostramos una demo con el flujo completo de pedidos.',
    },
  ],
  // EDITABLE: correo provisional de contacto.
  contactLabel: '¿Tienes más preguntas?',
  contactEmail: 'hola@ordena.app',
};

export const finalCta = {
  title: 'Es momento de modernizar la forma en que recibes pedidos',
  subtitle: 'Cuéntanos de tu restaurante y te mostramos cómo Ordena se adapta a tu operación.',
  button: { label: 'Solicitar demo', href: '#contacto' },
};

export const contact = {
  badge: 'Contacto',
  title: 'Solicita una demo',
  subtitle: 'Déjanos tus datos y te contactamos para agendar una demostración.',
  fields: {
    name: 'Nombre',
    company: 'Empresa',
    email: 'Correo',
    phone: 'Teléfono',
    message: 'Mensaje',
  },
  submit: 'Enviar solicitud',
  submitting: 'Enviando…',
  success: {
    title: '¡Listo! Recibimos tu solicitud.',
    detail: 'Te contactaremos pronto para agendar tu demostración.',
    again: 'Enviar otra solicitud',
  },
  error: {
    title: 'No pudimos registrar tu solicitud.',
    detail: 'Revisa tu conexión e inténtalo de nuevo en unos segundos.',
  },
};

export const footer = {
  brand: 'Ordena',
  description: 'Pedidos en línea y gestión de pedidos para restaurantes, en un solo panel.',
  groups: [
    {
      title: 'Producto',
      links: [
        { label: 'Cómo funciona', href: '#como-funciona' },
        { label: 'Funciones', href: '#funciones' },
        { label: 'Beneficios', href: '#beneficios' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { label: 'Preguntas frecuentes', href: '#faq' },
        { label: 'Solicitar demo', href: '#contacto' },
      ],
    },
    {
      title: 'Contacto',
      links: [{ label: 'hola@ordena.app', href: 'mailto:hola@ordena.app' }],
    },
  ],
  copyright: 'Todos los derechos reservados',
  tagline: 'Hecho con dedicación para equipos de cocina',
};

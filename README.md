# Ordena — Landing page

Landing de una sola página para **Ordena**, plataforma de pedidos en línea para
restaurantes. Construida con React + Vite + Tailwind CSS (JavaScript), íconos
Lucide y fuente Inter self-hosted.

**Demo en producción:** https://alexds420.github.io/ordena-landing/

## Estructura

```
landing-ordena/
├── index.html          # SEO: title, description, canonical, OG, JSON-LD
├── public/favicon.svg  # favicon (marca provisional "O" dorada)
└── src/
    ├── data/content.js # ✏️ TODA la copy editable (nav, hero, pasos, funciones, testimonios, FAQ, footer)
    ├── lib/supabase.js # cliente Supabase opcional (env)
    ├── services/       # leadService (persistencia) + emailService (notificación opcional)
    ├── components/
    │   ├── ui/         # Container, SectionHeader, Button, Reveal, BrowserFrame, PhoneFrame, Accordion
    │   ├── layout/     # Navbar (sticky + menú móvil), Footer
    │   ├── sections/   # Hero, HowItWorks, Features, ValueProps, Testimonials, Faq, FinalCta, Contact
    │   └── forms/      # LeadForm (validación, honeypot, estados)
    └── App.jsx         # orden de secciones y skip-link
```

## Editar contenidos

1. Abre `src/data/content.js`: cada bloque está comentado con `// EDITABLE`.
2. **Testimonios:** los 6 actuales son `placeholder: true` (ejemplos de
   plantilla). Sustitúyelos por testimonios reales (nombre, rol, cita) sin
   cambiar la estructura.
3. **Correo de contacto:** `hola@ordena.app` es provisional — cámbialo en
   `faq.contactEmail` y en `footer.groups` (Contacto).
4. **Mockups:** el dashboard del hero y el teléfono son ilustraciones CSS con
   datos de ejemplo definidos en `content.js` (`hero.dashboard`,
   `valueProps.phone`). Cuando tengas capturas reales del producto, reemplaza
   `<Dashboard />` y `<PhoneMenu />` por imágenes optimizadas (WebP, ~1000px de
   ancho) dentro de los mismos marcos.

## Desarrollo y build

```bash
npm install
npm run dev        # servidor local (Vite)
npm run build      # genera dist/ para producción
npm run preview    # sirve dist/ localmente
```

## Configuración (opcional) — .env

Copia `.env.example` a `.env` y define según corresponda:

| Variable | Uso |
|---|---|
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Si existen, los leads se guardan en la tabla `leads` de Supabase (usa solo clave anónima + RLS con INSERT). |
| `VITE_LEAD_ENDPOINT` | URL del endpoint de leads. Por defecto `/api/leads` (same-origin). En producción actual está apuntando al Worker de Cloudflare. |
| `VITE_EMAILJS_SERVICE_ID` / `VITE_EMAILJS_TEMPLATE_ID` / `VITE_EMAILJS_PUBLIC_KEY` | Notificación por email opcional. Su fallo nunca invalida un lead ya guardado. |

**Nunca** subas `.env` al repositorio (ya está en `.gitignore`), ni uses claves
`service_role` en el navegador.

## Registro de leads (producción)

- La página guarda cada envío en **Cloudflare D1** mediante el Worker
  `ordena-leads-api` (carpeta hermana `landing-ordena-worker/`).
- Endpoint: `POST https://ordena-leads-api.alexds-apps.workers.dev/api/leads`
- Consulta de leads (requiere el token admin entregado por separado):

```bash
curl -s https://ordena-leads-api.alexds-apps.workers.dev/api/leads \
  -H "authorization: Bearer $ADMIN_TOKEN"
```

- Anti-spam incluido: honeypot (`website` debe ir vacío), tiempo mínimo de
  2000 ms desde la carga del formulario y bloqueo de reenvíos <10 s.

## Despliegue

El sitio estático (`dist/`) se publica en **GitHub Pages** (branch `gh-pages`
del repo `AlexDS420/ordena-landing`). Para volver a desplegar tras un cambio:

```bash
npm run build
bash ../.cluster/landing-ordena/tools/deploy-gh-pages.sh ./dist "actualiza contenidos"
```

Requisitos: `gh` CLI autenticado (`gh auth status`).

## Rollback (volver a la versión anterior)

**Opción 1 — GitHub (recomendada):** entra al repo → pestaña *Actions* no es
necesaria; usa el historial de la branch `gh-pages`:

```bash
gh api repos/AlexDS420/ordena-landing/commits?sha=gh-pages   # lista versiones
git clone https://github.com/AlexDS420/ordena-landing -b gh-pages
# checkout del commit anterior y push:
git checkout <commit-anterior> && git push --force origin HEAD:gh-pages
```

La reversión en Pages tarda ~1 minuto en propagarse.

**Opción 2 — Redespliegue local:** si guardaste un snapshot de `dist/`
(recomendado: copia `dist` a `dist-v1/` antes de cada cambio importante),
vuelve a publicarlo con el mismo script:

```bash
bash ../.cluster/landing-ordena/tools/deploy-gh-pages.sh ./dist-v1 "rollback a v1"
```

**API de leads:** el Worker es independiente del sitio. Para revertir su
código, vuelve a subir la versión anterior de `worker.js` (ver
`landing-ordena-worker/deploy-metadata.md`). Los leads nunca se pierden por un
rollback del sitio.

## Accesibilidad y rendimiento

- HTML semántico, landmarks, skip-link, foco visible, acordeón con
  `aria-expanded/controls`, `prefers-reduced-motion` respetado.
- Fuente self-hosted (sin CDN externo), CSS único, cero imágenes binarias.
- Meta SEO completa: title, description, canonical, Open Graph, Twitter Card,
  JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage).

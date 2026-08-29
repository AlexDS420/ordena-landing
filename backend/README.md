# landing-ordena-worker — API de leads para la landing "Ordena"

Worker de Cloudflare (sintaxis módulo) que expone la API de captura de leads
sobre **Cloudflare D1**. Los archivos estáticos de la landing (build de React
en `landing-ordena/`) se sirven mediante la configuración de assets del
proyecto (`run_worker_first: ["/api/*"]`): este worker atiende **solo `/api/*`**
y no construye ni toca los assets.

## Endpoints

| Método | Ruta          | Auth                                  | Descripción |
|--------|---------------|---------------------------------------|-------------|
| POST   | `/api/leads`  | — (pública, same-origin)              | Crea un lead. |
| GET    | `/api/leads`  | `Authorization: Bearer <ADMIN_TOKEN>` | Últimos 200 leads (`ORDER BY id DESC`). |
| GET    | `/api/health` | —                                     | Healthcheck. |
| OPTIONS| `/api/*`      | —                                     | Preflight CORS → 204. |

Otras rutas o métodos bajo `/api/*` → `404 {"ok":false,"error":"not_found"}`.
Todo lo demás lo sirven los assets estáticos (el worker no interviene).

## Contrato de `POST /api/leads`

Body JSON:
- `name` (requerido, 2–120), `email` (requerido, válido, ≤160), `company` (≤120),
  `phone` (≤40), `message` (≤2000), `source` (≤60, por defecto `landing`).
- `website`: **honeypot** — debe ir vacío. Si llega con contenido se responde
  `200 {"ok":true,"id":null}` SIN insertar (no se delata al bot).
- `elapsed`: milisegundos desde que se renderizó el formulario; `< 2000` → `400`.

Respuestas: `201 {"ok":true,"id":<id>}` · `400 {"ok":false,"error":"validation"|"invalid_json"}` ·
`413 payload_too_large` · `500 {"ok":false,"error":"internal"}` (sin detalles internos).

## Configuración (bindings / secretos)

- **Binding D1 `DB`** → base `ordena-leads`, id `56951654-0e94-477b-b4c1-837288b70cf3`
  (tabla `leads`; referencia en `schema.sql`).
- **Secreto `ADMIN_TOKEN`** → token para `GET /api/leads`. Si no está definido,
  el GET responde `401` (fail closed).
- **Var opcional `ALLOWED_ORIGIN`** → si se define, añade
  `Access-Control-Allow-Origin` a las respuestas `/api/*`. Same-origin no la necesita.

## Despliegue

### Opción A — Dashboard (Workers & Pages)
1. Crea el worker (p. ej. `landing-ordena`) y pega el contenido de `worker.js`
   (o usa "deploy with assets" y añade el módulo).
2. Settings → Bindings → D1: nombre de variable `DB`, base `ordena-leads`.
3. Settings → Variables → Secrets: añade `ADMIN_TOKEN`.
4. Añade los assets del build del frontend con la config documentada en
   `deploy-metadata.md` (`run_worker_first: ["/api/*"]`).

### Opción B — wrangler / API
```bash
# Secreto (pedirá el valor por stdin; requiere wrangler.toml o --name):
npx wrangler secret put ADMIN_TOKEN --name landing-ordena

# Despliegue por API multipart (form-data: parte "metadata" + parte "worker.js"):
# el JSON exacto está en deploy-metadata.md.
```
Nota: subiendo assets por API cruda se requiere además la sesión de subida de
assets (manifest + JWT); `wrangler deploy` y el dashboard lo hacen automáticamente.

## Consultar leads

```bash
curl -sS -H "Authorization: Bearer $ADMIN_TOKEN" \
  "https://landing-ordena.<tu-subdominio>.workers.dev/api/leads"
```

Respuesta: `{"ok":true,"count":N,"leads":[...]}` — `count` es el número de leads
devueltos (máx. 200), no el total de la tabla.

## Rotar ADMIN_TOKEN

1. Genera un token nuevo y ejecuta `npx wrangler secret put ADMIN_TOKEN --name landing-ordena`
   (o dashboard → Settings → Variables → Secrets).
2. El nuevo valor aplica de inmediato en la versión publicada; actualiza a quien
   consuma la API (scripts, n8n, hojas de cálculo).
3. Solo existe un token activo: rotar = reemplazar. Tras un incidente, rota el
   token y revisa el histórico con `GET /api/leads`.

## Desarrollo local y pruebas

- Copia `.dev.vars.example` a `.dev.vars` para `wrangler dev` (necesitarás una
  config con el binding D1 `DB`; usa `wrangler d1 execute ordena-leads --local --file=schema.sql`).
- Checklist de pruebas de contrato con curl: `test-contract.md`.

## Seguridad

- INSERT parametrizado con `bind()` (sin SQL concatenado), errores 500 genéricos,
  longitud máxima por campo, honeypot + tiempo mínimo de llenado (`elapsed`).
- Pendiente si aparece spam pese al honeypot: rate limiting (regla WAF) o
  Turnstile en el frontend.

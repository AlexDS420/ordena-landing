# Metadata de despliegue — Worker `ordena-leads-api`

Despliegue vía API (PUT multipart) o wrangler. La configuración equivalente en
`wrangler.toml` sería:

```toml
name = "ordena-leads-api"
main = "worker.js"
compatibility_date = "2026-08-20"

[[d1_databases]]
binding = "DB"
database_name = "ordena-leads"
database_id = "56951654-0e94-477b-b4c1-837288b70cf3"

[vars]
ALLOWED_ORIGIN = "https://alexds420.github.io"
```

Secret: `wrangler secret put ADMIN_TOKEN`

## Bindings usados

| Binding | Tipo | Valor |
|---|---|---|
| `DB` | d1 | id `56951654-0e94-477b-b4c1-837288b70cf3` (base `ordena-leads`) |
| `ADMIN_TOKEN` | secret_text | token largo aleatorio (ver entrega) |
| `ALLOWED_ORIGIN` | plain_text | `https://alexds420.github.io` |

## JSON de metadata multipart (API)

```json
{
  "main_module": "worker.js",
  "compatibility_date": "2026-08-20",
  "bindings": [
    { "type": "d1", "name": "DB", "id": "56951654-0e94-477b-b4c1-837288b70cf3" },
    { "type": "secret_text", "name": "ADMIN_TOKEN", "text": "<token>" },
    { "type": "plain_text", "name": "ALLOWED_ORIGIN", "text": "https://alexds420.github.io" }
  ]
}
```

Endpoint: `PUT /accounts/{account_id}/workers/scripts/ordena-leads-api`
(multipart/form-data: parte `metadata` con el JSON anterior + parte
`worker.js` con `Content-Type: application/javascript+module`).

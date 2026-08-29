# Pruebas de contrato — Worker `ordena-leads-api`

Base: `https://ordena-leads-api.<subdominio>.workers.dev`
Sustituye `<token>` por el valor real de ADMIN_TOKEN.

| # | Prueba | Comando | Esperado |
|---|--------|---------|----------|
| 1 | Salud | `curl -s https://.../api/health` | `{"ok":true,"service":"leads"}` (200) |
| 2 | Inserción válida | `curl -s -X POST https://.../api/leads -H 'content-type: application/json' -d '{"name":"Prueba QA","email":"qa@example.com","message":"envío de prueba","elapsed":9000}'` | `{"ok":true,"id":<n>}` (201) |
| 3 | Email inválido | `... -d '{"name":"X Y","email":"no-es-correo","elapsed":9000}'` | `{"ok":false,"error":"validation"}` (400) |
| 4 | Nombre corto | `... -d '{"name":"A","email":"a@b.co","elapsed":9000}'` | 400 validation |
| 5 | Honeypot | `... -d '{"name":"Bot","email":"b@b.co","website":"http://spam","elapsed":9000}'` | `{"ok":true,"id":null}` (200) SIN insertar (verificar con prueba 7) |
| 6 | Envío instantáneo (bot) | `... -d '{"name":"Rápido","email":"r@b.co","elapsed":100}'` | 400 validation |
| 7 | Lectura con token | `curl -s https://.../api/leads -H 'authorization: Bearer <token>'` | `{"ok":true,"count":<n>,...}` (200) — el lead de la prueba 2 debe aparecer; el del honeypot (5) NO debe estar |
| 8 | Lectura sin token | `curl -s https://.../api/leads` | `{"ok":false,"error":"unauthorized"}` (401) |
| 9 | Ruta inexistente | `curl -s https://.../api/otra` | `{"ok":false,"error":"not_found"}` (404) |
| 10 | Preflight | `curl -s -X OPTIONS https://.../api/leads -H 'origin: https://alexds420.github.io'` | 204 con access-control-allow-origin |

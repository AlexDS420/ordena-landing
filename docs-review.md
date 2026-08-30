# review.md — Revisión cruzada (S4)

## Revisor de fidelidad visual (agente, completado — nota global 8.4/10, veredicto: apto)
Criterios: sistema de diseño 8.5 · fidelidad al arquetipo 9 · jerarquía tipográfica 9 · mockups CSS 8.5 · anti-genérico 7.5.
Hallazgos y estado:
1. ALTA — Conectores How-it-works con px fijos desalineados en retícula fluida → **CORREGIDO v3**: conectores como spans dashed posicionados sobre los gaps del grid (alineación automática a 1024/1280/1440), sin SVG absoluto.
2. MEDIA — Avatares con 6 pares pastel fuera del sistema (anti-Pentagram) → **CORREGIDO v3**: alternancia sand/cream con texto gold-deep (tokens).
3. MEDIA — Contraste acento H1 (#D4A853 ≈2:1 < 3:1 AA texto grande) → **CORREGIDO v3**: span del H1 y email del FAQ usan gold-deep #B45309 (≈5.9:1).
4. MEDIA — Blockquote #374151 fuera de sistema → **CORREGIDO v3**: text-ink-soft.
5. BAJA — PhoneFrame aria-hidden inconsistente → **CORREGIDO v3**: role="img" + aria-label (patrón BrowserFrame).
6. BAJA — Radio md 18px < rango del brief → **CORREGIDO v3**: 20px.
7. BAJA — Hover botón #263043 hardcodeado → ACEPTADO (único tono de hover, coherente); coral duplicado eliminado al reemplazar el SVG (v3 usa border-coral token).

## Revisor de código (agente, EXPIRÓ sin output tras 21 tool calls)
Cobertura reemplazada por verificación nativa focalizada (2026-08-29):
- XSS: sin dangerouslySetInnerHTML/innerHTML en src/ ✅
- Secretos: sin tokens/keys en fuente ni index.html ✅ (token admin solo en archivo local chmod 600)
- dist/index.html: og:image absoluto correcto + favicon con subpath /ordena-landing/ ✅
- Accordion: aria-expanded + aria-controls + role=region ✅ · LeadForm: 5/5 labels ✅
- Imports: sin referencias rotas (build exit 0) ✅
- Contrato form→worker: elapsed + website(honeypot) presentes en leadService; validación duplicada coherente (name 2–120, email regex, recortes) ✅
- Evidencia instrumental previa: Lighthouse a11y 96 / BP 100 / SEO 100 · 0 errores consola (Chromium y WebKit) · E2E formulario con lead en D1 ✅

## Resultado
Todos los hallazgos alta/media resueltos y desplegados en v3 (hash JS index-B1qbjPPS.js, CSS index-BHm8mu2u.css). QA v3: 0 errores de consola a 1280/1024/375, sin overflow. Capturas actualizadas en qa/ y DELIVERY/.

## Revisor de código (agente, completado tardío — veredicto: no bloquea la entrega)
Hallazgos y estado final (v4, desplegada):
- A1 ALTA menú móvil enfocable cerrado → **CORREGIDO v4** (`invisible` fuera de tabulación/SR; verificado con prueba de foco real: focus() no mueve el foco; Escape cierra y devuelve foco al toggle).
- A2 ALTA testimonios ficticios → **DECISIÓN DE CONTENIDO documentada**: sección mantenida por fidelidad al arquetipo; marcados `placeholder: true` en content.js + README + guía; deben sustituirse antes de campañas.
- M1 elapsed desde montaje pierde leads con autofill → **CORREGIDO v4**: se mide desde el primer foco/tecla y umbral del worker bajado a 800 ms (probado: 900 ms → 201).
- M2 lastSuccessAt sin reset → **CORREGIDO v4** (reset() lo limpia).
- M3 text-faint en texto con significado → **CORREGIDO v4** (5 puntos → text-muted AA 4.8:1).
- M4 honeypot inerte → **CORREGIDO v4** (input con estado real; el valor viaja en el payload).
- M5 peso muerto Supabase/EmailJS en bundle → **CORREGIDO v4** (imports dinámicos; solo se descargan si hay env o post-submit).
- B1 field en errores 400 → **CORREGIDO v4** (worker responde field; frontend mapea al campo).
- B3 Container/prop muertos → **CORREGIDO v4** (eliminados).
- B5 Escape en menú → **CORREGIDO v4** (Escape + refoco al toggle).
- B7 contraste links nav → **CORREGIDO v4** (text-ink-soft).
- B2 correo provisional → documentado en guía (reemplazar antes de promocionar).
- B4 acordeón SR (impacto mínimo, sin focusables dentro) → aceptado.
- B6 rate-limit → documentado (Turnstile/WAF como siguiente capa; ya en guía).
QA v4: formulario E2E éxito (lead id=4 en D1, 2026-08-30 03:15:16) · 0 errores consola · overflow 0 · foco verificado.

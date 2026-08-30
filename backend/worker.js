/**
 * Worker de captura de leads — landing "Ordena".
 * Atiende SOLO /api/*; el resto del tráfico lo sirven los assets estáticos
 * (config de assets del proyecto con run_worker_first: ["/api/*"]).
 *
 * Bindings:
 *  - DB:             base D1 "ordena-leads" (tabla leads).
 *  - ADMIN_TOKEN:    secreto para GET /api/leads (Authorization: Bearer).
 *  - ALLOWED_ORIGIN: opcional; origen CORS para /api/* (vacío = same-origin).
 */

const LIMITES = {
  name: 120,
  company: 120,
  email: 160,
  phone: 40,
  message: 2000,
  source: 60,
};

// Regex simple (no exhaustiva): algo@algo.tld
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Respuesta JSON para /api/* con CORS opcional. */
function json(data, status, env) {
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  };
  if (env && env.ALLOWED_ORIGIN) {
    headers['access-control-allow-origin'] = env.ALLOWED_ORIGIN;
    headers.vary = 'Origin';
  }
  return new Response(JSON.stringify(data), { status, headers });
}

/** Preflight CORS (204) para /api/*. */
function preflight(env) {
  const headers = {
    'access-control-allow-methods': 'POST, GET, OPTIONS',
    'access-control-allow-headers': 'content-type, authorization',
    'access-control-max-age': '86400',
  };
  if (env && env.ALLOWED_ORIGIN) {
    headers['access-control-allow-origin'] = env.ALLOWED_ORIGIN;
    headers.vary = 'Origin';
  }
  return new Response(null, { status: 204, headers });
}

/** Normaliza a string recortado; cualquier no-string → ''. */
function texto(v) {
  return typeof v === 'string' ? v.trim() : '';
}

/** Comparación de tokens en tiempo constante (compara digests SHA-256). */
async function tokenValido(recibido, esperado) {
  if (!recibido || !esperado) return false;
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(recibido)),
    crypto.subtle.digest('SHA-256', enc.encode(esperado)),
  ]);
  const va = new Uint8Array(a);
  const vb = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

/** POST /api/leads: valida el payload e inserta el lead en D1. */
async function crearLead(request, env) {
  // Cota defensiva de tamaño para un JSON de contacto.
  const declarado = Number(request.headers.get('content-length') || '0');
  if (declarado > 64 * 1024) {
    return json({ ok: false, error: 'payload_too_large' }, 413, env);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400, env);
  }
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return json({ ok: false, error: 'invalid_json' }, 400, env);
  }

  // Honeypot: campo oculto "website". Si trae contenido es un bot:
  // se responde 200 genérico (parece éxito) SIN insertar nada.
  if (texto(body.website).length > 0) {
    return json({ ok: true, id: null }, 200, env);
  }

  // "elapsed": ms desde que se renderizó el formulario (lo envía el frontend).
  // Menos de 2 s => envío automatizado.
  const elapsed = Number(body.elapsed);
  if (!Number.isFinite(elapsed) || elapsed < 800) {
    return json({ ok: false, error: 'validation', field: 'elapsed' }, 400, env);
  }

  // Requeridos: se validan sin recortar (recortar podría corromper el dato).
  const name = texto(body.name);
  const email = texto(body.email);
  if (name.length < 2 || name.length > LIMITES.name) {
    return json({ ok: false, error: 'validation', field: 'name' }, 400, env);
  }
  if (email.length > LIMITES.email || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'validation', field: 'email' }, 400, env);
  }

  // Opcionales: se recortan al máximo permitido.
  const company = texto(body.company).slice(0, LIMITES.company);
  const phone = texto(body.phone).slice(0, LIMITES.phone);
  const message = texto(body.message).slice(0, LIMITES.message);
  const source = texto(body.source).slice(0, LIMITES.source) || 'landing';

  // INSERT parametrizado: nunca concatenar valores al SQL.
  const resultado = await env.DB
    .prepare(
      'INSERT INTO leads (name, company, email, phone, message, source) ' +
        'VALUES (?1, ?2, ?3, ?4, ?5, ?6)'
    )
    .bind(name, company, email, phone, message, source)
    .run();

  const id = resultado && resultado.meta ? resultado.meta.last_row_id : null;
  return json({ ok: true, id: id }, 201, env);
}

/** GET /api/leads: últimos 200 leads; exige Bearer ADMIN_TOKEN. */
async function listarLeads(request, env) {
  const header = request.headers.get('authorization') || '';
  const ok =
    header.startsWith('Bearer ') &&
    (await tokenValido(header.slice(7).trim(), env.ADMIN_TOKEN || ''));
  if (!ok) {
    return json({ ok: false, error: 'unauthorized' }, 401, env);
  }

  const { results } = await env.DB
    .prepare(
      'SELECT id, name, company, email, phone, message, source, status, created_at ' +
        'FROM leads ORDER BY id DESC LIMIT 200'
    )
    .all();

  const leads = results || [];
  // "count" = leads devueltos (máx. 200), no el total de la tabla.
  return json({ ok: true, count: leads.length, leads: leads }, 200, env);
}

/** Router: únicamente /api/*. */
async function manejar(request, env) {
  const { pathname } = new URL(request.url);

  // Fuera de /api/* este worker no debe intervenir: los assets estáticos
  // cubren todo (run_worker_first). Salvaguarda por si cambiara la config.
  if (!pathname.startsWith('/api/')) {
    return json({ ok: false, error: 'not_found' }, 404, env);
  }

  if (request.method === 'OPTIONS') {
    return preflight(env);
  }

  if (pathname === '/api/health' && request.method === 'GET') {
    return json({ ok: true, service: 'leads' }, 200, env);
  }

  if (pathname === '/api/leads') {
    if (request.method === 'POST') return crearLead(request, env);
    if (request.method === 'GET') return listarLeads(request, env);
  }

  // Cualquier otra ruta o método bajo /api/*.
  return json({ ok: false, error: 'not_found' }, 404, env);
}

export default {
  async fetch(request, env) {
    try {
      return await manejar(request, env);
    } catch (err) {
      // 500 genérico: sin detalles de SQL ni estructura interna al cliente.
      console.error(
        'leads-worker:',
        err instanceof Error ? err.message : String(err)
      );
      return json({ ok: false, error: 'internal' }, 500, env);
    }
  },
};

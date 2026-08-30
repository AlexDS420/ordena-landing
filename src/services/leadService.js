// leadService: persiste el lead en el destino configurado.
// Prioridad: 1) Supabase (si hay env) 2) endpoint propio (VITE_LEAD_ENDPOINT o /api/leads same-origin).
// NUNCA inventa éxito: si el destino falla, propaga el error.
import { getSupabase } from '../lib/supabase.js';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(lead) {
  const name = (lead.name || '').trim();
  const email = (lead.email || '').trim();
  if (name.length < 2 || name.length > 120) {
    throw { code: 'validation', field: 'name' };
  }
  if (!email || email.length > 160 || !emailRe.test(email)) {
    throw { code: 'validation', field: 'email' };
  }
  return { name, email };
}

async function submitLead(lead) {
  const { name, email } = validate(lead);

  const supabaseClient = await getSupabase();
  if (supabaseClient) {
    const { error } = await supabaseClient
      .from('leads')
      .insert({
        name,
        company: (lead.company || '').trim().slice(0, 120) || null,
        email,
        phone: (lead.phone || '').trim().slice(0, 40) || null,
        message: (lead.message || '').trim().slice(0, 2000) || null,
        source: 'landing',
      });
    if (error) throw { code: 'supabase_error', cause: error.message };
    return { ok: true, persistedVia: 'supabase' };
  }

  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT || '/api/leads';
  let res;
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name,
        company: (lead.company || '').trim(),
        email,
        phone: (lead.phone || '').trim(),
        message: (lead.message || '').trim(),
        source: 'landing',
        website: (lead.website || '').slice(0, 200), // honeypot: debe llegar vacío
        elapsed: lead.elapsed ?? 0,
      }),
    });
  } catch (err) {
    throw { code: 'endpoint_error', cause: 'network' };
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw { code: res.status === 400 ? 'validation' : 'endpoint_error', status: res.status, cause: data.error, field: data.field };
  }
  return { ok: true, persistedVia: 'endpoint' };
}

export { submitLead };

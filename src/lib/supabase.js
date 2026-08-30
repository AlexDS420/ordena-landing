// Cliente Supabase opcional con carga diferida: solo se descarga e instancia
// si existen las variables de entorno. Sin credenciales devuelve null y el
// registro de leads usa el endpoint propio (VITE_LEAD_ENDPOINT o /api/leads).
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function getSupabase() {
  if (!url || !anonKey) return null;
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(url, anonKey);
}

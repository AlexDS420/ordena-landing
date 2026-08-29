// Cliente Supabase opcional: solo se crea si existen las variables de entorno.
// Sin credenciales, `supabase` es null y el registro de leads usa el endpoint propio.
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;

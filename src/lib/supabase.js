import { createClient } from '@supabase/supabase-js'

// ── Configuración Supabase ──
// Reemplaza estos valores con los de tu proyecto Supabase.
// Puedes usar variables de entorno en Vercel para no exponer las llaves.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Cliente Supabase (solo se inicializa si hay credenciales)
export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null

// Nombre del bucket de Storage
export const STORAGE_BUCKET = 'satellite-images'

// Helper: obtener URL pública de una imagen en Storage
export function getImageUrl(path) {
  if (!supabase) return null
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data?.publicUrl || null
}

// Helper: verificar si Supabase está configurado
export function isSupabaseConfigured() {
  return supabase !== null
}

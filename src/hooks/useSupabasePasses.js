import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import samplePasses from '../data/samplePasses'

const REFRESH_INTERVAL = 60_000

/**
 * Hook que obtiene los pases con sus imágenes de Supabase.
 * Si Supabase no está configurado, usa datos de demo.
 */
export default function useSupabasePasses() {
    const [passes, setPasses] = useState(samplePasses)
    const [loading, setLoading] = useState(true)
    const [isLive, setIsLive] = useState(false)
    const [error, setError] = useState(null)

    const fetchPasses = useCallback(async () => {
        if (!isSupabaseConfigured()) {
            setPasses(samplePasses)
            setLoading(false)
            setIsLive(false)
            return
        }

        try {
            // Fetch passes con sus imágenes (join)
            const { data, error: fetchError } = await supabase
                .from('passes')
                .select('*, pass_images(*)')
                .order('timestamp', { ascending: false })
                .limit(50)

            if (fetchError) throw fetchError

            const mapped = data.map((row) => ({
                id: row.id,
                satellite: row.satellite,
                timestamp: row.timestamp,
                folder_name: row.folder_name,
                pngCount: row.png_count || 0,
                rawCount: row.raw_count || 0,
                filledCount: row.filled_count || 0,
                status: row.status || 'completed',
                images: (row.pass_images || []).map((img) => ({
                    id: img.id,
                    type: img.type,
                    label: img.label || getLabelForType(img.type),
                    image_url: img.image_url,
                    thumbnail_url: img.thumbnail_url || img.image_url,
                })),
            }))

            setPasses(mapped.length > 0 ? mapped : samplePasses)
            setIsLive(mapped.length > 0)
            setError(null)
        } catch (err) {
            console.error('Error fetching passes:', err)
            setError(err.message)
            setPasses(samplePasses)
            setIsLive(false)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPasses()

        const interval = setInterval(fetchPasses, REFRESH_INTERVAL)

        let subscription
        if (isSupabaseConfigured()) {
            subscription = supabase
                .channel('passes-realtime')
                .on(
                    'postgres_changes',
                    { event: 'INSERT', schema: 'public', table: 'passes' },
                    () => {
                        console.log('🛰️ Nuevo pase detectado — recargando...')
                        fetchPasses()
                    }
                )
                .subscribe()
        }

        return () => {
            clearInterval(interval)
            if (subscription) {
                supabase.removeChannel(subscription)
            }
        }
    }, [fetchPasses])

    return { passes, loading, isLive, error }
}

function getLabelForType(type) {
    switch (type) {
        case 'FILLED': return 'MCIR Map'
        case 'RAW': return 'MSU-MR Canal 2'
        case 'RAW_MCIR': return 'MCIR Corregido'
        case 'STANDARD': return 'Estándar'
        default: return type
    }
}

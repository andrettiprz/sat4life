import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import samplePasses from '../data/samplePasses'

/**
 * Hook para obtener un pase individual con todas sus imágenes.
 */
export default function usePassDetail(passId) {
    const [pass, setPass] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!passId) return

        async function fetchPass() {
            setLoading(true)

            if (!isSupabaseConfigured()) {
                const found = samplePasses.find(p => p.id === Number(passId))
                setPass(found || null)
                setLoading(false)
                return
            }

            try {
                const { data, error: fetchError } = await supabase
                    .from('passes')
                    .select('*, pass_images(*)')
                    .eq('id', passId)
                    .single()

                if (fetchError) throw fetchError

                setPass({
                    id: data.id,
                    satellite: data.satellite,
                    timestamp: data.timestamp,
                    folder_name: data.folder_name,
                    pngCount: data.png_count || 0,
                    rawCount: data.raw_count || 0,
                    filledCount: data.filled_count || 0,
                    status: data.status || 'completed',
                    images: (data.pass_images || []).map((img) => ({
                        id: img.id,
                        type: img.type,
                        label: img.label || img.type,
                        image_url: img.image_url,
                        thumbnail_url: img.thumbnail_url || img.image_url,
                    })),
                })
                setError(null)
            } catch (err) {
                console.error('Error fetching pass detail:', err)
                setError(err.message)
                // Fallback a demo
                const found = samplePasses.find(p => p.id === Number(passId))
                setPass(found || null)
            } finally {
                setLoading(false)
            }
        }

        fetchPass()
    }, [passId])

    return { pass, loading, error }
}

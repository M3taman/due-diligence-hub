import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

interface ResearchItem {
  id: string
  title: string
  description: string
  created_at: string
}

export function useResearch(searchQuery: string) {
  const [data, setData] = useState<ResearchItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        setIsLoading(true)
        let query = supabase
          .from('research')
          .select('*')
          .order('created_at', { ascending: false })

        if (searchQuery) {
          query = query.ilike('title', `%${searchQuery}%`)
        }

        const { data, error } = await query

        if (error) throw error

        setData(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResearch()
  }, [searchQuery])

  return { data, isLoading, error }
}
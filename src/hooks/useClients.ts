import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export interface Client {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from<Client>('clients')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setClients(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, isLoading, error };
}
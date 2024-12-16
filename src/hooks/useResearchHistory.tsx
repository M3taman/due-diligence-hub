import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ResearchEntry } from "@/types/ai";
import { useToast } from "@/components/ui/use-toast";

export const useResearchHistory = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: researchHistory, isLoading } = useQuery({
    queryKey: ['researchHistory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ResearchEntry[];
    },
  });

  const addResearchEntry = useMutation({
    mutationFn: async (entry: Omit<ResearchEntry, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('research_history')
        .insert([entry])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['researchHistory'] });
      toast({
        title: "Analysis Saved",
        description: "Your research has been saved to history.",
      });
    },
    onError: (error) => {
      console.error('Error saving research:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save research to history.",
      });
    },
  });

  return {
    researchHistory,
    isLoading,
    addResearchEntry,
  };
};
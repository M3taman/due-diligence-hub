import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
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
      queryClient.invalidateQueries(['researchHistory']);
      toast({
        title: "Analysis Saved",
        description: "Research entry has been saved successfully"
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: error.message
      });
    }
  });

  const deleteResearchEntry = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('research_history')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['researchHistory']);
      toast({
        title: "Entry Deleted",
        description: "Research entry has been removed"
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: error.message
      });
    }
  });

  const updateResearchEntry = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ResearchEntry> & { id: string }) => {
      const { data, error } = await supabase
        .from('research_history')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['researchHistory']);
      toast({
        title: "Entry Updated",
        description: "Research entry has been updated"
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message
      });
    }
  });

  return {
    researchHistory,
    isLoading,
    addResearchEntry: addResearchEntry.mutate,
    deleteResearchEntry: deleteResearchEntry.mutate,
    updateResearchEntry: updateResearchEntry.mutate,
    isAddingEntry: addResearchEntry.isLoading,
    isDeletingEntry: deleteResearchEntry.isLoading,
    isUpdatingEntry: updateResearchEntry.isLoading
  };
};
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useResearchHistory } from "@/hooks/useResearchHistory";
import { History } from "lucide-react";

export const ResearchHistory = () => {
  const { researchHistory, isLoading } = useResearchHistory();

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4" />
          <span>Loading research history...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <History className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Research History</h2>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {researchHistory?.map((entry) => (
            <Card key={entry.id} className="p-4">
              <h3 className="font-medium mb-2">{entry.query}</h3>
              <div className="text-sm text-muted-foreground">
                {new Date(entry.timestamp).toLocaleDateString()}
              </div>
              <div className="mt-2 text-sm">
                Complexity Score: {entry.metadata.complexity}
              </div>
            </Card>
          ))}
          {researchHistory?.length === 0 && (
            <div className="text-center text-muted-foreground">
              No research history yet
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};
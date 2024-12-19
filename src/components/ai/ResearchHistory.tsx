import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResearchHistory } from "@/hooks/useResearchHistory";
import { History, Search, Calendar, Download, Filter } from "lucide-react";
import { format } from "date-fns";

export const ResearchHistory = () => {
  const { researchHistory, isLoading } = useResearchHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const filteredHistory = researchHistory?.filter(entry => {
    const matchesSearch = entry.query.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !selectedDate || format(new Date(entry.timestamp), 'yyyy-MM-dd') === selectedDate;
    return matchesSearch && matchesDate;
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 animate-spin" />
          <span>Loading research history...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Research History</h2>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
          <Input
            placeholder="Search queries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-40"
        />
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {filteredHistory?.map((entry) => (
            <Card key={entry.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{entry.query}</h3>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(entry.timestamp), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {entry.summary}
              </div>
              <div className="flex gap-2 mt-2">
                {entry.tags?.map((tag) => (
                  <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
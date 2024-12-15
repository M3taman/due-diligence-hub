import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Plus, FileText } from "lucide-react";

const Research = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Research Library</h1>
          <p className="text-muted-foreground mt-1">
            Access and manage your due diligence reports and analysis
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Research
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search research documents..."
          className="pl-10"
        />
      </div>

      <Card className="p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">No research documents yet</h3>
          <p className="text-sm text-muted-foreground">
            Start by creating a new research document or running an analysis
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Research;
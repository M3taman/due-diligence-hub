import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Plus, FileText, Filter, Download, Share2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface ResearchDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published';
}

const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState<ResearchDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "all" || doc.category === selectedCategory)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Research Library</h1>
          <p className="text-muted-foreground mt-1">
            Access and manage your due diligence reports and analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Research
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search research documents..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
              <span>Updated {format(new Date(doc.updated_at), 'MMM dd, yyyy')}</span>
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                {doc.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Research;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

const Clients = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button className="bg-primary hover:bg-primary-hover text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search clients..."
            className="pl-10"
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600 text-center py-8">No clients found</p>
      </div>
    </div>
  );
};

export default Clients;
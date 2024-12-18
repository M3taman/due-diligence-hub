import React from 'react';
import { Database, FileText, RefreshCw } from 'lucide-react';

export const DudilHeader = () => {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Database className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Dudil - Analyst</h2>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>Real-time Analysis</span>
        </div>
        <div className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          <span>Multi-source Data</span>
        </div>
      </div>
    </>
  );
};
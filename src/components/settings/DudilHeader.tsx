import React from 'react';
import { Database, FileText, RefreshCw, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/components/providers/theme-provider';
import { Badge } from '@/components/ui/badge';

interface DudilHeaderProps {
  onRefresh?: () => void;
  isLoading?: boolean;
  lastUpdated?: string;
}

export const DudilHeader: React.FC<DudilHeaderProps> = ({
  onRefresh,
  isLoading,
  lastUpdated
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="border-b pb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Dudil - Analyst</h2>
          <Badge variant="outline" className="ml-2">
            {isLoading ? 'Processing...' : 'Ready'}
          </Badge>
        </div>
        
        {onRefresh && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Real-time Analysis</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Analyzing market data in real-time</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              <span>Multi-source Data</span>
              {lastUpdated && (
                <span className="text-xs ml-1">
                  Updated: {lastUpdated}
                </span>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Data from multiple trusted sources</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
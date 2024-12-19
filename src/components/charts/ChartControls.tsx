import React from 'react';
import { useChartOptions } from './ChartContext';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const ChartControls: React.FC = () => {
  const { options, setOptions } = useChartOptions();

  return (
    <div className="flex items-center gap-4 p-2 border rounded-md mb-4">
      <Select
        value={options.theme}
        onValueChange={(value: 'light' | 'dark') => 
          setOptions({ theme: value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <span>Animation</span>
        <Switch
          checked={options.animation}
          onCheckedChange={(checked) => 
            setOptions({ animation: checked })
          }
        />
      </div>
    </div>
  );
};
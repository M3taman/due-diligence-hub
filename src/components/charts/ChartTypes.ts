export type ChartType = 'line' | 'area' | 'bar';

export interface ChartData {
  type: ChartType;
  data: any[];
  xKey: string;
  yKey: string;
  title?: string;
}

export interface ChartConfig {
  colors: {
    primary: string;
    secondary: string;
    grid: string;
  };
  dimensions: {
    height: number;
    padding: number;
  };
}
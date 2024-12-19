import React from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartErrorBoundary } from './ChartErrorBoundary';
import { useChartOptions } from './ChartContext';
import { ChartControls } from './ChartControls';
import { ChartData } from './ChartTypes';

interface ChartRendererProps {
  chartData: ChartData;
}

export const ChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  const { options } = useChartOptions();
  const { type, data, xKey, yKey, title } = chartData;
  const { colors, animation } = options;

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey={yKey} 
              stroke={colors.primary}
              animationDuration={animation ? 300 : 0} 
            />
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <Area 
              type="monotone" 
              dataKey={yKey} 
              stroke={colors.primary} 
              fill={colors.primary}
              animationDuration={animation ? 300 : 0} 
            />
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <Bar 
              dataKey={yKey} 
              fill={colors.primary}
              animationDuration={animation ? 300 : 0} 
            />
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <ChartErrorBoundary>
      <Card className={`p-4 my-4 ${options.theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
        <ChartControls />
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div className="w-full h-[300px]">
          <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
        </div>
      </Card>
    </ChartErrorBoundary>
  );
};
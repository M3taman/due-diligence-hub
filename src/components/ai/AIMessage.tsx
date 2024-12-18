import { Card } from "@/components/ui/card";
import { Message } from "@/types/ai";
import { renderMarkdown } from "@/utils/aiUtils";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts";

interface AIMessageProps {
  message: Message;
}

const renderChart = (chart: any) => {
  if (!chart || !chart.data || !Array.isArray(chart.data)) return null;
  
  let ChartComponent;
  let DataComponent;
  
  switch (chart.type) {
    case 'area':
      ChartComponent = AreaChart;
      DataComponent = Area;
      break;
    case 'bar':
      ChartComponent = BarChart;
      DataComponent = Bar;
      break;
    default:
      ChartComponent = LineChart;
      DataComponent = Line;
  }
  
  return (
    <div className="h-[300px] w-full my-6">
      <h4 className="text-lg font-semibold mb-2">{chart.title}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={chart.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {chart.series ? (
            chart.series.map((series: any, index: number) => (
              <DataComponent
                key={series.name}
                type="monotone"
                dataKey={series.dataKey}
                name={series.name}
                stroke={series.color || `hsl(${index * 45}, 70%, 50%)`}
                fill={series.color || `hsl(${index * 45}, 70%, 50%)`}
                strokeWidth={2}
              />
            ))
          ) : (
            <DataComponent
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              fill="#3B82F6"
              strokeWidth={2}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export const AIMessage = ({ message }: AIMessageProps) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
        <Card className="p-4">
          <div className="prose prose-sm">
            {renderMarkdown(message.content)}
            {message.charts && message.charts.map((chart, index) => (
              <div key={index} className="my-4">
                {renderChart(chart)}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
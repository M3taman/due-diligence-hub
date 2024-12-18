import { Message } from "@/types/ai";
import { renderMarkdown } from "@/utils/aiUtils";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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
  
  const ChartComponent = chart.type === 'area' ? AreaChart : 
                        chart.type === 'bar' ? BarChart : LineChart;
  
  const DataComponent = chart.type === 'area' ? Area :
                       chart.type === 'bar' ? Bar : Line;
  
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
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      } mb-6`}
    >
      <div
        className={`rounded-lg px-8 py-6 ${
          message.role === "user"
            ? "bg-primary text-primary-foreground max-w-[40%]"
            : "bg-secondary/50 max-w-[95%] w-full"
        }`}
      >
        {message.role === "assistant" ? (
          <Card className="p-6 prose prose-lg max-w-none dark:prose-invert">
            {renderMarkdown(message.content)}
            {message.charts && message.charts.map((chart, index) => (
              <div key={index} className="my-4">
                {renderChart(chart)}
              </div>
            ))}
          </Card>
        ) : (
          <p className="text-lg">{message.content}</p>
        )}
      </div>
    </div>
  );
};
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
} from "recharts";

interface AIMessageProps {
  message: Message;
}

const renderChart = (data: any) => {
  if (!data || !Array.isArray(data)) return null;
  
  return (
    <div className="h-[300px] w-full my-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
          />
        </LineChart>
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
                <h4 className="text-lg font-semibold mb-2">{chart.title}</h4>
                {renderChart(chart.data)}
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
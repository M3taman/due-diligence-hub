import { DudilAIAssistant } from "@/components/settings/DudilAIAssistant";
import { Card } from "@/components/ui/card";
import { FileText, BarChart2, Shield } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Comprehensive Analysis",
    description: "Detailed due diligence reports covering all critical aspects of business evaluation"
  },
  {
    icon: BarChart2,
    title: "Real-time Insights",
    description: "Up-to-date market data and analysis from multiple authoritative sources"
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Thorough evaluation of operational, financial, and regulatory risks"
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome to DueDiligence OS</h1>
        <p className="text-muted-foreground">
          Your AI-powered platform for comprehensive business intelligence and due diligence analysis
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="p-6">
            <feature.icon className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <DudilAIAssistant />
      </div>
    </div>
  );
};

export default Dashboard;
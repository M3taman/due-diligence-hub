import { AIAnalyst } from "@/components/ai/AIAnalyst";
import { Card } from "@/components/ui/card";
import { FileText, BarChart2, Shield, Users } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to DueDiligence OS</h1>
        <p className="text-xl text-gray-600">
          Your AI-powered platform for comprehensive business intelligence and due diligence analysis
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {features.map((feature) => (
          <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <feature.icon className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <AIAnalyst />
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <h3 className="text-xl font-semibold mb-4">Starter Plan</h3>
          <div className="text-3xl font-bold mb-2">$500/month</div>
          <p className="mb-4">Perfect for small teams</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Up to 5 users
            </li>
            <li>Unlimited analysis</li>
            <li>24/7 support</li>
          </ul>
          <button className="w-full py-2 px-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Get Started
          </button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <h3 className="text-xl font-semibold mb-4">Pro Plan</h3>
          <div className="text-3xl font-bold mb-2">$1,000/month</div>
          <p className="mb-4">For growing businesses</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Up to 10 users
            </li>
            <li>Priority support</li>
            <li>Advanced analytics</li>
          </ul>
          <button className="w-full py-2 px-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
            Get Started
          </button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
          <div className="text-3xl font-bold mb-2">Custom</div>
          <p className="mb-4">For large organizations</p>
          <ul className="space-y-2 mb-6">
            <li>Unlimited users</li>
            <li>Custom integration</li>
            <li>Dedicated support</li>
          </ul>
          <button className="w-full py-2 px-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            Contact Sales
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
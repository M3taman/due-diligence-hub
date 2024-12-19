import { AIAnalyst } from "@/components/ai/AIAnalyst";
import { Card } from "@/components/ui/card";
import { FileText, BarChart2, Shield, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

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

const pricingPlans = [
  {
    name: "Starter",
    price: 500,
    period: "month",
    features: ["Up to 5 users", "Unlimited analysis", "24/7 support"],
    stripePriceId: "price_starter",
    paypalPlanId: "P-STARTER",
    color: "blue"
  },
  {
    name: "Pro",
    price: 1000,
    period: "month",
    features: ["Up to 10 users", "Priority support", "Advanced analytics"],
    stripePriceId: "price_pro",
    paypalPlanId: "P-PRO",
    color: "indigo"
  },
  {
    name: "Enterprise",
    price: null,
    period: "month",
    features: ["Unlimited users", "Custom integration", "Dedicated support"],
    stripePriceId: "price_enterprise",
    paypalPlanId: "P-ENTERPRISE",
    color: "purple"
  }
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStripeCheckout = async (priceId: string) => {
    try {
      setIsLoading(true);
      const user = (await supabase.auth.getUser()).data.user;
      
      const { data, error } = await supabase.functions.invoke('create-stripe-checkout', {
        body: { priceId, userId: user?.id },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayPalCheckout = async (planId: string) => {
    try {
      setIsLoading(true);
      const user = (await supabase.auth.getUser()).data.user;
      
      const { data, error } = await supabase.functions.invoke('create-paypal-order', {
        body: { planId, userId: user?.id },
      });

      if (error) throw error;
      if (data?.id) {
        window.location.href = `https://www.paypal.com/checkoutnow?token=${data.id}`;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate PayPal checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className={`p-6 bg-gradient-to-br from-${plan.color}-500 to-${plan.color}-600 text-white`}>
            <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
            <div className="text-3xl font-bold mb-2">
              {plan.price ? `$${plan.price}/${plan.period}` : 'Custom'}
            </div>
            <p className="mb-4">Perfect for {plan.name === "Enterprise" ? "large organizations" : "small teams"}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <Button
                className="w-full bg-white text-gray-800 hover:bg-gray-100"
                onClick={() => handleStripeCheckout(plan.stripePriceId)}
                disabled={isLoading}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay with Card
              </Button>
              <Button
                className="w-full bg-[#0070ba] hover:bg-[#003087] text-white"
                onClick={() => handlePayPalCheckout(plan.paypalPlanId)}
                disabled={isLoading}
              >
                Pay with PayPal
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
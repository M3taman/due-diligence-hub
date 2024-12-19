import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, BarChart2, FileText, Zap, Lock, Globe } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Due Diligence Analysis",
      description: "AI-powered comprehensive business evaluation and risk assessment"
    },
    {
      icon: BarChart2,
      title: "Market Intelligence",
      description: "Real-time data and insights from authoritative sources"
    },
    {
      icon: FileText,
      title: "Research Reports",
      description: "Professional-grade documentation and analysis"
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get insights in seconds, not days"
    }
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "500",
      period: "month",
      features: [
        "5 due diligence reports/month",
        "Basic market analysis",
        "Standard support",
        "1 team member"
      ]
    },
    {
      name: "Pro",
      price: "1,000",
      period: "month",
      features: [
        "Unlimited reports",
        "Advanced market analysis",
        "Priority support",
        "Up to 5 team members",
        "Custom report branding"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "month",
      features: [
        "Unlimited everything",
        "Custom integrations",
        "Dedicated support",
        "Unlimited team members",
        "API access"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 via-background to-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Due Diligence OS
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered platform for comprehensive business intelligence and due diligence analysis
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/signup")} className="text-lg px-8">
                Start Free Trial <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/demo")} className="text-lg px-8">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need for thorough due diligence</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-background" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that's right for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`p-8 relative ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground">/{tier.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={tier.popular ? "default" : "outline"}
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Due Diligence Process?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join leading companies using our platform to make better investment decisions
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/signup")} className="text-lg px-8">
                Start Free Trial <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/contact")} className="text-lg px-8">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
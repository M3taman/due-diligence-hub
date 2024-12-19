import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, BarChart2, FileText, Zap, Lock, Globe } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Comprehensive Due Diligence",
      description: "AI-powered analysis covering all aspects of business evaluation"
    },
    {
      icon: BarChart2,
      title: "Real-time Market Intelligence",
      description: "Live data and insights from multiple authoritative sources"
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "Professional-grade documentation and analysis reports"
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get insights in seconds, not days or weeks"
    }
  ];

  const benefits = [
    "AI-powered analysis engine",
    "Multi-source data validation",
    "Real-time market insights",
    "Comprehensive risk assessment",
    "Automated report generation",
    "Expert support team",
    "Unlimited research queries",
    "Priority processing"
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "500",
      period: "month",
      features: [
        "5 reports per month",
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
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 leading-tight">
              Transform Your Due Diligence Process
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Harness the power of AI to make faster, smarter investment decisions with comprehensive analysis and real-time insights
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
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 border-primary/10">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform</h2>
              <p className="text-xl text-muted-foreground">Industry-leading features that set us apart</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 bg-background p-4 rounded-lg shadow-sm">
                  <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that's right for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`p-8 ${tier.popular ? 'border-primary shadow-lg' : 'border-primary/10'}`}>
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    Popular
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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, BarChart2, FileText } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Comprehensive Due Diligence",
      description: "Advanced AI-powered analysis covering all aspects of business evaluation"
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
    }
  ];

  const benefits = [
    "AI-powered analysis engine",
    "Multi-source data validation",
    "Real-time market insights",
    "Comprehensive risk assessment",
    "Automated report generation",
    "Expert support team"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Next-Generation Due Diligence Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Harness the power of AI to transform your due diligence process with comprehensive analysis and real-time insights
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/dashboard")}>
                Get Started <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/demo")}>
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground">Everything you need for thorough due diligence</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
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

      {/* Benefits Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
              <p className="text-muted-foreground">Industry-leading features that set us apart</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Due Diligence Process?</h2>
            <p className="text-muted-foreground mb-8">
              Join leading companies using our platform to make better investment decisions
            </p>
            <Button size="lg" onClick={() => navigate("/signup")}>
              Start Free Trial <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
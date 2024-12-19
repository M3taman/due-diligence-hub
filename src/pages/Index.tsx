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

  const testimonials = [
    {
      quote: "dudil has transformed our due diligence process, saving us countless hours.",
      author: "Sarah Chen",
      role: "Investment Director",
      company: "Global Ventures Ltd"
    },
    {
      quote: "The AI-powered insights have helped us identify risks we might have missed.",
      author: "Michael Stewart",
      role: "M&A Partner",
      company: "Sterling Advisory"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Next-Generation Due Diligence Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your due diligence process with AI-powered insights and real-time market intelligence.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/signup')}>
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/demo')}>
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features for Modern Due Diligence
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by Industry Leaders
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <blockquote className="text-lg mb-4">{testimonial.quote}</blockquote>
                <div>
                  <cite className="font-semibold">{testimonial.author}</cite>
                  <p className="text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Due Diligence Process?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join leading firms using dudil to make better investment decisions.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/signup')}
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
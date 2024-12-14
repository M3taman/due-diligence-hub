import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Database, 
  FileText, 
  RefreshCw, 
  CreditCard, 
  HelpCircle,
  ChevronRight 
} from "lucide-react";
import { generateAIResponse, renderMarkdown } from "@/services/aiService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await generateAIResponse([...messages, userMessage]);
      const aiMessage = {
        role: "assistant",
        content: response.content,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage = {
        role: "assistant",
        content: "I apologize, but I encountered an error processing your request.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const faqItems = [
    {
      question: "What is Dudil AI?",
      answer: "Dudil AI is an advanced business intelligence assistant specializing in comprehensive due diligence analysis, providing detailed insights across multiple dimensions of business analysis."
    },
    {
      question: "How does Dudil analyze companies?",
      answer: "Dudil uses a 7-point framework covering company overview, financial health, market positioning, risk evaluation, growth potential, competitive landscape, and regulatory compliance."
    },
    {
      question: "What sources does Dudil use?",
      answer: "Dudil aggregates data from multiple authoritative sources including SEC EDGAR Filings, Bloomberg Financial Data, Crunchbase, Yahoo Finance, and other professional databases."
    }
  ];

  const billingPlans = [
    {
      name: "Starter",
      price: "$49/month",
      features: [
        "Basic due diligence analysis",
        "Up to 50 queries/month",
        "Standard response time"
      ]
    },
    {
      name: "Professional",
      price: "$199/month",
      features: [
        "Advanced analysis features",
        "Unlimited queries",
        "Priority response time",
        "Custom report generation"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Full feature access",
        "Dedicated support",
        "Custom integration",
        "SLA guarantees"
      ]
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Frequently Asked Questions</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Billing Plans</DialogTitle>
              </DialogHeader>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {billingPlans.map((plan, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                    <p className="text-2xl font-bold mb-4">{plan.price}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4">
                      Select Plan
                    </Button>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Database className="h-4 w-4" />
                AI Assistant
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Dudil AI Assistant
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Accessing files</span>
                </div>
                <div className="flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" />
                  <span>Real-time data</span>
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-200px)] mt-4 pr-4">
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div dangerouslySetInnerHTML={{ 
                            __html: renderMarkdown(msg.content) 
                          }} />
                        ) : (
                          msg.content
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <form onSubmit={handleSendMessage} className="mt-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your data..."
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading}>
                    Send
                  </Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Recent Research</h3>
          <p className="text-gray-600">No recent research documents</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Active Clients</h3>
          <p className="text-gray-600">No active clients</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Tasks</h3>
          <p className="text-gray-600">No pending tasks</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
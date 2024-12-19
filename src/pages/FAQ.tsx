import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  
  const faqItems = [
    {
      question: "What makes dudil's due diligence analysis unique?",
      answer: "dudil combines advanced AI technology with comprehensive data sources to provide multi-dimensional due diligence analysis. Our platform covers seven critical areas: company overview, financial health, market positioning, risk evaluation, growth potential, competitive landscape, and regulatory compliance. Each analysis is backed by real-time data and cross-referenced across multiple authoritative sources."
    },
    {
      question: "How does dudil gather and validate information?",
      answer: "We utilize multiple authoritative sources including SEC filings, financial databases, market research reports, and regulatory documents. Our AI system cross-references information across these sources, validates data points, and provides real-time updates. This ensures you receive the most accurate and current due diligence insights."
    },
    {
      question: "What types of analysis reports are available?",
      answer: "Our platform offers comprehensive reports including: Financial Analysis (revenue trends, profitability metrics, balance sheet analysis), Market Position Analysis (industry standing, market share), Risk Assessment (operational, financial, regulatory risks), Strategic Analysis (growth potential, competitive landscape), and Compliance Reports (regulatory framework, governance standards)."
    },
    {
      question: "How frequently is the data updated?",
      answer: "Our platform provides real-time data updates for market metrics and financial indicators. Company filings and regulatory information are updated as soon as they become publicly available. Historical data and trend analysis are maintained with complete audit trails."
    },
    {
      question: "Can I customize the analysis parameters?",
      answer: "Yes, dudil offers customizable analysis parameters. You can focus on specific aspects of due diligence, adjust the depth of analysis, and customize report formats. The platform adapts to various industries and company sizes while maintaining comprehensive coverage."
    },
    {
      question: "What support is available for users?",
      answer: "We provide comprehensive support including: 24/7 technical assistance, dedicated account managers for enterprise clients, regular platform training sessions, and a knowledge base with best practices for due diligence analysis."
    },
    {
      question: "How secure is the platform?",
      answer: "dudil implements bank-grade security measures including end-to-end encryption, secure data storage, regular security audits, and compliance with industry standards. All analysis and reports are protected with enterprise-level security protocols."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Everything you need to know about dudil's due diligence platform
          </p>
        </div>

        <Card className="p-6 mb-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2 pl-7">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Contact our support team or explore our detailed documentation
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate('/contact')} variant="outline">
              Contact Support
            </Button>
            <Button onClick={() => navigate('/docs')} className="gap-2">
              View Documentation <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
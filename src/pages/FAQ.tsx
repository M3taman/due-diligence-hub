import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle, HelpCircle, Search, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const faqData = {
  general: [
    {
      question: "What makes dudil's due diligence analysis unique?",
      answer: "dudil combines advanced AI technology with comprehensive data sources to provide multi-dimensional due diligence analysis. Our platform covers seven critical areas: company overview, financial health, market positioning, risk evaluation, growth potential, competitive landscape, and regulatory compliance. Each analysis is backed by real-time data and cross-referenced across multiple authoritative sources."
    },
    {
      question: "How does dudil gather and validate information?",
      answer: "We utilize multiple authoritative sources including SEC filings, financial databases, market research reports, and regulatory documents. Our AI system cross-references information across these sources, validates data points, and provides real-time updates. This ensures you receive the most accurate and current due diligence insights."
    },
    {
      question: "What industries does dudil support?",
      answer: "dudil supports a wide range of industries including Financial Services, Technology, Healthcare, Manufacturing, Retail, and Real Estate. Our platform adapts its analysis frameworks to industry-specific requirements and regulations."
    },
    {
      question: "Can dudil handle international companies?",
      answer: "Yes, dudil supports analysis of companies across multiple jurisdictions. Our platform incorporates international accounting standards, regulatory frameworks, and market data from global sources."
    }
  ],
  technical: [
    {
      question: "What types of analysis reports are available?",
      answer: "Our platform offers comprehensive reports including: Financial Analysis (revenue trends, profitability metrics, balance sheet analysis), Market Position Analysis (industry standing, market share), Risk Assessment (operational, financial, regulatory risks), Strategic Analysis (growth potential, competitive landscape), and Compliance Reports (regulatory framework, governance standards)."
    },
    {
      question: "How frequently is the data updated?",
      answer: "Our platform provides real-time data updates for market metrics and financial indicators. Company filings and regulatory information are updated as soon as they become publicly available. Historical data and trend analysis are maintained with complete audit trails."
    },
    {
      question: "What data sources does dudil use?",
      answer: "dudil integrates data from premium financial databases, regulatory filings (SEC, EDGAR), market data providers, news APIs, and specialized industry sources. We maintain partnerships with leading data providers to ensure comprehensive coverage."
    },
    {
      question: "How does the AI analysis work?",
      answer: "Our AI system uses advanced natural language processing and machine learning algorithms to analyze documents, identify patterns, assess risks, and generate insights. It continuously learns from new data and user feedback to improve accuracy."
    }
  ],
  customization: [
    {
      question: "Can I customize the analysis parameters?",
      answer: "Yes, dudil offers customizable analysis parameters. You can focus on specific aspects of due diligence, adjust the depth of analysis, and customize report formats. The platform adapts to various industries and company sizes while maintaining comprehensive coverage."
    }
  ],
  security: [
    {
      question: "What security certifications does dudil have?",
      answer: "dudil maintains SOC 2 Type II certification and complies with GDPR, CCPA, and other relevant data protection regulations. We undergo regular security audits and penetration testing."
    },
    {
      question: "How is client data protected?",
      answer: "We implement military-grade encryption (AES-256) for data at rest and in transit. Access controls, audit logging, and secure data centers ensure your information remains protected."
    }
  ],
  integration: [
    {
      question: "Can dudil integrate with existing systems?",
      answer: "Yes, dudil offers REST APIs and webhooks for seamless integration with your existing workflows. We support integration with major CRM systems, document management platforms, and enterprise software."
    },
    {
      question: "What are the API rate limits?",
      answer: "API rate limits vary by subscription tier. Enterprise plans include higher limits and dedicated API support. Real-time monitoring and usage analytics help manage API consumption."
    }
  ]
};

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");
  const navigate = useNavigate();

  const filterFaqs = (faqs: typeof faqData.general) => {
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredFaqs = filterFaqs(faqData[activeCategory]);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about dudil's due diligence platform
        </p>
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="general" onValueChange={setActiveCategory}>
        <TabsList className="justify-center">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card className="p-6">
            <Accordion type="single" collapsible>
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <HelpCircle className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Still have questions?</h3>
              <p className="text-muted-foreground">
                Our support team is here to help you with any questions.
              </p>
              <Button className="mt-4" variant="outline" onClick={() => navigate('/contact')}>
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Ready to get started?</h3>
              <p className="text-muted-foreground">
                Begin your due diligence analysis with dudil.
              </p>
              <Button className="mt-4" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

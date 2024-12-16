import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const FAQ = () => {
  const faqItems = [
    {
      question: "What is dudil?",
      answer: "dudil is an advanced due diligence platform designed specifically for investment advisors. It provides comprehensive analysis, real-time market data, and detailed company insights to support informed investment decisions."
    },
    {
      question: "How current is the data?",
      answer: "Our platform updates data in real-time from multiple authoritative sources including SEC EDGAR filings, Bloomberg Financial Data, and other major financial databases. All analysis includes timestamps to ensure transparency about data freshness."
    },
    {
      question: "What types of analysis are available?",
      answer: "We offer comprehensive analysis including financial health assessment, market positioning, risk evaluation, competitive landscape analysis, and regulatory compliance insights. Each analysis is tailored for investment professionals with relevant industry jargon and metrics."
    },
    {
      question: "How do I interpret the investment metrics?",
      answer: "Our platform provides detailed explanations of all metrics, including standard financial ratios (P/E, EBITDA, ROE), market analysis (Beta, Sharpe Ratio), and custom risk indicators. Each metric includes industry benchmarks for context."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <Card className="p-6">
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
};

export default FAQ;
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, RefreshCw, Database } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { dudilSystemPrompt, renderMarkdown } from "@/utils/aiUtils";

// Add dependencies
<lov-add-dependency>marked@latest</lov-add-dependency>
<lov-add-dependency>uuid@latest</lov-add-dependency>

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

interface ResearchEntry {
  id: string;
  query: string;
  response: string;
  timestamp: string;
  metadata: {
    tokens: number;
    complexity: number;
  };
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [messages, setMessages] = useState<Message[]>([]);
  const [researchHistory, setResearchHistory] = useState<ResearchEntry[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const calculateComplexity = (text: string) => {
    const technicalTerms = [
      'financial', 'strategic', 'compliance', 
      'risk', 'market', 'investment', 'analysis'
    ];
    return technicalTerms.reduce((score, term) => 
      text.toLowerCase().includes(term) ? score + 1 : score, 0);
  };

  const addToResearchHistory = useCallback((query: string, response: string) => {
    const researchEntry = {
      id: uuidv4(),
      query,
      response,
      timestamp: new Date().toISOString(),
      metadata: {
        tokens: response.split(' ').length,
        complexity: calculateComplexity(response)
      }
    };
    setResearchHistory(prev => [researchEntry, ...prev]);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user' as const,
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate AI response for now - replace with actual API call
      const aiResponse = {
        role: 'assistant' as const,
        content: `Analysis for: ${input}\n\n${dudilSystemPrompt}`,
        timestamp: Date.now()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiResponse]);
        addToResearchHistory(input, aiResponse.content);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Chat error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="ai">Dudil AI</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <div className="space-y-4 max-w-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <Input placeholder="Enter first name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <Input placeholder="Enter last name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input type="email" placeholder="Enter email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <Textarea placeholder="Tell us about yourself" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Dudil AI Assistant</h2>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Accessing files</span>
              </div>
              <div className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                <span>Real-time data</span>
              </div>
            </div>

            <ScrollArea className="h-[400px] pr-4">
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
                      {msg.role === "assistant" 
                        ? renderMarkdown(msg.content)
                        : msg.content
                      }
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
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
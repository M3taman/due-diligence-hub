import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, FileText, RefreshCw } from "lucide-react";

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

    // Simulate AI response - replace with actual API call
    setTimeout(() => {
      const aiMessage = {
        role: "assistant",
        content: "I'm analyzing your request based on the latest data and uploaded files.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
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
                AI Research Assistant
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
                      {msg.content}
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
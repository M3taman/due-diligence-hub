import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Bell, Key, Shield, Users, Copy, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("sk_test_123456789");
  const [showApiKey, setShowApiKey] = useState(false);

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({ title: "API key copied to clipboard" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 gap-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="billing">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Billing Settings</h2>
              <Badge variant="outline">Pro Plan</Badge>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Payment Method</h3>
                <div className="flex items-center gap-4">
                  <CreditCard className="h-6 w-6" />
                  <div>
                    <p className="font-medium">•••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/24</p>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Billing History</h3>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Amount</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Add billing history rows */}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Analysis Updates</p>
                  <p className="text-sm text-muted-foreground">Receive updates about your analysis requests</p>
                </div>
                <Switch />
              </div>
              {/* Add more notification settings */}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">API Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">API Key</h3>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input 
                      type={showApiKey ? "text" : "password"} 
                      value={apiKey} 
                      readOnly 
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <Button variant="outline" onClick={copyApiKey}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {/* Add API usage stats and documentation links */}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
              {/* Add more security settings */}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Team Management</h2>
            <div className="space-y-6">
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Invite Team Member
              </Button>
              {/* Add team member list and management */}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="billing">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Billing Settings</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Current Plan</h3>
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="font-semibold">Pro Plan</div>
                  <div className="text-sm text-muted-foreground">$1,000/month - Up to 10 users</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Payment Method</h3>
                <div className="flex items-center gap-4">
                  <Input type="text" placeholder="Card number" className="flex-1" />
                  <Button>Update</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {/* Add notification settings here */}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
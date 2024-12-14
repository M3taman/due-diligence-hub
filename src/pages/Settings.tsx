import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
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
          <Button className="bg-primary hover:bg-primary-hover text-white">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
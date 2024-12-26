import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { 
  Database, 
  BarChart2, 
  FileText, 
  Settings, 
  LogOut, 
  HelpCircle, 
  Mail,
  Bell,
  User,
  Menu
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/providers/theme-provider";

const navItems = [
  { label: "Dashboard", path: "/", icon: BarChart2 },
  { label: "Research", path: "/research", icon: FileText },
  { label: "FAQ", path: "/faq", icon: HelpCircle },
  { label: "Settings", path: "/settings", icon: Settings },
];

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out of your account",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="h-16 border-b px-4 flex items-center justify-between bg-background">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <Database className="h-6 w-6" />
          <span className="font-semibold text-lg">DueDiligence OS</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              location.pathname === item.path
                ? "bg-primary/10 text-primary"
                : "hover:bg-accent"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
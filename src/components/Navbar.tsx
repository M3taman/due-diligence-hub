import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Database, BarChart2, FileText, Settings } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: BarChart2 },
  { label: "Research", path: "/research", icon: FileText },
  { label: "Settings", path: "/settings", icon: Settings },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2 mr-8">
          <Database className="h-6 w-6" />
          <span className="text-xl font-bold">DueDiligence OS</span>
        </div>
        
        <div className="flex gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant={isActive ? "secondary" : "ghost"}
                asChild
              >
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
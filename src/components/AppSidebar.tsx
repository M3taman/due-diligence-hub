import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart2, FileText, Settings, Users, ChevronLeft, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/components/providers/theme-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: BarChart2, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Research", path: "/research" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Sidebar collapsed={isCollapsed}>
      <SidebarContent>
        <div className="p-4 mb-4 flex items-center justify-between">
          <h1 className={`text-xl font-bold text-primary transition-opacity ${
            isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
          }`}>
            DueDiligence OS
          </h1>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-accent"
          >
            <ChevronLeft className={`h-5 w-5 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`} />
          </button>
        </div>

        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <SidebarMenuItem 
                  active={location.pathname === item.path}
                  icon={item.icon}
                  className={`${
                    location.pathname === item.path 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-accent'
                  }`}
                >
                  {!isCollapsed && item.label}
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full p-2 rounded-lg hover:bg-accent flex items-center gap-2"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-5 w-5" />
                {!isCollapsed && 'Light Mode'}
              </>
            ) : (
              <>
                <Moon className="h-5 w-5" />
                {!isCollapsed && 'Dark Mode'}
              </>
            )}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
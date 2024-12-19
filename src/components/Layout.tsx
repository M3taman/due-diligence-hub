import { useState } from 'react';
import { ErrorBoundary } from './error/ErrorBoundary';
import { Navbar } from "./Navbar";
import { AppSidebar } from "./AppSidebar";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme } = useTheme();

  return (
    <div className={cn(
      "min-h-screen bg-background",
      theme === "dark" ? "dark" : ""
    )}>
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex h-[calc(100vh-4rem)]">
        <AppSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        <main className={cn(
          "flex-1 overflow-auto transition-all duration-300",
          "p-6 md:p-8",
          sidebarOpen ? "ml-64" : "ml-0"
        )}>
          <ErrorBoundary>
            <div className="container mx-auto max-w-7xl">
              {children}
            </div>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
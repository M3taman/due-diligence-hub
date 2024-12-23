import { NavLink } from 'react-router-dom'
import { BarChart2, FileText, Settings, Users, ChevronLeft, Sun, Moon } from "lucide-react"
import { useLocation } from "react-router-dom"
import { useTheme } from "@/components/providers/theme-provider"
import { useSidebar } from "@/contexts/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarToggle
} from "@/components/ui/sidebar"

const menuItems = [
  { icon: BarChart2, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Research", path: "/research" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: Settings, label: "Settings", path: "/settings" }
]

export function AppSidebar() {
  const location = useLocation()
  const { theme, setTheme } = useTheme()
  const { isCollapsed, toggleSidebar } = useSidebar()

  return (
    <Sidebar collapsed={isCollapsed}>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-4 py-2">
            <span className={`font-semibold transition-all duration-300 ${
              isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
            }`}>
              DuDil OS
            </span>
            <SidebarToggle onClick={toggleSidebar} />
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.path}
                as={NavLink}
                to={item.path}
                icon={item.icon}
                active={location.pathname === item.path}
              >
                {item.label}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              icon={theme === 'dark' ? Sun : Moon}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
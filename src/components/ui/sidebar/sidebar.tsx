import * as React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"
import { LucideIcon } from "lucide-react"

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
  children?: React.ReactNode
}

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Sidebar({ className, children, collapsed = false, ...props }: SidebarProps) {
  return (
    <div 
      className={cn(
        "flex h-screen flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-[4rem]" : "w-[16rem]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-14 items-center border-b px-4", className)}
      {...props}
    />
  )
)
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => (
    <ScrollArea className={cn("flex-1", className)} {...props} ref={ref} />
  )
)
SidebarContent.displayName = "SidebarContent"

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-14 items-center border-t px-4", className)}
      {...props}
    />
  )
)
SidebarFooter.displayName = "SidebarFooter"

export const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, onClick, ...props }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn("h-8 w-8", className)}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
    </Button>
  )
)
SidebarToggle.displayName = "SidebarToggle"

export const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

export const SidebarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { active?: boolean }
>(({ className, active, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
      active && "bg-accent",
      className
    )}
    {...props}
  />
))
SidebarItem.displayName = "SidebarItem"

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-4 px-2 py-2", className)}
    {...props}
  />
))
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 text-xs font-semibold text-muted-foreground", className)}
    {...props}
  />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  active?: boolean
}

export const SidebarMenuItem = React.forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  ({ className, icon: Icon, active, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors",
        active && "bg-accent",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      <span className="truncate">{children}</span>
    </div>
  )
)
SidebarMenuItem.displayName = "SidebarMenuItem"
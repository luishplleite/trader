import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Settings,
  History,
  TrendingUp,
  Bot,
  Zap,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
  },
  {
    title: "Manual Trading",
    url: "/manual",
    icon: TrendingUp,
  },
  {
    title: "Strategy Config",
    url: "/strategy",
    icon: Settings,
  },
  {
    title: "Trade History",
    url: "/history",
    icon: History,
  },
];

interface AppSidebarProps {
  isRobotActive?: boolean;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export default function AppSidebar({ 
  isRobotActive = false, 
  onThemeToggle,
  isDarkMode = true 
}: AppSidebarProps) {
  const [location] = useLocation();

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Big Trader</span>
          </div>
          {isRobotActive && (
            <Badge variant="default" className="animate-pulse" data-testid="badge-robot-status">
              <Zap className="h-3 w-3 mr-1" />
              Active
            </Badge>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(" ", "-")}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onThemeToggle}
            className="w-full justify-start"
            data-testid="button-theme-toggle"
          >
            {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-destructive hover:text-destructive"
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
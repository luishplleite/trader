import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

// Pages
import Dashboard from "@/pages/Dashboard";
import ManualTradingPage from "@/pages/ManualTradingPage";
import StrategyConfigPage from "@/pages/StrategyConfigPage";
import TradeHistory from "@/pages/TradeHistory";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/manual" component={ManualTradingPage} />
      <Route path="/strategy" component={StrategyConfigPage} />
      <Route path="/history" component={TradeHistory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ThemeToggle({ isDarkMode, onToggle }: { isDarkMode: boolean; onToggle: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      data-testid="button-theme-toggle-header"
    >
      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isRobotActive, setIsRobotActive] = useState(false); // todo: remove mock functionality

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Custom sidebar width for trading application
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar 
              isRobotActive={isRobotActive} 
              onThemeToggle={toggleTheme}
              isDarkMode={isDarkMode}
            />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-4 border-b">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
              </header>
              <main className="flex-1 overflow-auto">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

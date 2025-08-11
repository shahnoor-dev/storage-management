"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const isSettingsPage = pathname.startsWith('/account') || pathname.startsWith('/recent') || pathname.startsWith('/invite') || pathname.startsWith('/trash') || pathname.startsWith('/history');

  useEffect(() => {
    setIsClient(true);
    const userPreference = localStorage.getItem('sidebar-collapsed');
    if (userPreference) {
      setIsCollapsed(userPreference === 'true');
    } else {
      setIsCollapsed(window.innerWidth < 1024);
    }
  }, []);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem('sidebar-collapsed', String(newCollapsedState));
  };

  return (
    <>
      {isClient ? (
          <TooltipProvider delayDuration={0}>
              <div className="flex min-h-screen w-full flex-col">
              <Sidebar isCollapsed={isCollapsed} />
              <div 
                  className={cn(
                      "flex flex-col sm:gap-4 sm:py-4 transition-all duration-300",
                      isCollapsed ? "sm:pl-14" : "sm:pl-64"
                  )}
              >
                  <Header 
                      isCollapsed={isCollapsed}
                      toggleSidebar={toggleSidebar}
                  />
                  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                  {children}
                  </main>
              </div>
              </div>
          </TooltipProvider>
      ) : (
          <div className="flex h-screen w-full items-center justify-center">
              Loading...
          </div>
      )}
    </>
  );
}
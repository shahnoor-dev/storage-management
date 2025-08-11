"use client"; // This must be a client component to manage state and effects

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default to collapsed on the server to avoid layout shifts
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // This effect runs only on the client, after the initial render
  useEffect(() => {
    setIsClient(true);
    const userPreference = localStorage.getItem('sidebar-collapsed');
    if (userPreference) {
      setIsCollapsed(userPreference === 'true');
    } else {
      // Default to expanded on desktop if no preference is saved
      setIsCollapsed(window.innerWidth < 1024);
    }
  }, []);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem('sidebar-collapsed', String(newCollapsedState));
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-muted/40 font-sans antialiased",
          inter.variable
        )}
      >
        {/* By checking isClient, we prevent FOUC */}
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
            // You can render a loading skeleton here on the server
            <div className="flex h-screen w-full items-center justify-center">
                Loading...
            </div>
        )}
      </body>
    </html>
  );
}
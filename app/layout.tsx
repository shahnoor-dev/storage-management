"use client"; // Keep this as a client component for the Toaster

import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: ["400", "500", "700"], 
  style: ["normal", "italic"],   
  subsets: ["latin"],           
  display: "swap",              
  variable: "--font-poppins", 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-white text-light-01 font-poppins antialiased",
          poppins.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [isLightMode, setIsLightMode] = React.useState(true);

  const toggleTheme = () => {
    setIsLightMode(prev => !prev);
  };

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="theme-switch" className="cursor-pointer">
        View mode
      </Label>
      
      {/* Wrapper to position icons over the switch */}
      <div className="relative flex items-center">
        <Switch
            id="theme-switch"
            checked={isLightMode}
            onCheckedChange={toggleTheme}
            className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-800"
        />
        <div className="absolute inset-0 flex items-center justify-between px-[3px] pointer-events-none">
            <Sun className={cn(
                "h-3 w-3 text-yellow-300 transition-opacity duration-200",
                isLightMode ? "opacity-100" : "opacity-0"
            )} />
            <Moon className={cn(
                "h-3 w-3 text-white transition-opacity duration-200",
                !isLightMode ? "opacity-100" : "opacity-0"
            )} />
        </div>
      </div>
    </div>
  );
}
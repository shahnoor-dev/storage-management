import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StorageItemCardProps {
  item: {
    title: string;
    icon: LucideIcon;
    size: string;
    lastUpdate: string;
    color: string; // e.g., 'bg-red-400'
    iconColor: string; // e.g., 'text-red-600'
  };
}

export function StorageItemCard({ item }: StorageItemCardProps) {
  return (
    <div className="relative pt-8 w-[226px] h-[233px]">
      {/* Overlapping Icon with custom background */}
      <div className="absolute top-0 left-1">
        <div className={cn("w-16.5 h-16.5 rounded-full relative flex items-center justify-center", item.color)}>
            {/* Soft outer glow */}
            <div className={cn("absolute w-full h-full rounded-full opacity-50 blur-md", item.color)} />
            {/* Main icon */}
            <item.icon className={cn("h-7 w-7 z-10 text-white")} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center space-y-2 pt-4 bg-[url('/img/icons/card-shape.svg')] bg-no-repeat w-full h-full bg-[bottom_center] bg-contain p-3">
        {/* Size (moved to top right) */}
        <div className="absolute top-12 right-6 text-sm font-medium text-gray-600">{item.size}</div>
        
        {/* Title */}
        <div className="text-lg font-bold pt-4">{item.title}</div>
        
        {/* Divider */}
        <div className="w-1/2 border-t border-gray-200" />
        
        {/* Last Update */}
        <p className="text-xs text-gray-400 pt-2">Last update</p>
        <p className="text-sm font-semibold text-gray-700">{item.lastUpdate}</p>
      </div>
    </div>
  );
}
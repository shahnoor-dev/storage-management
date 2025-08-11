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
    <Card className="relative pt-8">
      {/* Overlapping Icon with custom background */}
      <div className="absolute -top-5 left-5">
        <div className={cn("w-16 h-16 rounded-full relative flex items-center justify-center", item.color)}>
            {/* Soft outer glow */}
            <div className={cn("absolute w-full h-full rounded-full opacity-50 blur-md", item.color)} />
            {/* Main icon */}
            <item.icon className={cn("h-7 w-7 z-10", item.iconColor)} />
        </div>
      </div>

      <CardContent className="flex flex-col items-center text-center space-y-2 pt-4">
        {/* Size (moved to top right) */}
        <div className="absolute top-4 right-4 text-sm font-medium text-gray-600">{item.size}</div>
        
        {/* Title */}
        <div className="text-lg font-bold pt-4">{item.title}</div>
        
        {/* Divider */}
        <div className="w-1/2 border-t border-gray-200" />
        
        {/* Last Update */}
        <p className="text-xs text-gray-400 pt-2">Last update</p>
        <p className="text-sm font-semibold text-gray-700">{item.lastUpdate}</p>
      </CardContent>
    </Card>
  );
}
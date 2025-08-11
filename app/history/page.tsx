"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Image as ImageIcon, Video, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for the history items
const historyData = {
    "Today": [
        { action: "You have added", file: "CVdesigner.docx", time: "2 min ago", icon: FileText, color: "bg-red-100 text-red-500" },
        { action: "You have added", file: "WebUI.png", time: "7 min ago", icon: ImageIcon, color: "bg-blue-100 text-blue-500" },
        { action: "You have added", file: "lovefilm.cc", time: "10 min ago", icon: Video, color: "bg-purple-100 text-purple-500" },
    ],
    "2 Days Ago": [
        { action: "You have added", file: "songlove.mp4", time: "2 days ago", icon: Video, color: "bg-green-100 text-green-500" },
        { action: "You have added", file: "documents.docx", time: "2 days ago", icon: FileText, color: "bg-red-100 text-red-500" },
    ],
    "4 Days Ago": [
        { action: "You have added", file: "CV.jpeg", time: "4 days ago", icon: ImageIcon, color: "bg-blue-100 text-blue-500" },
        { action: "You have deleted", file: "old_CVdesigner.docx", time: "4 days ago", icon: Trash2, color: "bg-red-100 text-red-500" },
    ],
};

// A new component for rendering each history item
const HistoryItem = ({ item }: { item: typeof historyData.Today[0] }) => (
    <div className="flex items-center justify-between py-4 border-b">
        <div className="flex items-center gap-4">
            <div className={cn("p-3 rounded-full", item.color)}>
                <item.icon className="h-5 w-5" />
            </div>
            <p>
                {item.action} <span className="font-semibold">{item.file}</span>
            </p>
        </div>
        <p className="text-sm text-muted-foreground">{item.time}</p>
    </div>
);


export default function HistoryPage() {
    return (
        <Card className="p-6 rounded-3xl shadow-lg shadow-gray-100/70 border-gray-100">
            <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold">History</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-6">
                <div className="space-y-8">
                    {Object.entries(historyData).map(([date, items]) => (
                        <div key={date}>
                            <h3 className="text-lg font-semibold mb-2">{date}</h3>
                            <div>
                                {items.map((item, index) => (
                                    <HistoryItem key={index} item={item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  LayoutGrid,
  List,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { FileCard } from "@/components/shared/file-card";
import { FileRow } from "@/components/shared/file-row";

const otherFiles = [
    { name: 'App School.cc', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
    { name: 'BC company.ddr', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
    { name: 'Because I love you.dff', size: '15 MB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
    { name: 'CompanyANV.cc', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
    { name: 'company ABC.cc', size: '6 MB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
    { name: 'My CV.drf', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
    { name: 'My Jobs.cc', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
    { name: 'Photoshop.cc', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
    { name: 'Pig Pig Pig.cc', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
    { name: 'system.sdr', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
    { name: 'school.ddr', size: '15 MB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
    { name: 'Water.ddr', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png' },
];

export default function OthersPage() {
    const [view, setView] = useState('grid');

    return (
        <Card className="p-6 rounded-3xl shadow-lg shadow-gray-100/70 border-gray-100">
            <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Others</h2>
                        <p className="text-sm text-muted-foreground">Total: 12GB</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    Name
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Name</DropdownMenuItem>
                                <DropdownMenuItem>Date</DropdownMenuItem>
                                <DropdownMenuItem>Size</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ToggleGroup type="single" value={view} onValueChange={(value) => { if (value) setView(value) }} className="border rounded-md">
                            <ToggleGroupItem value="list" aria-label="Toggle list">
                                <List className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="grid" aria-label="Toggle grid">
                                <LayoutGrid className="h-4 w-4" />
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>

                {/* Content */}
                <div className={cn(
                    "grid gap-4",
                    view === 'grid' 
                        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                        : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                )}>
                    {otherFiles.map((file) => (
                        view === 'grid' 
                            ? <FileCard key={file.name} file={file} /> 
                            : <FileRow key={file.name} file={file} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
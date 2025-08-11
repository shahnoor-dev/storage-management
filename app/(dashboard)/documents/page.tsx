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

const initialDocuments = [
    { id: '1', name: 'App School.fig', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-figma-3521426-2945072.png', format: 'sketch', dimensions: '20.2 MB', owner: 'David', lastEdit: '10:09pm, 10 Oct' },
    { id: '2', name: 'BC company.sketch', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-sketch-3521528-2945174.png', format: 'sketch', dimensions: '22.4 MB', owner: 'David', lastEdit: '10:15pm, 10 Oct' },
    { id: '3', name: 'B.UI.xd', size: '15 MB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-adobe-xd-3521233-2944854.png', format: 'xd', dimensions: '18.1 MB', owner: 'Mitchel', lastEdit: '11:00am, 09 Oct' },
];

export default function DocumentsPage() {
    const [view, setView] = useState('list');
    const [files, setFiles] = useState(initialDocuments);

    const handleRenameFile = (fileId: string, newName: string) => {
        setFiles(currentFiles => 
            currentFiles.map(file => {
                if (file.id === fileId) {
                    const extension = file.name.split('.').pop();
                    return { ...file, name: `${newName}.${extension}` };
                }
                return file;
            })
        );
    };

    const handleDeleteFile = (fileId: string) => {
        setFiles(currentFiles => currentFiles.filter(file => file.id !== fileId));
    };

    return (
        <Card className="p-6 rounded-3xl shadow-lg shadow-gray-100/70 border-gray-100">
            <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Documents</h2>
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
                    {files.map((file) => (
                        view === 'grid' 
                            ? <FileCard key={file.id} file={file} onRename={handleRenameFile} onDelete={handleDeleteFile} /> 
                            : <FileRow key={file.id} file={file} onRename={handleRenameFile} onDelete={handleDeleteFile} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
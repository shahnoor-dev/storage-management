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

const initialOthers = [
    { id: 'oth1', name: 'App School.cc', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png', format: 'cc', dimensions: '1.1 MB', owner: 'Mitchel', lastEdit: '10:09pm, 10 Oct' },
    { id: 'oth2', name: 'BC company.ddr', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png', format: 'ddr', dimensions: '2.3 MB', owner: 'David', lastEdit: '10:15pm, 10 Oct' },
    { id: 'oth3', name: 'Because I love you.dff', size: '15 MB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-question-mark-1767875-1502400.png', format: 'dff', dimensions: '950 KB', owner: 'Mitchel', lastEdit: '11:00am, 09 Oct' },
];

export default function OthersPage() {
    const [view, setView] = useState('grid');
    const [files, setFiles] = useState(initialOthers);

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
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Others</h2>
                        <p className="text-sm text-muted-foreground">Total: 12GB</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">Name<ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Name</DropdownMenuItem>
                                <DropdownMenuItem>Date</DropdownMenuItem>
                                <DropdownMenuItem>Size</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ToggleGroup type="single" value={view} onValueChange={(value) => { if (value) setView(value) }}>
                            <ToggleGroupItem value="list" aria-label="Toggle list"><List className="h-4 w-4" /></ToggleGroupItem>
                            <ToggleGroupItem value="grid" aria-label="Toggle grid"><LayoutGrid className="h-4 w-4" /></ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
                <div className={cn("grid gap-4", view === 'grid' ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3")}>
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
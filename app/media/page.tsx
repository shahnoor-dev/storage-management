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

const initialMedia = [
    { id: 'med1', name: 'App School.vid', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-play-button-1767892-1502413.png', format: 'vid', dimensions: '1.5 GB', owner: 'David', lastEdit: '10:09pm, 10 Oct' },
    { id: 'med2', name: 'BC company.audi', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-microphone-1767839-1502364.png', format: 'audi', dimensions: '50.1 MB', owner: 'Mitchel', lastEdit: '10:15pm, 10 Oct' },
    { id: 'med3', name: 'Because I love you.mp3', size: '15 MB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-music-1767828-1502353.png', format: 'mp3', dimensions: '4.2 MB', owner: 'David', lastEdit: '11:00am, 09 Oct' },
];

export default function MediaPage() {
    const [view, setView] = useState('grid');
    const [files, setFiles] = useState(initialMedia);

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
                        <h2 className="text-2xl font-bold">Video, Audio</h2>
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
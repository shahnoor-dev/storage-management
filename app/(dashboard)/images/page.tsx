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

const initialImages = [
    { id: 'img1', name: 'App School.png', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-image-3521447-2945093.png', previewSrc: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', format: 'png', dimensions: '1.2 MB', owner: 'Mitchel', lastEdit: '10:09pm, 10 Oct' },
    { id: 'img2', name: 'BC company.jpeg', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-image-3521447-2945093.png', previewSrc: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', format: 'jpeg', dimensions: '3.4 MB', owner: 'David', lastEdit: '10:15pm, 10 Oct' },
    { id: 'img3', name: 'B.UI.jpeg', size: '15 MB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-image-3521447-2945093.png', previewSrc: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', format: 'jpeg', dimensions: '800 KB', owner: 'Mitchel', lastEdit: '11:00am, 09 Oct' },
];

export default function ImagesPage() {
    const [view, setView] = useState('grid');
    const [files, setFiles] = useState(initialImages);

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
                        <h2 className="text-2xl font-bold">Images</h2>
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
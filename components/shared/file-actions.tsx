"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    MoreHorizontal,
    Pencil,
    Info,
    Share2,
    Download,
    Trash2
} from "lucide-react";

interface FileItem {
    name: string;
}

interface FileActionsProps {
    file: FileItem;
}

export function FileActions({ file }: FileActionsProps) {
    const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);

    const menuActions = [
        { label: 'Rename', icon: Pencil, onClick: () => setIsRenameDialogOpen(true) },
        { label: 'Details', icon: Info, onClick: () => {} },
        { label: 'Share', icon: Share2, onClick: () => {} },
        { label: 'Download', icon: Download, onClick: () => {} },
        { label: 'Move to Trash', icon: Trash2, isDestructive: true, onClick: () => {} },
    ];

    return (
        <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>{file.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {menuActions.map((action) => (
                        <DropdownMenuItem 
                            key={action.label} 
                            onClick={action.onClick}
                            className={action.isDestructive ? "text-red-500" : ""}
                        >
                            <action.icon className="mr-2 h-4 w-4" />
                            <span>{action.label}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Rename Dialog Content */}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Rename</DialogTitle>
                <DialogDescription>
                    Enter a new name for your file.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Name
                    </Label>
                    <Input id="name" defaultValue={file.name.split('.')[0]} className="col-span-3" />
                </div>
                </div>
                <DialogFooter>
                <Button type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    MoreHorizontal,
    Pencil,
    Info,
    Share2,
    Download,
    Trash2
} from "lucide-react";
import Image from "next/image";

interface FileItem {
    id: string;
    name: string;
    icon?: string;
    format?: string;
    dimensions?: string;
    owner?: string;
    lastEdit?: string;
}

interface FileActionsProps {
    file: FileItem;
    onRename: (fileId: string, newName: string) => void;
    onDelete: (fileId: string) => void;
}

export function FileActions({ file, onRename, onDelete }: FileActionsProps) {
    const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [newFileName, setNewFileName] = useState(file.name.split('.')[0]);

    const handleSaveRename = () => {
        onRename(file.id, newFileName);
        setIsRenameDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        onDelete(file.id);
        setIsDeleteDialogOpen(false);
    }

    const menuActions = [
        { label: 'Rename', icon: Pencil, onClick: () => setIsRenameDialogOpen(true) },
        { label: 'Details', icon: Info, onClick: () => setIsDetailsDialogOpen(true) },
        { label: 'Share', icon: Share2, onClick: () => {} },
        { label: 'Download', icon: Download, onClick: () => {} },
        { label: 'Move to Trash', icon: Trash2, isDestructive: true, onClick: () => setIsDeleteDialogOpen(true) },
    ];

    const details = [
        { label: 'Format', value: file.format },
        { label: 'Dimensions', value: file.dimensions },
        { label: 'Owner', value: file.owner },
        { label: 'Last edit', value: file.lastEdit },
    ];

    return (
        <>
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
                            className={action.isDestructive ? "text-red-500 hover:!text-red-500" : ""}
                        >
                            <action.icon className="mr-2 h-4 w-4" />
                            <span>{action.label}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Rename Dialog */}
            <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Rename</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input 
                            id="name" 
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                        />
                    </div>
                    <Button type="button" onClick={handleSaveRename}>Save</Button>
                </DialogContent>
            </Dialog>

            {/* Details Dialog */}
            <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                <DialogContent className="sm:max-w-sm p-6">
                    <DialogHeader>
                        <DialogTitle>Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-4">
                            {file.icon && <Image src={file.icon} alt={file.name} width={40} height={40} />}
                            <div>
                                <p className="font-semibold">{file.name}</p>
                                <p className="text-sm text-muted-foreground">{file.lastEdit}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {details.map(detail => (
                                detail.value && (
                                    <div key={detail.label} className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">{detail.label}</span>
                                        <span className="font-medium">{detail.value}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Move to Trash</DialogTitle>
                        <DialogDescription>
                            Are you sure you want move <strong>{file.name}</strong> file to Trash?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <Button type="button" variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleConfirmDelete}>
                            Move
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
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
    Trash2,
    Undo,
    ShieldAlert
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
    onRename?: (fileId: string, newName: string) => void;
    onDelete?: (fileId: string) => void;
    onRestore?: (fileId: string) => void;
    onDeletePermanently?: (fileId: string) => void;
    context?: "default" | "trash";
}

export function FileActions({ file, onRename, onDelete, onRestore, onDeletePermanently, context = "default" }: FileActionsProps) {
    const [isRenameOpen, setIsRenameOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const defaultActions = [
        { label: 'Rename', icon: Pencil, onClick: () => setIsRenameOpen(true) },
        { label: 'Details', icon: Info, onClick: () => setIsDetailsOpen(true) },
        { label: 'Share', icon: Share2, onClick: () => {} },
        { label: 'Download', icon: Download, onClick: () => {} },
        { label: 'Move to Trash', icon: Trash2, isDestructive: true, onClick: () => setIsDeleteOpen(true) },
    ];

    const trashActions = [
        { label: 'Restore', icon: Undo, onClick: () => onRestore?.(file.id) },
        { label: 'Delete Permanently', icon: ShieldAlert, isDestructive: true, onClick: () => setIsDeleteOpen(true) },
    ];

    const menuActions = context === 'trash' ? trashActions : defaultActions;

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

            <RenameDialog file={file} isOpen={isRenameOpen} setIsOpen={setIsRenameOpen} onRename={onRename} />
            <DetailsDialog file={file} isOpen={isDetailsOpen} setIsOpen={setIsDetailsOpen} />
            <DeleteDialog file={file} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} onDelete={context === 'trash' ? onDeletePermanently : onDelete} context={context} />
        </>
    );
}

// --- Reusable Dialog Components ---

const RenameDialog = ({ file, isOpen, setIsOpen, onRename }: any) => {
    const [newFileName, setNewFileName] = useState(file.name.split('.')[0]);
    
    const handleSave = () => {
        onRename?.(file.id, newFileName);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader><DialogTitle>Rename</DialogTitle></DialogHeader>
                <div className="py-4">
                    <Input value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
                </div>
                <Button type="button" onClick={handleSave}>Save</Button>
            </DialogContent>
        </Dialog>
    );
};

const DetailsDialog = ({ file, isOpen, setIsOpen }: any) => {
    const details = [
        { label: 'Format', value: file.format },
        { label: 'Dimensions', value: file.dimensions },
        { label: 'Owner', value: file.owner },
        { label: 'Last edit', value: file.lastEdit },
    ];
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-sm p-6">
                <DialogHeader><DialogTitle>Details</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-4">
                        {file.icon && <Image src={file.icon} alt={file.name} width={40} height={40} />}
                        <div>
                            <p className="font-semibold">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{file.lastEdit}</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {details.map(detail => detail.value && (
                            <div key={detail.label} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{detail.label}</span>
                                <span className="font-medium">{detail.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const DeleteDialog = ({ file, isOpen, setIsOpen, onDelete, context }: any) => {
    const isTrash = context === 'trash';
    const title = isTrash ? "Delete Permanently" : "Move to Trash";
    const description = isTrash 
        ? `This action cannot be undone. This will permanently delete ${file.name}.`
        : `Are you sure you want move ${file.name} file to Trash?`;
    const buttonText = isTrash ? "Delete" : "Move";

    const handleConfirm = () => {
        onDelete?.(file.id);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button type="button" variant="destructive" onClick={handleConfirm}>{buttonText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FileCard } from "@/components/shared/file-card";
import { FileRow } from "@/components/shared/file-row";
import { StorageChart } from "@/components/shared/storage-chart";

const initialTrashedFiles = [
    { id: 'trash1', name: 'aaaaa.jpeg', size: '15 MB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-image-3521447-2945093.png', previewSrc: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 'trash2', name: 'bbbbb.jpeg', size: '15 MB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-image-3521447-2945093.png', previewSrc: 'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 'trash3', name: 'My CV.pdf', size: '2 GB', date: '10:09pm, 10 Oct', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-pdf-3521489-2945135.png' },
];

export default function TrashPage() {
    const [trashedFiles, setTrashedFiles] = useState(initialTrashedFiles);
    
    const trashSizeGB = 12.5;
    const totalTrashCapacityGB = 31.25;
    const trashUsagePercentage = (trashSizeGB / totalTrashCapacityGB) * 100;

    const chartData = useMemo(() => [{ name: "trash", value: trashUsagePercentage, fill: "#ffffff" }], [trashUsagePercentage]);

    const handleRestoreFile = (fileId: string) => {
        setTrashedFiles(currentFiles => currentFiles.filter(file => file.id !== fileId));
        toast("File has been restored."); // Replace alert
    };

    const handleDeletePermanently = (fileId: string) => {
        setTrashedFiles(currentFiles => currentFiles.filter(file => file.id !== fileId));
        toast("File has been permanently deleted."); // Replace alert
    };

    const handleClearTrash = () => {
        setTrashedFiles([]);
        toast("Trash has been cleared."); // Replace alert
    };

    return (
        <Card className="p-6 rounded-3xl shadow-lg shadow-gray-100/70 border-gray-100">
            <CardContent className="p-0">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Trash Bin</h2>
                </div>

                {/* Updated Trash Summary Card */}
                <Card className="md:col-span-1 bg-red-400 text-white rounded-2xl mb-6">
                    <CardContent className="flex items-center justify-between p-6">
                        <div className="relative h-32 w-32">
                            <StorageChart data={chartData} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold">{Math.round(trashUsagePercentage)}%</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="flex flex-col items-center">
                                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm mb-2">
                                    <Trash2 className="h-6 w-6" />
                                </div>
                                <p className="font-semibold">Trash</p>
                                <p className="text-sm opacity-75">{trashSizeGB} GB</p>
                            </div>
                            <Button 
                                variant="secondary" 
                                className="bg-white text-red-500 hover:bg-gray-100 rounded-full px-6"
                                onClick={handleClearTrash}
                            >
                                Clear Trash
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {trashedFiles.map((file) => (
                        <FileCard 
                            key={file.id} 
                            file={file} 
                            onRestore={handleRestoreFile} 
                            onDeletePermanently={handleDeletePermanently}
                            context="trash"
                            onRename={() => {}}
                            onDelete={() => {}}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
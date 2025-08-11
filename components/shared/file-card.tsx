import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FileActions } from "./file-actions";

// The FileItem interface needs to be updated to include an id
interface FileItem {
    id: string;
    name: string;
    size: string;
    date: string;
    icon: string;
    previewSrc?: string;
    format?: string;
    dimensions?: string;
    owner?: string;
    lastEdit?: string;
}

// The props for the component now include the new optional functions and context
interface FileCardProps {
    file: FileItem;
    onRename: (fileId: string, newName: string) => void;
    onDelete: (fileId: string) => void;
    onRestore?: (fileId: string) => void;
    onDeletePermanently?: (fileId: string) => void;
    context?: "default" | "trash";
}

export function FileCard({ file, onRename, onDelete, onRestore, onDeletePermanently, context }: FileCardProps) {
    return (
        <Card className="p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-0">
                <div className="flex items-start justify-between">
                    <div className="w-20 h-20 relative rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        <Image 
                            src={file.previewSrc || file.icon} 
                            alt={file.name} 
                            width={file.previewSrc ? 80 : 40}
                            height={file.previewSrc ? 80 : 40}
                            className={file.previewSrc ? "object-cover w-full h-full" : ""}
                        />
                    </div>
                    
                    <div>
                        <FileActions 
                            file={file} 
                            onRename={onRename} 
                            onDelete={onDelete}
                            onRestore={onRestore}
                            onDeletePermanently={onDeletePermanently}
                            context={context}
                        />
                        <p className="text-right mt-4 text-sm font-medium text-gray-500">{file.size}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-semibold text-gray-800 mt-2">{file.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{file.date}</p>
                </div>
            </CardContent>
        </Card>
    );
}
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FileActions } from "./file-actions";

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

interface FileRowProps {
    file: FileItem;
    onRename: (fileId: string, newName: string) => void;
    onDelete: (fileId: string) => void;
}

export function FileRow({ file, onRename, onDelete }: FileRowProps) {
    return (
        <Card className="p-3 flex items-center justify-between rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-4">
                <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full overflow-hidden">
                    <Image 
                        src={file.previewSrc || file.icon} 
                        alt={file.name} 
                        width={file.previewSrc ? 48 : 24}
                        height={file.previewSrc ? 48 : 24}
                        className={cn(file.previewSrc && "object-cover w-full h-full")}
                    />
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.size} - {file.date}</p>
                </div>
            </div>
            
            <FileActions file={file} onRename={onRename} onDelete={onDelete} />
        </Card>
    );
}
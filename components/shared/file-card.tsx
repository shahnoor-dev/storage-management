import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
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

interface FileCardProps {
    file: FileItem;
    onRename: (fileId: string, newName: string) => void;
    onDelete: (fileId: string) => void;
}

export function FileCard({ file, onRename, onDelete }: FileCardProps) {
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
                        <FileActions file={file} onRename={onRename} onDelete={onDelete} />
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
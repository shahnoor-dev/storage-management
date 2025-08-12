"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

interface UploadingFile {
  id: number;
  name: string;
  icon: string;
  size: number;
}

interface UploadProgressProps {
  files: UploadingFile[];
  onCancel: (fileId: number) => void;
  onComplete: (fileId: number, fileName?: string) => void;
}

const UploadItem = ({
  file,
  onCancel,
  onComplete,
}: {
  file: UploadingFile;
  onCancel: (id: number) => void;
  onComplete: (id: number, fileName?: string) => void;
}) => {
  const [progress, setProgress] = useState(0);
  const estimatedTime = Math.max(3, Math.round(file.size / (1024 * 1024 / 2)));
  const [remainingTime, setRemainingTime] = useState(estimatedTime);
  const completedRef = useRef(false);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          if (!completedRef.current) {
            completedRef.current = true;
            setTimeout(() => {
              onComplete(file.id, file.name); // ✅ Pass file name for toast
            }, 500);
          }
          return 100;
        }
        return prev + 100 / estimatedTime;
      });
    }, 1000);

    const timeTimer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timeTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(timeTimer);
    };
  }, [file.id, file.name, onComplete, estimatedTime]);

  const formatTime = (seconds: number) => {
    if (seconds === 0) return "Finishing...";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0
      ? `${mins} min ${secs} sec remaining`
      : `${secs} sec remaining`;
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
        <Image
          src={file.icon}
          alt={file.name}
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm break-words">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formatTime(remainingTime)}</p>
        <Progress value={progress} className="h-2 mt-1" />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-full flex-shrink-0"
        onClick={() => onCancel(file.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function UploadProgress({ files, onCancel, onComplete }: UploadProgressProps) {
  if (files.length === 0) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-80 rounded-2xl shadow-lg z-50">
      <CardHeader>
        <CardTitle className="text-lg">In Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {files.map((file) => (
          <UploadItem
            key={file.id}
            file={file}
            onCancel={onCancel}
            onComplete={onComplete}
          />
        ))}
      </CardContent>
    </Card>
  );
}

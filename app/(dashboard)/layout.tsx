"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UploadProgress } from "@/components/shared/upload-progress";
import { toast } from "sonner";

// Helper function to get the correct icon based on file type
const getIconForFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            let iconUrl = 'https://cdn.iconscout.com/icon/free/png-256/free-file-3521427-2945073.png'; // Default
            if (extension === 'pdf') iconUrl = 'https://cdn.iconscout.com/icon/free/png-256/free-pdf-3521489-2945135.png';
            if (extension === 'fig') iconUrl = 'https://cdn.iconscout.com/icon/free/png-256/free-figma-3521426-2945072.png';
            if (extension === 'sketch') iconUrl = 'https://cdn.iconscout.com/icon/free/png-256/free-sketch-3521528-2945174.png';
            if (file.type.startsWith('video/')) iconUrl = 'https://cdn.iconscout.com/icon/free/png-256/free-play-button-1767892-1502413.png';
            if (file.type.startsWith('audio/')) iconUrl = 'https://cdn.iconscout.com/icon/free/png-256/free-music-1767828-1502353.png';
            resolve(iconUrl);
        }
    });
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isShowOnMobile, setIsShowOnMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();
    const isSettingsPage =
        pathname.startsWith("/account") ||
        pathname.startsWith("/recent") ||
        pathname.startsWith("/invite") ||
        pathname.startsWith("/trash") ||
        pathname.startsWith("/history");
    const [uploadingFiles, setUploadingFiles] = useState<any[]>([]);

    useEffect(() => {
        setIsClient(true);
        const userPreference = localStorage.getItem("sidebar-collapsed");
        if (userPreference) {
            setIsCollapsed(userPreference === "true");
        } else {
            setIsCollapsed(window.innerWidth < 1024);
        }
    }, []);

    const toggleSidebar = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);
        localStorage.setItem("sidebar-collapsed", String(newCollapsedState));
    };

    const handleUpload = async (files: FileList) => {
        const newFilesPromises = Array.from(files).map(async (file) => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size, // Pass the file size
            icon: await getIconForFile(file),
        }));
        const newFiles = await Promise.all(newFilesPromises);
        setUploadingFiles((prev) => [...prev, ...newFiles]);
    };

    const handleCancelUpload = (fileId: number) => {
        setUploadingFiles((prev) => prev.filter((f) => f.id !== fileId));
    };

    // ✅ Stable function to avoid duplicate onComplete calls
    const handleUploadComplete = useCallback((fileId: number, fileName?: string) => {
        if (fileName) {
            toast.success(`${fileName} has been uploaded.`);
        }
        setUploadingFiles((prev) => prev.filter((f) => f.id !== fileId));
    }, []);

    return (
        <>
            {isClient ? (
                <TooltipProvider delayDuration={0}>
                    <div className="flex min-h-screen w-full flex-col">
                        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isShowOnMobile={isShowOnMobile} setIsShowOnMobile={setIsShowOnMobile} />
                        <div
                            className={cn(
                                "flex flex-col transition-all duration-300",
                                isCollapsed ? "sm:pl-21" : "sm:pl-81"
                            )}
                        >
                            <Header
                                isCollapsed={isCollapsed}
                                toggleSidebar={toggleSidebar}
                                onUpload={handleUpload}
                                isShowOnMobile={isShowOnMobile}
                                setIsShowOnMobile={setIsShowOnMobile}
                            />
                            <main className={cn("grid flex-1 items-start gap-4 bg-accent min-h-[calc(100vh-108px)] sm:min-h-[calc(100vh-132px)] max-h-[calc(100vh-108px)] sm:max-h-[calc(100vh-132px)] p-3 sm:p-8 rounded-[30px]", isCollapsed ? "w-[calc(100vw-116px)]": "mx-auto w-[calc(100vw-24px)] sm:w-[calc(100vw-356px)]")}>
                                <div className="min-h-[calc(100vh-132px)] max-h-[calc(100vh-132px)] sm:min-h-[calc(100vh-196px)] sm:max-h-[calc(100vh-196px)] rounded-[24px] overflow-y-scroll scrollbar-hide">
                                    {children}
                                </div>
                            </main>
                            {/* Render the progress component */}
                            <UploadProgress
                                onComplete={handleUploadComplete}
                                files={uploadingFiles}
                                onCancel={handleCancelUpload}
                            />
                        </div>
                    </div>
                </TooltipProvider>
            ) : (
                <div className="flex h-screen w-full items-center justify-center">
                    Loading...
                </div>
            )}
        </>
    );
}

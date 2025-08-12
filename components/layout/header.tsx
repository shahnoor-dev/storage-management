"use client"; // This component now uses client-side state for the dropdown

import { useRef } from "react";
import {
    Search,
    Upload,
    PanelLeftClose,
    PanelRightClose,
    Menu
} from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ThemeToggle } from "../shared/theme-toggle"; // Import the new component

interface HeaderProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    onUpload: (files: FileList) => void;
    isShowOnMobile: boolean;
    setIsShowOnMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ isCollapsed, toggleSidebar, onUpload, isShowOnMobile, setIsShowOnMobile }: HeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onUpload(e.target.files);
        }
    };

    const handleShowMobileMenu = () => {
        setIsShowOnMobile(() => true);
    }

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Button size="icon" variant="outline" className="sm:hidden" onClick={handleShowMobileMenu} >
                <Menu className="h-5 w-5" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                className="hidden sm:flex"
                onClick={toggleSidebar}
            >
                {isCollapsed ? <PanelRightClose className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            </Button>

            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[520px]"
                />
            </div>
            {/* Hidden file input for uploads */}
            <input
                type="file"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <Button variant="default" className="ml-auto" onClick={handleUploadClick}>
                <Upload className="mr-2 h-4 w-4" />
                Upload
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                        <Image src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={36} height={36} alt="Avatar" className="overflow-hidden rounded-full object-cover" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 p-2">
                    <DropdownMenuItem className="py-2">
                        <Link href={"/account"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1.5">
                        <ThemeToggle />
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="py-2 text-red-500 hover:!text-red-500">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
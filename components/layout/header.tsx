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
        <header className="sticky top-0 z-30 flex h-24 items-center gap-4 bg-background px-4 py-6 sm:static sm:h-auto sm:bg-transparent sm:px-6">
            <Button size="theme" variant="theme" className="sm:hidden" onClick={handleShowMobileMenu} >
                <Menu className="!h-5 !w-5" />
            </Button>

            <Button
                variant="theme"
                size="theme"
                className="hidden sm:flex"
                onClick={toggleSidebar}
            >
                {isCollapsed ? <PanelRightClose className="!h-5 !w-5" /> : <PanelLeftClose className="!h-5 !w-5" />}
            </Button>

            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-4 top-4 !h-5 !w-5 text-light-01" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full sm:w-[200px] md:w-[320px] xl:w-[520px]"
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
            <Button variant="theme" size="theme" className="sm:px-6 ml-auto" onClick={handleUploadClick}>
                <Upload className="sm:mr-2 !h-5 !w-5" />
                <span className="hidden sm:block">Upload</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="theme" size="theme" className="p-0">
                        <Image src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={52} height={52} alt="Avatar" className="overflow-hidden h-13 w-13 shadow-lg rounded-full object-cover" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 px-5 border-0 shadow-lg py-3.5 mt-2">
                    <DropdownMenuItem className="py-[15px] px-2 font-medium">
                        <Link href={"/account"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-[15px]">
                        <ThemeToggle />
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="py-[15px] px-2 font-medium text-red-500 hover:!text-red-500">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
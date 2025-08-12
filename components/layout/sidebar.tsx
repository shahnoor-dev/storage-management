"use client";

import { useEffect } from "react";
import {
    LayoutDashboard,
    FileText,
    ImageIcon,
    Video,
    Settings,
    User,
    Clock,
    UserPlus,
    Trash2,
    ChartPie,
    LogOut,
    ArrowLeft,
    X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.png";
import file from "@/public/img/icons/file.svg";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

const mainNavItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Images', href: '/images', icon: ImageIcon },
    { name: 'Video, Audio', href: '/media', icon: Video },
    { name: 'Others', href: '/others', icon: ChartPie },
    { name: 'Settings', href: '/account', icon: Settings },
];

const settingsNavItems = [
    { name: 'Account Settings', href: '/account', icon: User, iconBg: "accent-orange" },
    { name: 'Recent Files', href: '/recent', icon: Clock, iconBg: "accent-blue" },
    { name: 'Invite a Friend', href: '/invite', icon: UserPlus, iconBg: "accent-pink" },
    { name: 'Trash Bin', href: '/trash', icon: Trash2, iconBg: "accent-red" },
    { name: 'History', href: '/history', icon: Clock, iconBg: "default-band" },
];

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    isShowOnMobile: boolean;
    setIsShowOnMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isCollapsed, setIsCollapsed, isShowOnMobile, setIsShowOnMobile }: SidebarProps) {
    const pathname = usePathname();
    const isSettingsPage = pathname.startsWith('/account') || pathname.startsWith('/recent') || pathname.startsWith('/invite') || pathname.startsWith('/trash') || pathname.startsWith('/history');

    const handleShowMobileMenu = () => {
        setIsShowOnMobile(() => false);
    }

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 640) {
                setIsCollapsed(false);
            } else if (width < 1024) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        // Run on mount
        handleResize();

        // Listen for window resize
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setIsCollapsed]);

    return (
        <>
            <div className={cn("fixed min-h-screen min-w-screen bg-black/70 z-40 sm:hidden", isShowOnMobile ? "left-0" : "-left-[110%]")} onClick={handleShowMobileMenu} >
            </div>
            <Button size="icon" variant="outline" className={cn("fixed sm:hidden top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full shadow-xl text-muted-foreground transition-colors hover:bg-accent", isShowOnMobile ? "right-4" : "-right-24")} onClick={handleShowMobileMenu} >
                <X className="h-5 w-5" />
            </Button>
            <div
                className={cn(
                    "fixed inset-y-0 sm:left-0 z-40 flex-col bg-background transition-all duration-300 flex",
                    isCollapsed ? "w-14" : "w-81 px-9 py-8", isShowOnMobile ? "left-0" : "-left-85"
                )}
            >
                <div className={cn("flex flex-col h-full", isCollapsed ? "items-center px-2 py-8" : "items-start")}>
                    {/* Top Section */}
                    <div>
                        <Link href="/" className={cn("flex items-center gap-3 mb-16")}>
                            <Image
                                src={logo}
                                alt="Storage"
                                width={40} // optional fixed size
                                height={40} // optional fixed size
                                className="object-contain"
                            />
                            <h1 className={cn("text-2xl font-medium text-default-band", isCollapsed && "hidden")}>Storage</h1>
                        </Link>
                    </div>

                    {/* Navigation Section */}
                    <nav className="flex flex-col gap-4 w-full">
                        {isSettingsPage && (isCollapsed ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-full shadow-xl text-muted-foreground transition-colors hover:bg-accent">
                                        <ArrowLeft className="h-5 w-5" />
                                        <span className="sr-only">Back to Dashboard</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Back to Dashboard</TooltipContent>
                            </Tooltip>
                        ) : (
                            <Link href="/" className="flex items-center font-medium gap-4">
                                <div className="h-11 w-11 flex items-center justify-center shadow-md rounded-full">
                                    <ArrowLeft className="h-4 w-4" />
                                </div>
                                Back to Dashboard
                            </Link>
                        ))}
                        {isSettingsPage ? (
                            settingsNavItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    isCollapsed ? (
                                        <Tooltip key={item.name}>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href={item.href}
                                                    className={cn("flex h-9 w-9 items-center justify-center rounded-full transition-all", isActive ? 'bg-default-band text-white hover:text-white' : 'text-muted-foreground hover:bg-accent')}
                                                >
                                                    <div className={cn(`h-8 w-8 p-[9px] bg-${item.iconBg} rounded-full`)}>
                                                        <item.icon className={cn("h-[14px] w-[14px] text-white")} />
                                                    </div>
                                                    <span className="sr-only">{item.name}</span>
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">{item.name}</TooltipContent>
                                        </Tooltip>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            href={item.href} onClick={() => {
                                                if (window.innerWidth < 640) { // sm breakpoint
                                                    handleShowMobileMenu();
                                                }
                                            }}
                                            className={cn("flex items-center gap-[18px] font-medium rounded-[30px] p-[10px] transition-all w-full", isActive ? 'bg-default-band/10' : 'text-light-01 hover:bg-accent')}
                                        >
                                            <div className={cn(`h-8 w-8 p-[9px] bg-${item.iconBg} rounded-full`)}>
                                                <item.icon className={cn("h-[14px] w-[14px] text-white")} />
                                            </div>
                                            <span>{item.name}</span>
                                        </Link>
                                    )
                                )
                            })
                        ) : (
                            mainNavItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    isCollapsed ? (
                                        <Tooltip key={item.name}>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href={item.href}
                                                    className={cn("flex h-9 w-9 items-center justify-center rounded-full transition-all", isActive ? 'bg-blue-500 text-white hover:text-white' : 'text-muted-foreground hover:bg-accent')}
                                                >
                                                    <item.icon className="h-5 w-5" />
                                                    <span className="sr-only">{item.name}</span>
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">{item.name}</TooltipContent>
                                        </Tooltip>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            href={item.href} onClick={() => {
                                                if (window.innerWidth < 640) { // sm breakpoint
                                                    handleShowMobileMenu();
                                                }
                                            }}
                                            className={cn("flex items-center gap-[18px] font-medium rounded-[30px] px-[30px] py-[17px] transition-all w-full", isActive ? 'bg-default-band text-white shadow-lg' : 'text-light-01 hover:bg-accent')}
                                        >
                                            <item.icon className={cn("h-[26px] w-[26px]", isActive ? "text-white" : "text-muted-foreground")} />
                                            <span>{item.name}</span>
                                        </Link>
                                    )
                                )
                            })
                        )}
                    </nav>

                    {/* Bottom Section */}
                    <div className="mt-auto w-full">
                        {isSettingsPage ? (
                            isCollapsed ? (
                                <div className="flex flex-col gap-2 items-center">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-red-500 hover:bg-accent hover:text-red-600">
                                                <LogOut className="h-5 w-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">Logout</TooltipContent>
                                    </Tooltip>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Button variant="logout" size="logout" className="w-full">
                                        <LogOut className="mr-2 !h-5 !w-5" />
                                        Logout
                                    </Button>
                                </div>
                            )
                        ) : (
                            !isCollapsed && (
                                <div className="relative">
                                    <div className="bg-default-band/10 h-[127px] rounded-3xl"></div>
                                    <Image
                                        src={file}
                                        alt="file"
                                        width={174}
                                        height={174}
                                        className="object-contain absolute bottom-9 left-[50%] -translate-x-[50%]"
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
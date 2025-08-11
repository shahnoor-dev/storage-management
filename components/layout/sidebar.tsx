"use client";

import {
    LayoutDashboard,
    FileText,
    ImageIcon,
    Video,
    MoreHorizontal,
    Settings,
    User,
    Clock,
    UserPlus,
    Trash2,
    Bell,
    LogOut,
    ArrowLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const mainNavItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Images', href: '/images', icon: ImageIcon },
    { name: 'Video, Audio', href: '/media', icon: Video },
    { name: 'Others', href: '/others', icon: MoreHorizontal },
    { name: 'Settings', href: '/account', icon: Settings },
];

const settingsNavItems = [
    { name: 'Account Settings', href: '/account', icon: User },
    { name: 'Recent Files', href: '/recent', icon: Clock },
    { name: 'Invite a Friend', href: '/invite', icon: UserPlus },
    { name: 'Trash Bin', href: '/trash', icon: Trash2 },
    { name: 'History', href: '/history', icon: Clock },
];

interface SidebarProps {
    isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
    const pathname = usePathname();
    const isSettingsPage = pathname.startsWith('/account') || pathname.startsWith('/recent') || pathname.startsWith('/invite') || pathname.startsWith('/trash') || pathname.startsWith('/history');

    const navItems = isSettingsPage ? settingsNavItems : mainNavItems;

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background transition-all duration-300 sm:flex",
                isCollapsed ? "w-14" : "w-64 p-6"
            )}
        >
            <div className={cn("flex flex-col h-full", isCollapsed ? "items-center px-2 py-5" : "items-start")}>
                {/* Top Section */}
                <div>
                    <Link href="/" className={cn("flex items-center gap-2 mb-16")}>
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-white"></div>
                        </div>
                        <h1 className={cn("text-xl font-bold text-blue-500", isCollapsed && "hidden")}>Storage</h1>
                    </Link>
                </div>

                {/* Navigation Section */}
                <nav className="flex flex-col gap-5 w-full">
                    {isSettingsPage && (isCollapsed ? (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-full shadow-md text-muted-foreground transition-colors hover:bg-accent">
                                    <ArrowLeft className="h-5 w-5" />
                                    <span className="sr-only">Back to Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Back to Dashboard</TooltipContent>
                        </Tooltip>
                    ) : (
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-11 w-11 flex items-center justify-center shadow-md rounded-full">
                                <ArrowLeft className="h-4 w-4" />
                            </div>
                            Back to Dashboard
                        </Link>
                    ))}
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            isCollapsed ? (
                                <Tooltip key={item.name}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-all", isActive ? 'bg-blue-500 text-white hover:text-white' : 'text-muted-foreground hover:bg-accent')}
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
                                    href={item.href}
                                    className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all w-full", isActive ? 'bg-blue-100 text-blue-600' : 'text-muted-foreground hover:bg-accent')}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            )
                        )
                    })}
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
                                <Button variant="outline" className="w-full text-red-500 hover:text-red-600">
                                    <LogOut className="mr-2 h-5 w-5" />
                                    Logout
                                </Button>
                            </div>
                        )
                    ) : (
                        !isCollapsed && (
                            <Image
                                src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Abstract background"
                                width={200}
                                height={150}
                                className="object-contain"
                            />
                        )
                    )}
                </div>
            </div>
        </aside>
    );
}
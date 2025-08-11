"use client"; // Required to use hooks like usePathname

import {
    LayoutDashboard,
    FileText,
    ImageIcon,
    Video,
    MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import the hook
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Images', href: '/images', icon: ImageIcon },
    { name: 'Video, Audio', href: '/media', icon: Video },
    { name: 'Others', href: '/others', icon: MoreHorizontal },
];

interface SidebarProps {
    isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
    const pathname = usePathname(); // Get the current path

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background transition-all duration-300 sm:flex",
                isCollapsed ? "w-14" : "w-64 p-6"
            )}
        >
            <nav
                className={cn(
                    "flex flex-col gap-4",
                    isCollapsed ? "items-center px-2 py-5" : "items-start"
                )}
            >
                <Link href="/" className={cn("flex items-center gap-2 mb-8", isCollapsed ? "justify-center" : "self-start")}>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white"></div>
                    </div>
                    <h1 className={cn("text-xl font-bold text-blue-500", isCollapsed && "hidden")}>Storage</h1>
                </Link>

                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        isCollapsed ? (
                            <Tooltip key={item.name}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex h-9 w-9 items-center justify-center rounded-lg transition-all",
                                            isActive
                                                ? 'bg-blue-500 text-white hover:text-white hover:bg-blue-600'
                                                : 'text-muted-foreground hover:bg-accent hover:text-primary'
                                        )}
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
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent hover:text-primary w-full",
                                    isActive
                                        ? 'bg-blue-500 text-white hover:text-white hover:bg-blue-600'
                                        : 'text-muted-foreground'
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                            </Link>
                        )
                    )
                })}
            </nav>
            <div className={cn("mt-auto", isCollapsed && "hidden")}>
                <div className={cn("mt-auto", isCollapsed && "hidden")}>
                    <Image
                        src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Abstract background"
                        width={200}
                        height={150}
                        className="object-contain"
                    />
                </div>
            </div>
        </aside>
    );
}
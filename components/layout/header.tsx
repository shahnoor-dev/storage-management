"use client"; // This component now uses client-side state for the dropdown

import {
  Search,
  Upload,
  PanelLeftClose,
  PanelRightClose,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileNav } from "./mobile-nav";
import Image from "next/image";
import { ThemeToggle } from "../shared/theme-toggle"; // Import the new component

interface HeaderProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export default function Header({ isCollapsed, toggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <MobileNav />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
             <a
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Image src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="logo" width={24} height={24} />
              <span className="sr-only">Storage</span>
            </a>
            <a href="/" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">Dashboard</a>
            <a href="/documents" className="flex items-center gap-4 px-2.5 text-foreground">Documents</a>
            <a href="/images" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">Images</a>
            <a href="/media" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">Video, Audio</a>
            <a href="/others" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">Others</a>
          </nav>
        </SheetContent>
      </Sheet>
      
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
      <Button variant="default" className="ml-auto">
        <Upload className="mr-2 h-4 w-4" />
        Upload
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <Image src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={36} height={36} alt="Avatar" className="overflow-hidden rounded-full object-cover"/>
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
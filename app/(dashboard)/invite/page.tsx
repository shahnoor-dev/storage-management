"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import Image from "next/image";

// Mock social icons - in a real app, these might be more complex components
const SocialIcon = ({ children }: { children: React.ReactNode }) => (
    <Button variant="outline" size="icon" className="rounded-full">
        {children}
    </Button>
);

export default function InvitePage() {
    const [copied, setCopied] = useState(false);
    const referralCode = "HKP109BHUO5THI2";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <Card className="p-6 rounded-3xl shadow-lg shadow-gray-100/70 border-gray-100 flex items-center justify-center">
            <CardContent className="p-0 max-w-md w-full text-center">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Invite a Friend</CardTitle>
                    <CardDescription>
                        Copy your code, share it with your friends.
                    </CardDescription>
                </CardHeader>

                <div className="my-8 flex justify-center">
                    <Image 
                        src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Invite a friend illustration"
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Input value={referralCode} readOnly />
                    <Button onClick={handleCopy} className="w-24">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 mr-2" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-background px-2 text-muted-foreground">Or Share via</span>
                    </div>
                </div>

                <div className="flex justify-center space-x-4">
                    <SocialIcon>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                    </SocialIcon>
                    <SocialIcon>
                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.72-1.88-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.71 0-1.37-.22-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.94.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.01-.06A12.07 12.07 0 0 0 8.84 20c7.3 0 11.28-6.06 11.28-11.28l-.01-.51c.78-.57 1.45-1.28 1.99-2.08z" /></svg>
                    </SocialIcon>
                    <SocialIcon>
                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.149-4.771-1.664-4.919-4.919-.058-1.265-.07-1.644-.07-4.85s.012-3.585.07-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163zm0 1.802C9.042 3.965 8.71 3.977 7.433 4.032c-2.43.11-3.487 1.16-3.597 3.597C3.977 8.71 3.965 9.042 3.965 12s.012 3.29.067 4.567c.11 2.43 1.167 3.487 3.597 3.597 1.277.055 1.609.067 4.567.067s3.29-.012 4.567-.067c2.43-.11 3.487-1.167 3.597-3.597.055-1.277.067-1.609.067-4.567s-.012-3.29-.067-4.567c-.11-2.43-1.167-3.487-3.597-3.597C15.29 3.977 14.958 3.965 12 3.965zm0 2.882a5.155 5.155 0 1 0 0 10.31 5.155 5.155 0 0 0 0-10.31zm0 1.802a3.353 3.353 0 1 1 0 6.706 3.353 3.353 0 0 1 0-6.706zm6.406-3.353a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" /></svg>
                    </SocialIcon>
                </div>
            </CardContent>
        </Card>
    );
}
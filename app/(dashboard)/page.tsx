"use client";

import { useState } from "react"; // Import useState
import { toast } from "sonner"; // Import toast
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  ImageIcon,
  Video,
  MoreHorizontal,
  Copy,
  Check, // Import Check icon
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StorageChart } from "@/components/shared/storage-chart";
import { StorageItemCard } from "@/components/shared/storage-item-card";
import { AddContactDialog } from "@/components/shared/add-contact-dialog";

const initialContacts = [
  { name: "Alice Emma", email: "emmaart1234@gmail.com", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { name: "Anne Jennifer", email: "jennifer@gmail.com", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { name: "Bush Matthew", email: "matthew0909@gmail.com", avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];

const storageItems = [
    { title: "Documents", icon: FileText, size: "12 GB", lastUpdate: "10:15am, 10 Oct", color: "bg-red-200", iconColor: "text-red-500" },
    { title: "Images", icon: ImageIcon, size: "20 GB", lastUpdate: "10:15am, 10 Oct", color: "bg-blue-200", iconColor: "text-blue-500" },
    { title: "Video, Audio", icon: Video, size: "20 GB", lastUpdate: "10:15am, 10 Oct", color: "bg-green-200", iconColor: "text-green-500" },
    { title: "Others", icon: MoreHorizontal, size: "38 GB", lastUpdate: "10:15am, 10 Oct", color: "bg-purple-200", iconColor: "text-purple-500" },
];

const chartData = [{ name: "storage", value: 65, fill: "#ffffff" }];

export default function Dashboard() {
    const [contacts, setContacts] = useState(initialContacts);
    const [copied, setCopied] = useState(false);
    const referralCode = "HKP109BHUO5THI2";

    const handleAddContact = (newContact: { name: string; email: string; avatar: string; }) => {
        setContacts(prevContacts => [newContact, ...prevContacts]);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode).then(() => {
            toast("Referral code copied to clipboard!");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2 bg-blue-500 text-white">
                    <CardContent className="flex items-center justify-between p-6">
                        <div className="relative h-40 w-40">
                            <StorageChart data={chartData} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold">65%</span>
                                <span className="text-sm opacity-75">Space used</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold">Available Storage</p>
                            <p className="text-md opacity-75">82GB / 128GB</p>
                        </div>
                    </CardContent>
                </Card>
                {storageItems.map((item) => (
                    <StorageItemCard key={item.title} item={item} />
                ))}
            </div>
        </div>

        {/* Right Sidebar Area */}
        <div className="lg:col-span-1 space-y-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Contact</CardTitle>
                    <AddContactDialog onAddContact={handleAddContact} />
                </CardHeader>
                <CardContent className="space-y-4">
                    {contacts.map((contact) => (
                        <div key={contact.email} className="flex items-center gap-4">
                            <Image src={contact.avatar} alt={contact.name} height={40} width={40} className="rounded-full flex-none h-10 w-10 object-cover" />
                            <div>
                                <p className="font-semibold">{contact.name}</p>
                                <p className="text-sm text-muted-foreground">{contact.email}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Invite a Friend Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Invite a Friend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Input value={referralCode} readOnly />
                        <Button variant="outline" size="icon" onClick={handleCopy}>
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <Button variant="outline" size="icon" className="rounded-full"><Facebook className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" className="rounded-full"><Twitter className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" className="rounded-full"><Instagram className="h-4 w-4" /></Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
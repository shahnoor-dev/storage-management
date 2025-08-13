"use client";

import { useState } from "react";
import { toast } from "sonner";
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
  Copy,
  Check,
  Facebook,
  Twitter,
  Instagram,
  ChartPie
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
  { title: "Documents", icon: FileText, size: "12 GB", lastUpdate: "10:15am, 10 Oct", color: "bg-accent-red", iconColor: "text-red-500" },
  { title: "Images", icon: ImageIcon, size: "20 GB", lastUpdate: "10:15am, 10 Oct", color: "bg-accent-blue", iconColor: "text-blue-500" },
  { title: "Video, Audio", icon: Video, size: "20 GB", lastUpdate: "10:15am, 10 Oct", color: "bg-accent-green", iconColor: "text-green-500" },
  { title: "Others", icon: ChartPie, size: "38 GB", lastUpdate: "10:15am, 10 Oct", color: "bg-accent-pink", iconColor: "text-purple-500" },
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
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      
      {/* Main Content Area */}
      <div className="md:w-1/2 flex flex-col gap-4">
        
        <Card className="bg-default-band text-white flex-1 min-w-[300px]">
          <CardContent className="flex items-center p-6 gap-4">
            <div className="relative h-40 w-40">
              <StorageChart data={chartData} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">65%</span>
                <span className="text-sm opacity-75">Space used</span>
              </div>
            </div>
            <div>
              <p className="text-xl font-semibold">Available Storage</p>
              <p className="font-medium opacity-75 mt-1">82GB / 128GB</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-6 flex-wrap">
          {storageItems.map((item) => (
          <div key={item.title}>
            <StorageItemCard item={item} />
          </div>
        ))}
        </div>

      </div>

      {/* Right Sidebar Area */}
      <div className="md:w-1/2 flex flex-col gap-4">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Contact</CardTitle>
            <AddContactDialog onAddContact={handleAddContact} />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
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
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Input value={referralCode} readOnly />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex justify-center gap-4">
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

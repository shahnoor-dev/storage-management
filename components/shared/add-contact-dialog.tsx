"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface AddContactDialogProps {
    onAddContact: (newContact: { name: string; email: string; avatar: string; }) => void;
}

export function AddContactDialog({ onAddContact }: AddContactDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!name || !email) {
            toast.error("Please fill in all fields.");
            return;
        }
        const newContact = {
            name,
            email,
            avatar: avatarPreview || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Default avatar
        };
        onAddContact(newContact);
        toast.success(`${name} has been added to your contacts.`);
        
        // Reset form and close dialog
        setName("");
        setEmail("");
        setAvatarPreview("");
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-full">
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Contact</DialogTitle>
                    <DialogDescription>
                        Enter the details for your new contact.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer" onClick={handleAvatarClick}>
                            {avatarPreview ? (
                                <Image src={avatarPreview} alt="Avatar preview" layout="fill" className="rounded-full object-cover" />
                            ) : (
                                <UserIcon className="h-12 w-12 text-gray-400" />
                            )}
                        </div>
                         <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. john@example.com" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} className="w-full">Add Contact</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
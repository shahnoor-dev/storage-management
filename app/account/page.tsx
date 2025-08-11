"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { SettingsInput } from "@/components/shared/settings-input"; // Import our new component
import { Camera } from "lucide-react";

const initialUserData = {
    fullName: "Mitchel Lensink",
    email: "mitchellensink@gmail.com",
    phone: "0901605000",
    sex: "male",
    location: "Vietnam",
    city: "Ho Chi Minh City",
    // This is the updated, reliable image link
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};

export default function AccountSettingsPage() {
    const [userData, setUserData] = useState(initialUserData);
    const [avatarPreview, setAvatarPreview] = useState(initialUserData.avatar);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData(prev => ({ ...prev, [id]: value }));
    };

    const handleSexChange = (value: string) => {
        setUserData(prev => ({ ...prev, sex: value }));
    };

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

    const handleSaveChanges = () => {
        console.log("Saving data:", { ...userData, avatar: avatarPreview });
        alert("Changes saved!");
    };

    const handleCancel = () => {
        setUserData(initialUserData);
        setAvatarPreview(initialUserData.avatar);
    };

    return (
        <Card className="p-6 rounded-3xl shadow-lg shadow-gray-100/70 border-gray-100">
            <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Account Settings</h2>
                    </div>
                </div>
            <CardContent className="flex flex-col gap-8">
                {/* Left Side: Avatar */}
                    <div className="relative w-max">
                        <Image 
                            src={avatarPreview} 
                            alt="User Avatar" 
                            width={152} 
                            height={152} 
                            className="rounded-full object-cover w-38 h-38"
                        />
                        <Button size="icon" className="absolute bottom-1 right-1 rounded-full h-8 w-8 bg-blue-500 hover:bg-blue-600" onClick={handleAvatarClick}>
                            <Camera className="h-4 w-4" />
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                {/* Right Side: Form */}
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SettingsInput id="fullName" label="Full Name" value={userData.fullName} onChange={handleInputChange} />
                    <SettingsInput id="email" label="Email" type="email" value={userData.email} onChange={handleInputChange} />
                    <SettingsInput id="phone" label="Phone number" value={userData.phone} onChange={handleInputChange} />
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Sex</Label>
                        <RadioGroup defaultValue={userData.sex} onValueChange={handleSexChange} className="flex items-center gap-4 pt-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female">Female</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <SettingsInput id="location" label="Location" value={userData.location} onChange={handleInputChange} />
                    <SettingsInput id="city" label="City" value={userData.city} onChange={handleInputChange} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-start gap-2 pt-6">
                <Button onClick={handleSaveChanges} className="px-6">Update</Button>
                <Button variant="ghost" onClick={handleCancel} className="px-6">Cancel</Button>
            </CardFooter>
        </Card>
    );
}
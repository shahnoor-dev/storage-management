"use client";

import * as React from "react";
import Image from "next/image";
import AuthLayout from "../layout";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function ForgotPasswordPage() {
    const [emailSent, setEmailSent] = React.useState(false);
    const [submittedEmail, setSubmittedEmail] = React.useState("");

    const handleEmailSent = (email: string) => {
        setSubmittedEmail(email);
        setEmailSent(true);
    };

    return (
        <>
            {emailSent ? (
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
                    <div className="relative w-32 h-32">
                        <Image
                            src="https://i.imgur.com/OR2t0Vr.png" // Illustration for email sent
                            alt="Email sent illustration"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        We've sent an email to <span className="font-semibold text-foreground">{submittedEmail}</span> to verify your account.
                    </p>
                    <Button className="w-full" asChild>
                        <a href={`mailto:${submittedEmail}`}>Open My Email</a>
                    </Button>
                    <div className="relative w-full pt-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">or</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center space-x-4 pt-4">
                        <Button variant="outline" type="button" className="p-2">
                            <Icons.facebook className="h-6 w-6" />
                        </Button>
                        <Button variant="outline" type="button" className="p-2">
                            <Icons.google className="h-6 w-6" />
                        </Button>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <a href="/register" className="font-semibold text-blue-600 hover:underline">
                            Create Account
                        </a>
                    </p>
                </div>
            ) : (
                <ForgotPasswordForm onEmailSent={handleEmailSent} />
            )}
        </>
    );
}
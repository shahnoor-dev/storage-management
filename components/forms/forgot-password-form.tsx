"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type UserFormValue = z.infer<typeof formSchema>;

interface ForgotPasswordFormProps {
  onEmailSent: (email: string) => void;
  className?: string;
}

export function ForgotPasswordForm({ onEmailSent, className }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: UserFormValue) => {
    setIsLoading(true);
    // Simulate API call
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onEmailSent(data.email); // Trigger the parent component's state update
  };

  return (
    <div className={cn("grid gap-6", className)}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Forgot your password?</h1>
        <p className="text-sm text-muted-foreground">
            Enter your email address and we will send you instructions on how to reset your password.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Recover Email
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" type="button" disabled={isLoading} className="p-2">
            <Icons.facebook className="h-6 w-6" />
          </Button>
          <Button variant="outline" type="button" disabled={isLoading} className="p-2">
            <Icons.google className="h-6 w-6" />
          </Button>
      </div>

       <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create Account
          </a>
        </p>
    </div>
  );
}
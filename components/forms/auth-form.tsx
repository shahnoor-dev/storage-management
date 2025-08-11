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
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/shared/password-input";
import { Icons } from "@/components/icons";

// Schema for the registration form
const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// Schema for the login form
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().default(false).optional(),
});

// A union schema helps with type inference
const formSchema = z.union([registerSchema, loginSchema]);

interface AuthFormProps {
  formType: "login" | "register";
  className?: string;
}

export function AuthForm({ formType, className }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const isRegister = formType === 'register';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
    // Define all possible default values here
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className={cn("grid gap-6", className)}>
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="text-2xl font-semibold tracking-tight">
            {isRegister ? "Create Account" : "Login"}
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  {!isRegister && (
                    <a href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  )}
                </div>
                <FormControl>
                  <PasswordInput placeholder="Enter your Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isRegister && (
             <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <PasswordInput placeholder="Confirm Password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          )}

          {!isRegister && (
            <div className="flex items-center justify-between">
                <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                        <FormLabel>Remember me</FormLabel>
                        </div>
                    </FormItem>
                    )}
                />
            </div>
          )}

          <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isRegister ? "Create Account" : "Login"}
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
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <a
            href={isRegister ? "/login" : "/register"}
            className="font-semibold text-blue-600 hover:underline"
          >
            {isRegister ? "Login" : "Create Account"}
          </a>
        </p>
    </div>
  );
}
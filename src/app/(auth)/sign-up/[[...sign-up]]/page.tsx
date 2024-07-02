"use client";
import Link from "next/link";
import { useTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpWithEmail } from "@/actions/sign-up";
import { signInWithGoogle } from "@/actions/sign-in-with-google";
import { cn } from "@/lib/utils";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignUpForm() {
    let [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<string|null>(null)

    useEffect(() => {
        if (isPending) return;
    }, [isPending]);

    const onSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const data = await signUpWithEmail(formData);
            setMessage(data?.message);


        });
    };

    const signInWithProvider = async () => {
        startTransition(() => {
            signInWithGoogle();
        });
    };

    return (
        <div className="flex flex-col gap-2 items-center">
            {message && (
                <Alert variant="destructive" className="mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            )}
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your email below to sign up for an account
                    </CardDescription>
                </CardHeader>
                <CardContent className="gap-2 flex flex-col">
                    <form action={onSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" name="password" required />
                            </div>
                            <Button
                                className={cn("w-full", {
                                    "opacity-50": isPending,
                                })}
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <div className="flex items-center ">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        <p>Please wait</p>
                                    </div>
                                ) : (
                                    "Create an Account"
                                )}
                            </Button>
                        </div>
                    </form>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={signInWithProvider}
                        disabled={isPending}
                    >
                        Sign up with Google
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

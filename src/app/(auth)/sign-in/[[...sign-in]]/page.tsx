"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmail } from "@/actions/sign-in";
import { signInWithGoogle } from "@/actions/sign-in-with-google";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginForm() {
    let [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<string | null>(null);


     useEffect(() => {
         if (isPending) return;

     }, [isPending]);
    
    const onSubmit = async (formData: FormData) => {

        startTransition(async() => {
            const data = await signInWithEmail(formData);
            setMessage(data?.message);
        });
    };

    const signInWithProvider = async () => {
        startTransition(() => {
            signInWithGoogle();
        });
    }
    
      
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
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
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
                                {/* <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div> */}
                                <Input id="password" name="password" type="password" required />
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
                                    "Login"
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
                        Login with Google
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/sign-up" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
